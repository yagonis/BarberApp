# 🧪 Guia de Testes - BarberApp

## Pré-requisitos para Testar

Antes de executar os testes, certifique-se de que:

```bash
# 1. Containers Docker rodando
docker ps
# Deve mostrar: gobarber-postgres, gobarber-mongo, gobarber-redis

# 2. Migrations executadas
cd ~/Área\ de\ trabalho/barberapp/barberapp-api-master
npx sequelize-cli db:migrate:status
# Todas devem estar "up"

# 3. API rodando
# Terminal 1: Iniciar API
cd ~/Área\ de\ trabalho/barberapp/barberapp-api-master
nvm use 16
yarn dev
# Aguardar mensagem: "🚀 Server started on port 3003!"

# 4. Frontend rodando (opcional)
# Terminal 2: Iniciar Frontend
cd ~/Área\ de\ trabalho/barberapp/barberapp-web-master
nvm use 16
yarn start
```

---

## ✅ Testes Manuais da API

### 1. Criar Usuário

```bash
curl -X POST http://localhost:3003/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'
```

**Resposta esperada:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "provider": false
}
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:3003/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

**Resposta esperada:**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "provider": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Criar Usuário Prestador (Barbeiro)

```bash
curl -X POST http://localhost:3003/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Barbeiro",
    "email": "carlos@barbershop.com",
    "password": "123456",
    "provider": true
  }'
```

### 4. Listar Prestadores (Requer autenticação)

```bash
# Primeiro faça login e copie o token
TOKEN="seu_token_aqui"

curl -X GET http://localhost:3003/providers \
  -H "Authorization: Bearer $TOKEN"
```

**Resposta esperada:**
```json
[
  {
    "id": 2,
    "name": "Carlos Barbeiro",
    "email": "carlos@barbershop.com",
    "avatar_id": null,
    "avatar": null
  }
]
```

### 5. Atualizar Perfil

```bash
TOKEN="seu_token_aqui"

curl -X PUT http://localhost:3003/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com"
  }'
```

### 6. Criar Agendamento

```bash
TOKEN="seu_token_aqui"
PROVIDER_ID=2  # ID do barbeiro

curl -X POST http://localhost:3003/appointments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider_id": '$PROVIDER_ID',
    "date": "2025-12-10T10:00:00-03:00"
  }'
```

### 7. Listar Agendamentos

```bash
TOKEN="seu_token_aqui"

curl -X GET http://localhost:3003/appointments \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🤖 Teste Automatizado

Use o script fornecido:

```bash
cd ~/Área\ de\ trabalho/barberapp
./test-api.sh
```

Este script testa:
1. ✅ Criação de usuário
2. ✅ Login
3. ✅ Listagem de prestadores
4. ✅ Criação de agendamento

---

## 🌐 Testes no Frontend

### 1. Acessar Aplicação
```
http://localhost:3000
```

### 2. Criar Conta
1. Clicar em "Criar conta gratuita"
2. Preencher nome, email e senha
3. Clicar em "Cadastrar"

### 3. Fazer Login
1. Inserir email e senha
2. Clicar em "Acessar"

### 4. Visualizar Dashboard
- Ver lista de prestadores
- Selecionar data e horário
- Confirmar agendamento

### 5. Atualizar Perfil
1. Clicar no avatar no canto superior direito
2. Clicar em "Meu perfil"
3. Atualizar dados
4. Fazer upload de avatar (opcional)

---

## 🔍 Verificações de Saúde

### Verificar Banco de Dados

```bash
# PostgreSQL
docker exec -it gobarber-postgres psql -U postgres -d gobarber -c "\dt"
# Deve mostrar: users, files, appointments, SequelizeMeta

docker exec -it gobarber-postgres psql -U postgres -d gobarber -c "SELECT * FROM users;"
# Lista usuários criados

# MongoDB
docker exec -it gobarber-mongo mongo gobarber --eval "db.notifications.find()"

# Redis
docker exec -it gobarber-redis redis-cli KEYS "*"
```

### Verificar Logs

```bash
# API (no terminal onde rodou yarn dev)
# Deve mostrar apenas requisições, sem erros

