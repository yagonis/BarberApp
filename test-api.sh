#!/bin/bash

echo "🧪 Testando API do BarberApp"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

API_URL="http://localhost:3003"

# Teste 1: Verificar se API está online
echo "1️⃣ Testando se API está online..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ "$STATUS" -eq 401 ]; then
    echo "   ✅ API respondendo (401 = sem token, esperado)"
else
    echo "   Status code: $STATUS"
fi
echo ""

# Teste 2: Criar um usuário
echo "2️⃣ Testando cadastro de usuário..."
RANDOM_EMAIL="teste$(date +%s)@example.com"
SIGNUP_RESPONSE=$(curl -s -X POST $API_URL/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Usuario Teste\",\"email\":\"$RANDOM_EMAIL\",\"password\":\"123456\",\"provider\":true}")

if echo "$SIGNUP_RESPONSE" | grep -q "id"; then
    echo "   ✅ Usuário criado com sucesso!"
    echo "   Email: $RANDOM_EMAIL"
else
    echo "   ⚠️ Resposta: $SIGNUP_RESPONSE"
fi
echo ""

# Teste 3: Fazer login
echo "3️⃣ Testando login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/sessions \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$RANDOM_EMAIL\",\"password\":\"123456\"}")

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo "   ✅ Login bem-sucedido!"
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "   Token obtido: ${TOKEN:0:30}..."
else
    echo "   ⚠️ Resposta: $LOGIN_RESPONSE"
fi
echo ""

# Teste 4: Listar prestadores (requer autenticação)
if [ ! -z "$TOKEN" ]; then
    echo "4️⃣ Testando listagem de prestadores (autenticado)..."
    PROVIDERS_RESPONSE=$(curl -s -X GET $API_URL/providers \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$PROVIDERS_RESPONSE" | grep -q '\['; then
        echo "   ✅ Listagem funcionando!"
        PROVIDER_COUNT=$(echo "$PROVIDERS_RESPONSE" | grep -o '"id"' | wc -l)
        echo "   Prestadores encontrados: $PROVIDER_COUNT"
    else
        echo "   ⚠️ Resposta: $PROVIDERS_RESPONSE"
    fi
    echo ""
    
    # Teste 5: Buscar agenda
    echo "5️⃣ Testando busca de agenda..."
    SCHEDULE_RESPONSE=$(curl -s -X GET "$API_URL/schedule?date=$(date +%Y-%m-%d)" \
      -H "Authorization: Bearer $TOKEN")
    
    if echo "$SCHEDULE_RESPONSE" | grep -q '\['; then
        echo "   ✅ Agenda funcionando!"
    else
        echo "   ⚠️ Resposta: $SCHEDULE_RESPONSE"
    fi
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Testes concluídos!"
echo ""
echo "📌 Endpoints disponíveis:"
echo "   POST   /users        - Cadastro"
echo "   POST   /sessions     - Login"
echo "   GET    /providers    - Listar prestadores"
echo "   GET    /schedule     - Ver agenda"
echo "   POST   /files        - Upload de arquivo"
echo "   GET    /appointments - Listar agendamentos"
echo ""
