# 🚀 Guia de Deploy - BarberApp no Vercel

## 📋 Visão Geral

Este projeto foi configurado com uma API mock completa que permite fazer deploy no Vercel sem necessidade de banco de dados. O sistema está dividido em:

1. **Backend Mock (API)**: Serverless function que simula toda a API
2. **Frontend (React)**: Aplicação React que consome a API

## 🎯 Deploy da API Mock

### Opção 1: Deploy Direto (Recomendado)

1. **Conecte seu repositório ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Import Project"
   - Conecte seu repositório GitHub: `yagonis/BarberApp`

2. **Configure o projeto:**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

3. **Deploy:**
   - Clique em "Deploy"
   - A API estará disponível em `https://seu-projeto.vercel.app/api`

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

### Testando a API

Após o deploy, teste a API:

```bash
# Health check
curl https://seu-projeto.vercel.app/api

# Login (mock - aceita qualquer credencial)
curl -X POST https://seu-projeto.vercel.app/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Listar barbeiros
curl https://seu-projeto.vercel.app/api/providers
```

## 🎨 Deploy do Frontend

### Opção 1: Deploy Separado no Vercel

1. **Criar novo projeto no Vercel:**
   - Import Project → Selecione o repositório
   - **Framework Preset**: Create React App
   - **Root Directory**: `barberapp-web-master`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

2. **Configurar Variável de Ambiente:**
   - Vá em Settings → Environment Variables
   - Adicione:
     - **Key**: `REACT_APP_API_URL`
     - **Value**: `https://seu-projeto-api.vercel.app/api`
   - Clique em "Add"

3. **Redeploy:**
   - Vá em Deployments
   - Clique nos 3 pontos do último deployment
   - Clique em "Redeploy"

### Opção 2: Deploy via CLI

```bash
cd barberapp-web-master

# Deploy
vercel

# Deploy em produção com variável de ambiente
vercel --prod -e REACT_APP_API_URL=https://seu-projeto-api.vercel.app/api
```

## 🔧 Configuração Local

### Backend Mock

```bash
# Instalar dependências
npm install

# Iniciar servidor mock
npm run mock
```

O servidor estará disponível em `http://localhost:3001`

### Frontend

```bash
cd barberapp-web-master

# Instalar dependências
npm install

# Iniciar aplicação
npm start
```

O frontend estará disponível em `http://localhost:3000`

## 📡 Endpoints da API Mock

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api` | Health check |
| POST | `/api/sessions` | Login (aceita qualquer credencial) |
| POST | `/api/users` | Registro de usuário |
| PUT | `/api/users` | Atualizar perfil |
| GET | `/api/providers` | Listar barbeiros |
| GET | `/api/providers/:id/available` | Horários disponíveis |
| GET | `/api/appointments` | Listar agendamentos |
| POST | `/api/appointments` | Criar agendamento |
| DELETE | `/api/appointments/:id` | Cancelar agendamento |
| GET | `/api/notifications` | Listar notificações |
| PUT | `/api/notifications/:id` | Marcar como lida |
| POST | `/api/files` | Upload de arquivo (simulado) |

## 🎭 Dados Mock

### Usuário de Teste
- **Nome**: João Silva
- **Email**: joao@example.com
- **Senha**: qualquer (o mock aceita qualquer credencial)

### Barbeiros Disponíveis
1. Barbeiro Master
2. Corte Premium
3. Estilo Top

### Agendamentos
- 2 agendamentos de exemplo pré-criados

### Notificações
- 2 notificações de teste

## ✅ Checklist de Deploy

- [ ] API mock deployada no Vercel
- [ ] Endpoint da API funcionando (teste `/api`)
- [ ] Frontend deployado no Vercel
- [ ] Variável `REACT_APP_API_URL` configurada no frontend
- [ ] Login funcionando no frontend
- [ ] Listagem de barbeiros funcionando
- [ ] Criação de agendamentos funcionando

## 🐛 Troubleshooting

### Erro CORS
Se encontrar erros de CORS, verifique:
- O arquivo `vercel.json` está na raiz do projeto
- Os headers CORS estão configurados corretamente

### Frontend não conecta à API
- Verifique se a variável `REACT_APP_API_URL` está configurada
- Teste o endpoint da API diretamente no navegador
- Verifique se a URL termina com `/api` (sem barra final)

### Build falha no Vercel
- Verifique se todas as dependências estão no `package.json`
- Teste o build localmente: `npm run build`
- Verifique os logs de build no Vercel

## 📝 Notas Importantes

- ⚠️ O mock não persiste dados - cada request é isolado
- ⚠️ Não requer banco de dados - perfeito para demonstrações
- ⚠️ O sistema aceita qualquer email/senha no login
- ✅ Totalmente funcional para demonstrar o frontend
- ✅ Pode ser usado como base para implementar o backend real

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Create React App](https://create-react-app.dev/)

## 📧 Suporte

Se tiver problemas, verifique:
1. Logs do Vercel
2. Console do navegador (F12)
3. Network tab para ver requests