# Containers Docker
docker logs gobarber-postgres
docker logs gobarber-mongo
docker logs gobarber-redis
```

### Verificar Portas

```bash
# Verificar se portas estão abertas
netstat -tulpn | grep -E "3000|3003|5432|27017|6379"
# ou
ss -tulpn | grep -E "3000|3003|5432|27017|6379"
```

---

## ❌ Erros Comuns e Soluções

### Erro: "User already exists"
**Causa**: Email já cadastrado  
**Solução**: Use outro email ou delete o usuário no banco:
```bash
docker exec -it gobarber-postgres psql -U postgres -d gobarber \
  -c "DELETE FROM users WHERE email = 'email@example.com';"
```

### Erro: "JWT malformed"
**Causa**: Token inválido ou expirado  
**Solução**: Faça login novamente e copie o novo token

### Erro: "Appointment date is not available"
**Causa**: Horário já reservado ou data passada  
**Solução**: Escolha outro horário (futuro e não ocupado)

### Erro: "You can only create appointments with providers"
**Causa**: Tentando agendar com usuário comum  
**Solução**: Use ID de um usuário com `provider: true`

### Erro: "Validation failed"
**Causa**: Dados inválidos no corpo da requisição  
**Solução**: Verifique formato do JSON e campos obrigatórios

---

## 📊 Testes de Carga (Opcional)

### Usando Apache Bench

```bash
# Instalar
sudo apt install apache2-utils

# Testar endpoint de saúde (criar um endpoint /health primeiro)
ab -n 1000 -c 10 http://localhost:3003/

# Testar criação de usuários
ab -n 100 -c 5 -p user.json -T application/json http://localhost:3003/users
```

### Usando Artillery

```bash
# Instalar
npm install -g artillery

# Criar arquivo de teste
cat > load-test.yml << 'EOF'
config:
  target: "http://localhost:3003"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Create users"
    flow:
      - post:
          url: "/users"
          json:
            name: "Load Test User"
            email: "loadtest{{ $randomNumber() }}@test.com"
            password: "123456"
EOF

# Executar teste
artillery run load-test.yml
```

---

## ✅ Checklist de Testes Completo

Antes de considerar o sistema pronto para produção:

- [ ] **Banco de Dados**
  - [ ] PostgreSQL conectando
  - [ ] MongoDB conectando
  - [ ] Redis conectando
  - [ ] Migrations executadas
  
- [ ] **API Endpoints**
  - [ ] POST /users (criar usuário)
  - [ ] POST /sessions (login)
  - [ ] GET /providers (listar barbeiros)
  - [ ] PUT /users (atualizar perfil)
  - [ ] POST /appointments (criar agendamento)
  - [ ] GET /appointments (listar agendamentos)
  - [ ] DELETE /appointments/:id (cancelar agendamento)
  
- [ ] **Frontend**
  - [ ] Cadastro de usuário funciona
  - [ ] Login funciona
  - [ ] Dashboard carrega
  - [ ] Lista de prestadores exibida
  - [ ] Agendamento funciona
  - [ ] Upload de avatar funciona
  - [ ] Atualização de perfil funciona
  
- [ ] **Segurança**
  - [ ] Senhas hasheadas (bcrypt)
  - [ ] JWT expira corretamente
  - [ ] Endpoints protegidos requerem autenticação
  - [ ] Validação de dados funciona
  
- [ ] **Performance**
  - [ ] API responde em < 200ms
  - [ ] Frontend carrega em < 3s
  - [ ] Imagens otimizadas
  - [ ] Conexões pooling configurado

---

## 🚀 Próximos Passos

Após validar todos os testes:

1. **Documentar casos de uso**
2. **Criar testes automatizados (Jest)**
3. **Configurar CI/CD**
4. **Deploy em ambiente de staging**
5. **Testes de aceitação com usuários**
6. **Deploy em produção**

---

**Última Atualização**: Dezembro 2025  
**Versão**: 1.0
