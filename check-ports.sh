#!/bin/bash

echo "🔍 Verificando o que está usando as portas dos bancos de dados..."
echo ""

# PostgreSQL (5432)
echo "📊 Porta 5432 (PostgreSQL):"
if lsof -i :5432 2>/dev/null | grep -q LISTEN; then
    lsof -i :5432 2>/dev/null | grep LISTEN
    echo ""
    echo "💡 Solução:"
    echo "   sudo systemctl stop postgresql"
    echo "   # ou"
    echo "   sudo service postgresql stop"
else
    echo "   ✅ Livre"
fi
echo ""

# MongoDB (27017)
echo "📊 Porta 27017 (MongoDB):"
if lsof -i :27017 2>/dev/null | grep -q LISTEN; then
    lsof -i :27017 2>/dev/null | grep LISTEN
    echo ""
    echo "💡 Solução:"
    echo "   sudo systemctl stop mongod"
else
    echo "   ✅ Livre"
fi
echo ""

# Redis (6379)
echo "📊 Porta 6379 (Redis):"
if lsof -i :6379 2>/dev/null | grep -q LISTEN; then
    lsof -i :6379 2>/dev/null | grep LISTEN
    echo ""
    echo "💡 Solução:"
    echo "   sudo systemctl stop redis"
else
    echo "   ✅ Livre"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐳 Status dos Containers Docker:"
sudo docker ps -a --filter "name=gobarber" --format "table {{.Names}}\t{{.Status}}"
