# 🔧 Troubleshooting - Vercel Deploy

## ✅ Correções Implementadas

### 1. **Rota raiz adicionada** (`GET /`)
- Agora a API responde na raiz com informações sobre os endpoints disponíveis
- Isso resolve o erro 404 ao acessar a URL base do Vercel

### 2. **Headers CORS configurados no vercel.json**
- Permite requisições de qualquer origem
- Configura métodos HTTP permitidos
- Define headers de autorização

### 3. **Métodos HTTP explícitos nas rotas**
- GET, POST, PUT, DELETE, PATCH, OPTIONS

## 🧪 Como Testar o Deploy

### Teste 1: Health Check (Rota Raiz)
```bash
curl https://seu-app.vercel.app/
```

**Resposta esperada:**
```json
{
  "message": "BarberApp API is running 🚀",
  "version": "1.0.0",
  "status": "active",
  "timestamp": "2025-12-08T...",
  "endpoints": {
    "auth": {
      "sessions": "POST /sessions",
      "register": "POST /users"
    },
    "authenticated": {
      "users": "PUT /users",
      "providers": "GET /providers",
      "appointments": "GET/POST/DELETE /appointments",
      "schedule": "GET /schedule",
      "notifications": "GET/PUT /notifications",
      "files": "POST /files"
    }
  }
}
```

### Teste 2: Criar Usuário
```bash
curl -X POST https://seu-app.vercel.app/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }'
```

### Teste 3: Login
```bash
curl -X POST https://seu-app.vercel.app/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'
```

## ⚠️ Checklist de Variáveis de Ambiente no Vercel

Certifique-se de que TODAS essas variáveis estão configuradas no Vercel Dashboard:

### ✅ Obrigatórias
- [x] `NODE_ENV=production`
- [x] `APP_SECRET=` (chave secreta forte, min 32 caracteres)
- [x] `APP_URL=` (URL do seu app no Vercel)

### ✅ Database PostgreSQL
- [x] `DB_HOST=` (ex: seu-db.railway.app)
- [x] `DB_PORT=5432`
- [x] `DB_USER=` (usuário do banco)
- [x] `DB_PASS=` (senha do banco)
- [x] `DB_NAME=barberapp`

**Serviços recomendados:**
- [Neon](https://neon.tech) - PostgreSQL serverless (Plano gratuito)
- [Supabase](https://supabase.com) - PostgreSQL + Auth (Plano gratuito)
- [Railway](https://railway.app) - PostgreSQL (Plano gratuito limitado)

### ✅ MongoDB
- [x] `MONGO_URL=` (ex: mongodb+srv://user:pass@cluster.mongodb.net/barberapp)

**Serviço recomendado:**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Plano M0 gratuito)

### ✅ Redis
- [x] `REDIS_HOST=` (ex: redis.upstash.io)
- [x] `REDIS_PORT=6379`

**Serviço recomendado:**
- [Upstash Redis](https://upstash.com) - Serverless Redis (Plano gratuito)

### ✅ Email (SMTP)
- [x] `MAIL_HOST=` (ex: smtp.mailtrap.io)
- [x] `MAIL_PORT=` (587 ou 2525)
- [x] `MAIL_USER=`
- [x] `MAIL_PASS=`

**Serviços recomendados:**
- [Mailtrap](https://mailtrap.io) - Para testes (Plano gratuito)
- [SendGrid](https://sendgrid.com) - Para produção (Plano gratuito)
- [Resend](https://resend.com) - Moderno e fácil (Plano gratuito)

### 📊 Opcional (Monitoramento)
- [ ] `SENTRY_DSN=` (para rastreamento de erros)

## 🚨 Erros Comuns

### Erro: "Cannot connect to database"
- Verifique se as variáveis `DB_*` estão corretas
- Certifique-se de que o serviço de banco permite conexões externas
- PostgreSQL em produção precisa de SSL (já configurado no código)

### Erro: "Invalid token" ou "jwt malformed"
- Verifique se `APP_SECRET` está configurado
- Use uma string longa e aleatória (min 32 caracteres)
- Gere com: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Erro: 500 Internal Server Error
- Verifique os logs do Vercel Dashboard
- Acesse: Vercel Dashboard > Seu Projeto > Deployments > Logs
- Procure por erros de conexão com banco de dados ou variáveis faltando

### Erro: CORS Policy
- Já configurado no `vercel.json`
- Se persistir, verifique se o frontend está enviando credenciais corretas

## 📝 Passo a Passo Completo

### 1. Configure o Banco de Dados

**PostgreSQL (Neon):**
```bash
# 1. Crie conta em neon.tech
# 2. Crie um novo projeto
# 3. Copie a connection string
# 4. Use como DB_HOST, DB_USER, DB_PASS, DB_NAME
```

**MongoDB (Atlas):**
```bash
# 1. Crie conta em mongodb.com/cloud/atlas
# 2. Crie um cluster M0 (gratuito)
# 3. Configure Network Access (0.0.0.0/0)
# 4. Copie a connection string
```

### 2. Configure Redis (Upstash)

```bash
# 1. Crie conta em upstash.com
# 2. Crie um banco Redis
# 3. Copie o host e porta
```

### 3. Configure Email (Mailtrap para testes)

```bash
# 1. Crie conta em mailtrap.io
# 2. Acesse Inboxes > SMTP Settings
# 3. Copie as credenciais
```

### 4. Deploy no Vercel

```bash
# Via CLI
cd barberapp-api-master
vercel

# Ou conecte via GitHub no dashboard do Vercel
```

### 5. Configure Variáveis no Vercel Dashboard

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Settings > Environment Variables
4. Adicione TODAS as variáveis listadas acima
5. Redeploy: Deployments > ⋯ > Redeploy

## 🎯 Resultado Esperado

Após seguir todos os passos, ao acessar `https://seu-app.vercel.app/`, você deve ver:

```json
{
  "message": "BarberApp API is running 🚀",
  "status": "active",
  ...
}
```

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique os logs do Vercel
2. Teste as conexões de banco localmente
3. Valide as variáveis de ambiente
4. Certifique-se de que o commit está na branch correta
