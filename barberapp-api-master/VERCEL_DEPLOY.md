# Deploy BarberApp API no Vercel

## ✅ Correções Implementadas

### 1. **Arquivo `api/index.js` criado**
   - Arquivo principal para Vercel serverless
   - Exporta a aplicação Express corretamente

### 2. **Imports ES Modules corrigidos**
   - Todos os imports relativos agora incluem extensão `.js`
   - Compatível com `"type": "module"` no package.json

### 3. **Configuração do banco de dados atualizada**
   - Suporte a SSL para PostgreSQL em produção
   - Variáveis de ambiente configuráveis (DB_HOST, DB_PORT)

## 🚀 Como fazer o deploy

### Passo 1: Configure as variáveis de ambiente no Vercel

Acesse o dashboard do Vercel e adicione estas variáveis:

```env
NODE_ENV=production
APP_SECRET=sua_chave_secreta_forte_aqui
APP_URL=https://seu-app.vercel.app

# Database PostgreSQL (use um serviço como Neon, Supabase ou Railway)
DB_HOST=seu-postgres-host.com
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=barberapp

# MongoDB (use MongoDB Atlas)
MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/barberapp

# Redis (use Upstash Redis)
REDIS_HOST=seu-redis.upstash.io
REDIS_PORT=6379

# Email (use Mailtrap, SendGrid, ou outro serviço SMTP)
MAIL_HOST=smtp.seuservico.com
MAIL_PORT=587
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha

# Sentry (opcional para monitoramento de erros)
SENTRY_DSN=https://sua-chave@sentry.io/projeto
```

### Passo 2: Deploy via CLI ou GitHub

**Opção A: Via Vercel CLI**
```bash
cd barberapp-api-master
npm install -g vercel
vercel
```

**Opção B: Via GitHub**
1. Faça push do código para o GitHub
2. Conecte o repositório no dashboard do Vercel
3. Configure as variáveis de ambiente
4. Deploy automático!

## ⚠️ Limitações do Vercel (Serverless)

### 1. **Upload de arquivos (Multer)**
   - ❌ Multer salva arquivos no disco local (não funciona em serverless)
   - ✅ **Solução**: Use serviços de armazenamento em nuvem:
     - Cloudinary
     - AWS S3
     - Uploadcare
     - Vercel Blob Storage

### 2. **Filas (Redis + Bee-Queue)**
   - ❌ O arquivo `src/queue.js` não funcionará em serverless
   - ✅ **Solução**: Use serviços de fila gerenciados:
     - Vercel Cron Jobs
     - Upstash QStash
     - AWS SQS
     - BullMQ com Redis gerenciado

### 3. **Timeout de execução**
   - Vercel tem limite de 10s (Hobby) ou 60s (Pro) por requisição
   - Operações longas devem ser assíncronas

## 🔧 Próximos passos recomendados

1. **Migrar upload de arquivos para Cloudinary**:
```bash
npm install cloudinary multer-storage-cloudinary
```

2. **Usar Redis gerenciado (Upstash)**:
   - Compatível com Vercel
   - Plano gratuito disponível

3. **Substituir Bee-Queue por solução serverless**:
   - Vercel Cron Jobs para tarefas agendadas
   - API Routes separadas para processamento assíncrono

4. **Executar migrations antes do deploy**:
```bash
npx sequelize-cli db:migrate
```

## 📋 Banco de dados recomendados (gratuitos)

- **PostgreSQL**: [Neon](https://neon.tech) ou [Supabase](https://supabase.com)
- **MongoDB**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Redis**: [Upstash](https://upstash.com)

## ✅ Checklist de deploy

- [ ] Criar banco PostgreSQL em produção
- [ ] Criar banco MongoDB em produção
- [ ] Criar instância Redis (Upstash)
- [ ] Configurar todas as variáveis de ambiente no Vercel
- [ ] Executar migrations no banco de produção
- [ ] Fazer deploy no Vercel
- [ ] Testar endpoints da API
- [ ] Configurar domínio personalizado (opcional)

## 🐛 Problemas conhecidos

1. **Uploads de arquivos**: Require migração para cloud storage
2. **Queue processing**: Não funciona em serverless (migrations necessárias)
3. **Mongoose deprecation warnings**: Atualizar sintaxe do MongoDB

---

**Status atual**: ✅ API pronta para deploy básico no Vercel. Funcionalidades de upload e queue requerem adaptações adicionais.
