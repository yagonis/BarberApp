# 🚀 Deploy do Backend no Render

## Passo a Passo

### 1. **Criar conta no Render**
- Acesse: https://render.com
- Faça login com sua conta GitHub

### 2. **Criar PostgreSQL Database**
1. No painel do Render, clique em **"New +"**
2. Selecione **"PostgreSQL"**
3. Configure:
   - **Name**: `barberapp-db`
   - **Database**: `barberapp`
   - **User**: `barberapp`
   - **Region**: Ohio (US East)
   - **Plan**: Free
4. Clique em **"Create Database"**
5. Aguarde a criação (leva ~2 minutos)
6. **Copie as credenciais** (Internal Database URL)

### 3. **Criar MongoDB no Atlas (Grátis)**
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um cluster gratuito (M0)
4. Crie um usuário de banco de dados
5. Adicione IP `0.0.0.0/0` na whitelist (permite qualquer IP)
6. Clique em **"Connect"** → **"Connect your application"**
7. **Copie a connection string** (ex: `mongodb+srv://user:pass@cluster.mongodb.net/barberapp`)

### 4. **Criar Web Service no Render**
1. No painel do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte seu repositório GitHub: `yagonis/BarberApp`
4. Configure:
   - **Name**: `barberapp-api`
   - **Region**: Ohio (US East)
   - **Branch**: `master`
   - **Root Directory**: `barberapp-api-master`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 5. **Configurar Variáveis de Ambiente**
No Render, vá em **Environment** e adicione:

```
NODE_ENV=production
APP_URL=https://barberapp-api.onrender.com
PORT=3333

# PostgreSQL (copie do Internal Database URL do seu database)
DB_HOST=dpg-xxxxx.ohio-postgres.render.com
DB_PORT=5432
DB_USER=barberapp
DB_PASS=sua-senha-gerada
DB_NAME=barberapp

# MongoDB Atlas (copie a connection string)
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/barberapp

# Secret para JWT (gere uma string aleatória forte)
APP_SECRET=uma-string-secreta-muito-forte-aqui

# Email (OPCIONAL - use Mailtrap para testes)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=seu-user-mailtrap
MAIL_PASS=sua-senha-mailtrap

# Redis (OPCIONAL - deixe vazio por enquanto)
REDIS_HOST=
REDIS_PORT=6379

# Sentry (OPCIONAL)
SENTRY_DSN=
```

### 6. **Rodar Migrations**
Após o deploy, você precisa rodar as migrations:

1. No painel do Render, vá em **Shell** (no menu do seu web service)
2. Execute:
```bash
cd barberapp-api-master
npx sequelize-cli db:migrate
```

Ou adicione isso ao Build Command:
```
npm install && npx sequelize-cli db:migrate
```

### 7. **Testar a API**
Após o deploy, teste:
```bash
curl https://barberapp-api.onrender.com/
```

Deve retornar o health check com status da API.

### 8. **Conectar Frontend no Netlify**
No Netlify, vá em **Site settings** → **Environment variables** e adicione:
```
REACT_APP_API_URL=https://barberapp-api.onrender.com
```

Depois, faça um redeploy do frontend.

## ⚠️ Observações Importantes

### Plano Free do Render:
- ✅ 750 horas/mês grátis
- ⚠️ O serviço "dorme" após 15min de inatividade
- ⚠️ Primeira request após "dormir" pode levar 30-50 segundos
- ✅ PostgreSQL grátis com 1GB de espaço

### MongoDB Atlas:
- ✅ 512MB grátis
- ✅ Sempre ativo (não dorme)

### Alternativas ao Email (se não configurar):
- O sistema funcionará, mas não enviará emails
- Notificações funcionarão normalmente via MongoDB

### Se o Sentry não for configurado:
- A aplicação funcionará normalmente
- Apenas não terá monitoramento de erros

## 🔧 Troubleshooting

### Erro de conexão com banco:
- Verifique se as credenciais do PostgreSQL estão corretas
- Certifique-se de que a MONGO_URL está correta

### Migrations não rodaram:
- Execute manualmente no Shell do Render
- Ou adicione ao Build Command

### API muito lenta:
- É normal no plano free após inatividade
- Considere usar um serviço de "keep alive" (ex: cron-job.org fazendo ping a cada 14min)

## 📝 Checklist Final

- [ ] PostgreSQL criado no Render
- [ ] MongoDB criado no Atlas
- [ ] Web Service criado e deployado
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations executadas
- [ ] API respondendo (teste com curl)
- [ ] Frontend atualizado com URL da API
- [ ] Login funcionando
- [ ] Agendamentos funcionando
