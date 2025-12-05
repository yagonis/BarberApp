#!/bin/bash

echo "🚀 Iniciando Bancos de Dados do BarberApp..."
echo ""

# Verificar se Docker está disponível
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale o Docker primeiro."
    exit 1
fi

# Verificar se precisa de sudo
if docker ps &> /dev/null; then
    DOCKER_CMD="docker"
else
    DOCKER_CMD="sudo docker"
    echo "ℹ️  Usando sudo para executar Docker"
    echo ""
fi

# Função para verificar se container existe
container_exists() {
    $DOCKER_CMD ps -a --format '{{.Names}}' | grep -q "^$1$"
}

# Função para verificar se container está rodando
container_running() {
    $DOCKER_CMD ps --format '{{.Names}}' | grep -q "^$1$"
}

# PostgreSQL
echo "📦 PostgreSQL..."
if container_exists "gobarber-postgres"; then
    if container_running "gobarber-postgres"; then
        echo "   ✅ Já está rodando"
    else
        echo "   ▶️  Iniciando..."
        $DOCKER_CMD start gobarber-postgres
    fi
else
    echo "   🆕 Criando container..."
    $DOCKER_CMD run --name gobarber-postgres \
        -e POSTGRES_PASSWORD=docker \
        -p 5432:5432 \
        -d postgres:11
    
    echo "   ⏳ Aguardando inicialização..."
    sleep 5
    
    echo "   🗄️  Criando banco de dados..."
    $DOCKER_CMD exec gobarber-postgres \
        psql -U postgres -c "CREATE DATABASE gobarber;" 2>/dev/null || \
        echo "   ⚠️  Banco já existe ou será criado depois"
fi
echo ""

# MongoDB
echo "📦 MongoDB..."
if container_exists "gobarber-mongo"; then
    if container_running "gobarber-mongo"; then
        echo "   ✅ Já está rodando"
    else
        echo "   ▶️  Iniciando..."
        $DOCKER_CMD start gobarber-mongo
    fi
else
    echo "   🆕 Criando container..."
    $DOCKER_CMD run --name gobarber-mongo \
        -p 27017:27017 \
        -d mongo
fi
echo ""

# Redis
echo "📦 Redis..."
if container_exists "gobarber-redis"; then
    if container_running "gobarber-redis"; then
        echo "   ✅ Já está rodando"
    else
        echo "   ▶️  Iniciando..."
        $DOCKER_CMD start gobarber-redis
    fi
else
    echo "   🆕 Criando container..."
    $DOCKER_CMD run --name gobarber-redis \
        -p 6379:6379 \
        -d redis:alpine
fi
echo ""

# Verificar status final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Status dos Containers:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$DOCKER_CMD ps --filter "name=gobarber" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "✅ Bancos de dados prontos!"
echo ""
echo "💡 Próximos passos:"
echo "   1. cd barberapp-api-master && yarn dev"
echo "   2. cd barberapp-web-master && yarn start"
echo ""
