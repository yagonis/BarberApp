#!/bin/bash

echo "📊 Status do BarberApp"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar se precisa de sudo
if docker ps &> /dev/null; then
    DOCKER_CMD="docker"
else
    DOCKER_CMD="sudo docker"
fi

# Containers
echo "🐳 Containers Docker:"
if $DOCKER_CMD ps -a --filter "name=gobarber" --format "{{.Names}}" | grep -q gobarber; then
    $DOCKER_CMD ps -a --filter "name=gobarber" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo "   ❌ Nenhum container encontrado"
fi
echo ""

# API
echo "🔌 API (porta 3003):"
if lsof -i :3003 &> /dev/null; then
    echo "   ✅ Rodando"
else
    echo "   ❌ Não está rodando"
fi
echo ""

# Frontend
echo "🌐 Frontend (porta 3000):"
if lsof -i :3000 &> /dev/null; then
    echo "   ✅ Rodando"
else
    echo "   ❌ Não está rodando"
fi
echo ""

# Portas dos bancos
echo "🗄️  Bancos de Dados:"
echo -n "   PostgreSQL (5432): "
if lsof -i :5432 &> /dev/null; then
    echo "✅"
else
    echo "❌"
fi

echo -n "   MongoDB (27017): "
if lsof -i :27017 &> /dev/null; then
    echo "✅"
else
    echo "❌"
fi

echo -n "   Redis (6379): "
if lsof -i :6379 &> /dev/null; then
    echo "✅"
else
    echo "❌"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
