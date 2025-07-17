#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" $PORT; do
  echo "Esperando que el servicio esté listo en $host:$PORT"
  sleep 2
done

exec $cmd