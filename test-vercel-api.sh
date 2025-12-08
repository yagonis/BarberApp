#!/bin/bash

echo "🧪 Testando API no Vercel..."
echo ""

URL="https://barber-jvdfqo5ub-yago-britos-projects.vercel.app"

echo "1️⃣ Testando Health Check (GET /)..."
curl -s "$URL/" | jq . || curl -s "$URL/"
echo ""
echo ""

echo "2️⃣ Testando criação de usuário (POST /users)..."
curl -s -X POST "$URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "provider": false
  }' | jq . || curl -s -X POST "$URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "provider": false
  }'
echo ""
echo ""

echo "3️⃣ Testando endpoint de sessions (POST /sessions)..."
curl -s -X POST "$URL/sessions" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }' | jq . || curl -s -X POST "$URL/sessions" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
echo ""

echo "✅ Testes concluídos!"
