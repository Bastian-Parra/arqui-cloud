# Plataforma de Optimización de Listas de Espera en Salud Pública

Proyecto desarrollado para el Electivo Profesional: Aquitectura en la Nube. Sistema en la nube para optimización de listas de espera en salud pública.

## Microservicios
Todos los servicios están desarrollados en Node.js/Express:

Servicio

| Servicio           | Puerto | Descripción                          | Endpoints                     |
|--------------------|--------|--------------------------------------|-------------------------------|
| **auth-ms**        | 3000   | Autenticación (simula Clave Única)   | `POST /auth/login`            |
| **profesionales-ms**      | 4000   | Gestión de pacientes            | `POST /turnos`, `GET /turnos` |
| **pacientes-ms**| 5000   | Gestión de profesionales            | `POST /priorizar`             |

## Instalación Local

1. Clonar repositorio:
```bash
git clone https://github.com/tu-equipo/proyecto-salud.git
cd proyecto-salud
