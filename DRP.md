# 🛡️ Plan de Recuperación ante Desastres (DRP)

## 1. Objetivo

Definir las estrategias, responsables y mecanismos necesarios para restaurar los servicios críticos del sistema frente a desastres que afecten su disponibilidad, integridad o continuidad, minimizando pérdida de datos (RPO) e interrupciones (RTO).

## 2. Alcance

El DRP cubre los siguientes componentes:

- Microservicios
- Base de Datos (`Locales con MySQL`)
- API Gateway y balanceadores
- Almacenamiento estatico y backups
- Servicios de CI/CD en GitHub Actions
- GCP: Cloud Run, Cloud Storage y Pub/Sub.

## 3. Evaluación de riesgos

| Categoría         | Ejemplos                                            | Estrategia de mitigación                                                                  |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Físicos**       | Terremoto, incendio en región de GCP                | Uso de múltiples zonas de disponibilidad y backups en regiones distintas                  |
| **Tecnológicos**  | Caída de Cloud SQL, bugs críticos en microservicios | CI/CD con rollback, pruebas automatizadas, supervisión de errores                         |
| **Humanos**       | Borrado accidental, deploy incorrecto               | Políticas de revisión (PRs obligatorias), backups, versionamiento y auditorías            |
| **Seguridad/Red** | DDoS, filtración de credenciales                    | WAF, IAM granular, escaneo con Gitleaks, vigilancia activa con Cloud Monitoring y alertas |

## 4. RPO/RTO

| Componente                      | Justificación del RPO                      | RPO          | Justificación del RTO                            | RTO        |
| ------------------------------- | ------------------------------------------ | ------------ | ------------------------------------------------ | ---------- |
| `Cloud SQL`                     | Respaldo diario + binlog activo            | 15 minutos   | Export disponible + replica lista en standby     | 20 minutos |
| `Firestore / Storage`           | Export diario a bucket multi-región        | 1 hora       | Rehidratación rápida desde snapshot/export       | 15 minutos |
| `Microservicios (Node.js)`      | No hay pérdida si el código está en GitHub | 5 minutos    | Imagenes Docker + deploy automatizado            | 10 minutos |
| `Secret Manager / .env`         | Versionado manual + backups                | 5 minutos    | Recuperable desde GCP o repositorio cifrado      | 10 minutos |
| `API Gateway` / Balanceadores   | Configuración declarativa en Terraform     | 0            | Redeploy inmediato con Terraform                 | 5 minutos  |
| **Sistema completo (failover)** | Considerando interacción entre componentes | \~15 minutos | Activación manual + Terraform + restauración SQL | 30 minutos |

## 5. Estrategia de recuperacion ante desastres

### Warm Standby (Servidores listos, pero no activos)

- Se mantienen bases de datos replicadas y microservicios construidos, pero el entorno de recuperación no está corriendo constantemente (se activa al fallar el entorno principal).
- Permite reducir costos frente a una solución Hot Standby (activa en paralelo), manteniendo tiempos de recuperación razonables.

### Flujo de recuperación por escenario

🔴 Escenario 1: Pérdida de base de datos (ej. corrupción o borrado accidental)
1. Se activa alerta vía Cloud Monitoring.
2. Se restaura último snapshot automático de Cloud SQL (o export `.sql.gz`).
3. Terraform reconfigura los secrets/configuración si es necesario.
4. Se ejecutan tests para validar conexión DB → microservicios → API.

🔴 Escenario 2: Caída total de región GCP (ej. terremoto o interrupción severa)
1. Se activa protocolo de failover manual.
2. Se recrea la infraestructura en región secundaria (`us-central1` → `southamerica-east1` por ejemplo), reutilizando:
    - Buckets con backups exportados
    - Docker images en Artifact Registry
    - Repositorio de infraestructura (Terraform)
3. Se redirige el tráfico mediante configuración del API Gateway global.
4. Se revalida funcionamiento completo del sistema y se comunica recuperación a stakeholders.

🔴 Escenario 3: Vulneración de seguridad (ej. exposición de secretos, malware)
1. Se revocan tokens y claves mediante Secret Manager.
2. Se activa escaneo con Gitleaks y auditoría con Cloud Logging.
3. Se realiza rollback a último estado sano (commit firmado, imagen segura).
4. Se reconstruye todo el entorno de producción y se regeneran secretos.

### Herramientas utilizadas

| Componente               | Herramienta                                  | Uso                                      |
| ------------------------ | -------------------------------------------- | ---------------------------------------- |
| Backup DB                | Cloud SQL automatic backups + exports        | RPO controlado                           |
| Infraestructura          | Terraform + GitHub Actions                   | Reprovisión automatizada                 |
| Registro de eventos      | Cloud Logging + Monitoring                   | Detección temprana                       |
| Seguridad                | Secret Manager + Gitleaks CI                 | Prevención y respuesta ante filtraciones |

