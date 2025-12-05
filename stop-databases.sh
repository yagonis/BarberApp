#!/bin/bash

echo "🛑 Parando Bancos de Dados do BarberApp..."
echo ""

# Verificar se precisa de sudo
if docker ps &> /dev/null; then
    DOCKER_CMD="docker"
else
    DOCKER_CMD="sudo docker"
fi

# Parar containers
$DOCKER_CMD stop gobarber-postgres gobarber-mongo gobarber-redis 2>/dev/null

echo ""
echo "✅ Bancos de dados parados!"
echo ""
echo "💡 Para iniciar novamente: ./start-databases.sh"
echo ""
