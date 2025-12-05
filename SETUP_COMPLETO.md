# 🚀 Guia Completo de Instalação - BarberApp

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Instalação Passo a Passo](#instalação-passo-a-passo)
4. [Configuração dos Bancos de Dados](#configuração-dos-bancos-de-dados)
5. [Executando o Projeto](#executando-o-projeto)
6. [Solução de Problemas Comuns](#solução-de-problemas-comuns)
7. [Scripts Úteis](#scripts-úteis)

---

## 📖 Visão Geral do Projeto

BarberApp é um sistema completo para gerenciamento de barbearias com:
- **Backend (API)**: Node.js + Express + Sequelize
- **Frontend (Web)**: React + Redux + Styled Components
- **Bancos de Dados**: PostgreSQL, MongoDB, Redis

### Estrutura do Projeto
```
barberapp/
├── barberapp-api-master/     # Backend API
├── barberapp-web-master/     # Frontend React
├── start-databases.sh        # Script para iniciar bancos
├── stop-databases.sh         # Script para parar bancos
├── status.sh                 # Script para verificar status
└── test-api.sh              # Script para testar API
```

---

## 💻 Requisitos do Sistema

### Sistema Operacional
- Linux (Ubuntu/Debian recomendado)
- Pode funcionar em Windows com WSL2 ou macOS com adaptações

### Software Necessário

#### 1. **Docker** (para bancos de dados)
```bash
# Instalar Docker
sudo apt update
sudo apt install docker.io -y

# Iniciar e habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Adicionar usuário ao grupo docker (opcional, evita usar sudo)
sudo usermod -aG docker $USER
# IMPORTANTE: Fazer logout e login novamente após este comando
```

#### 2. **NVM (Node Version Manager)** ⚠️ CRÍTICO
```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar configurações do shell
source ~/.bashrc
# ou
source ~/.zshrc

# Verificar instalação
nvm --version
```

#### 3. **Node.js versão 16** ⚠️ OBRIGATÓRIO
```bash
# Instalar Node.js 16 (versão compatível com o projeto)
nvm install 16

# Definir Node 16 como padrão
nvm use 16
nvm alias default 16

# Verificar versão instalada
node --version  # Deve mostrar v16.x.x
npm --version   # Deve mostrar 8.x.x
```

> **⚠️ ATENÇÃO**: O projeto NÃO funciona com Node.js 18+ ou versões antigas como 12/14
> - **API**: Requer Node.js 14-16 (Sequelize 5.x incompatível com versões mais novas)
> - **Frontend**: Requer Node.js 16 (webpack antigo tem problemas com Node 18+)
> - **Recomendação**: Use Node.js **16.20.2** para ambos

#### 4. **Yarn** (gerenciador de pacotes)
```bash
# Instalar Yarn globalmente
npm install -g yarn

# Verificar instalação
yarn --version
```

---

## 🔧 Instalação Passo a Passo

### Passo 1: Preparar o Projeto

```bash
# Navegar até a pasta do projeto
cd ~/Área\ de\ trabalho/barberapp

# Tornar scripts executáveis
chmod +x *.sh
```

### Passo 2: Configurar Bancos de Dados

#### Parar PostgreSQL local (se instalado)
```bash
# Verificar se PostgreSQL local está rodando
sudo systemctl status postgresql

# Se estiver ativo, parar o serviço
sudo systemctl stop postgresql
sudo systemctl disable postgresql
```

#### Iniciar containers Docker
```bash
# Executar script de inicialização
./start-databases.sh

# Verificar se containers estão rodando
docker ps
# Deve mostrar: gobarber-postgres, gobarber-mongo, gobarber-redis
```

#### Criar banco de dados PostgreSQL
```bash
# Entrar no container PostgreSQL
docker exec -it gobarber-postgres psql -U postgres

# Dentro do psql, criar o banco
CREATE DATABASE gobarber;

# Verificar
\l

# Sair
\q
```

### Passo 3: Configurar Backend (API)

```bash
cd barberapp-api-master

# Garantir que está usando Node 16
nvm use 16

# Remover yarn.lock se existir (evita problemas)
rm -f yarn.lock

# Instalar dependências
yarn install

# Criar arquivo .env
cat > .env << 'EOF'
# Application
APP_URL=http://localhost:3003
NODE_ENV=development

# Auth
APP_SECRET=barberappSecretKey123

# Database PostgreSQL
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=docker
DB_NAME=gobarber

# MongoDB
MONGO_URL=mongodb://localhost:27017/gobarber

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=
MAIL_PASS=

# Sentry
SENTRY_DSN=
EOF

# Executar migrations (criar tabelas)
npx sequelize-cli db:migrate

# Verificar se migrations foram executadas
npx sequelize-cli db:migrate:status
```

### Passo 4: Configurar Frontend (Web)

```bash
cd ../barberapp-web-master

# Garantir que está usando Node 16
nvm use 16

# Instalar dependências
yarn install

# Criar arquivo .env
echo "REACT_APP_API_URL=http://localhost:3003" > .env
```

---

## ▶️ Executando o Projeto

### 1. Iniciar Bancos de Dados
```bash
# Na pasta raiz do projeto
cd ~/Área\ de\ trabalho/barberapp
./start-databases.sh
```

### 2. Iniciar Backend (API)
```bash
cd barberapp-api-master
nvm use 16
yarn dev
```

Você deve ver:
```
🔗 Database connected!
🔗 MongoDB connected!
🚀 Server started on port 3003!
```

### 3. Iniciar Frontend (em outro terminal)
```bash
cd barberapp-web-master
nvm use 16
yarn start
```

Abrirá automaticamente em: `http://localhost:3000`

### 4. Testar API (opcional)
```bash
# Em outro terminal
cd ~/Área\ de\ trabalho/barberapp
./test-api.sh
```

---

## 🐛 Solução de Problemas Comuns

### ❌ Erro: "Docker: permission denied"
**Solução:**
```bash
# Usar sudo
sudo docker ps

# OU adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
# Fazer logout e login novamente
```

### ❌ Erro: "Port 5432 already in use"
**Causa:** PostgreSQL local rodando  
**Solução:**
```bash
sudo systemctl stop postgresql
sudo systemctl disable postgresql
```

### ❌ Erro: "ERR_OSSL_EVP_UNSUPPORTED" (Frontend)
**Causa:** Node.js muito novo (18+)  
**Solução:**
```bash
nvm use 16
yarn install
yarn start
```

### ❌ Erro: MongoDB "illegal instruction"
**Causa:** CPU sem suporte AVX  
**Solução:** Já configurado para usar MongoDB 4.4 no `start-databases.sh`

### ❌ Erro: "relation 'users' does not exist"
**Causa:** Migrations não executadas  
**Solução:**
```bash
cd barberapp-api-master
npx sequelize-cli db:migrate
```

### ❌ Erro: "yarn: command not found" após mudar Node
**Solução:**
```bash
npm install -g yarn
```

### ❌ Erro: Sequelize "Query timeout"
**Causa:** Conexão localhost vs 127.0.0.1  
**Solução:** Já corrigido no `.env` usando `DB_HOST=127.0.0.1`

---

## 📜 Scripts Úteis

### Gerenciar Bancos de Dados
```bash
# Iniciar todos os containers
./start-databases.sh

# Parar todos os containers
./stop-databases.sh

# Ver status dos serviços
./status.sh
```

### Comandos Docker Úteis
```bash
# Ver containers rodando
docker ps

# Ver logs de um container
docker logs gobarber-postgres
docker logs gobarber-mongo
docker logs gobarber-redis

# Parar um container específico
docker stop gobarber-postgres

# Iniciar um container parado
docker start gobarber-postgres

# Remover todos os containers (CUIDADO: perde dados)
docker rm -f gobarber-postgres gobarber-mongo gobarber-redis
```

### Gerenciar Node.js
```bash
# Ver versões instaladas
nvm list

# Instalar outra versão
nvm install 14

# Mudar versão
nvm use 16

# Definir versão padrão
nvm alias default 16
```

### Sequelize (Migrations)
```bash
cd barberapp-api-master

# Ver status das migrations
npx sequelize-cli db:migrate:status

# Executar migrations pendentes
npx sequelize-cli db:migrate

# Reverter última migration
npx sequelize-cli db:migrate:undo

# Reverter todas as migrations
npx sequelize-cli db:migrate:undo:all
```

---

## 🔍 Verificação Final

Execute esta checklist para garantir que tudo está funcionando:

- [ ] Docker instalado e rodando: `docker --version`
- [ ] NVM instalado: `nvm --version`
- [ ] Node.js 16 instalado: `node --version` (deve ser v16.x.x)
- [ ] Yarn instalado: `yarn --version`
- [ ] Containers rodando: `docker ps` (3 containers)
- [ ] API iniciando sem erros: `cd barberapp-api-master && yarn dev`
- [ ] Frontend iniciando sem erros: `cd barberapp-web-master && yarn start`
- [ ] Criar usuário via API: `./test-api.sh`
- [ ] Acessar frontend: http://localhost:3000

---

## 📦 Estrutura de Dependências

### Backend (API)
- **Node.js**: 14-16 (recomendado 16.20.2)
- **Sequelize**: 5.19.8 (ORM para PostgreSQL)
- **Express**: 4.17.1
- **Mongoose**: 5.7.6 (MongoDB)
- **JWT**: 8.5.1 (autenticação)
- **Bcrypt**: 2.4.3 (hash de senhas)

### Frontend (Web)
- **Node.js**: 16 (webpack antigo)
- **React**: 16.11.0
- **Redux**: 4.0.4
- **React Router**: 5.1.2
- **Styled Components**: 4.4.1
- **Axios**: 0.19.0

### Bancos de Dados
- **PostgreSQL**: 11 (dados relacionais)
- **MongoDB**: 4.4 (notificações)
- **Redis**: Alpine (cache e filas)

---

## 📝 Notas Importantes

1. **Sempre use Node.js 16** com este projeto
2. **Não atualize** dependências do `package.json` sem testar
3. **Faça backup** do banco antes de reverter migrations
4. **Use 127.0.0.1** ao invés de `localhost` se tiver problemas de conexão
5. **MongoDB 4.4** é necessário para CPUs sem AVX

---

## 🆘 Suporte

Se encontrar problemas não listados aqui:

1. Verifique logs dos containers: `docker logs <container-name>`
2. Verifique logs da API: terminal onde rodou `yarn dev`
3. Verifique console do navegador (F12) para erros do frontend
4. Execute `./status.sh` para ver status geral

---

**Versão do Documento**: 1.0  
**Última Atualização**: Dezembro 2025  
**Testado em**: Ubuntu 20.04+, Node.js 16.20.2
