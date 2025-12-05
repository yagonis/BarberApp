# 💈 BarberApp - Sistema de Gerenciamento para Barbearias

Sistema completo para agendamento e gerenciamento de barbearias, desenvolvido com React e Node.js.

## 🚀 Início Rápido

### Pré-requisitos
- Docker instalado
- Node.js 16 (via NVM)
- Yarn

### Instalação em 3 Passos

```bash
# 1. Instalar Node.js 16
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
npm install -g yarn

# 2. Iniciar bancos de dados
./start-databases.sh

# 3. Configurar e rodar
# API
cd barberapp-api-master
yarn install
npx sequelize-cli db:migrate
yarn dev

# Frontend (novo terminal)
cd barberapp-web-master
yarn install
yarn start
```

## 📚 Documentação Completa

Para guia detalhado de instalação, solução de problemas e configurações, consulte:
**[SETUP_COMPLETO.md](SETUP_COMPLETO.md)**

## 🛠️ Scripts Disponíveis

- `./start-databases.sh` - Iniciar containers Docker
- `./stop-databases.sh` - Parar containers Docker
- `./status.sh` - Verificar status dos serviços
- `./test-api.sh` - Testar endpoints da API

## 🔧 Tecnologias

### Backend
- Node.js 16 + Express
- PostgreSQL 11
- MongoDB 4.4
- Redis
- Sequelize ORM
- JWT Authentication

### Frontend
- React 16
- Redux + Redux Saga
- Styled Components
- React Router v5

## 📝 Portas Utilizadas

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3003
- **PostgreSQL**: 5432
- **MongoDB**: 27017
- **Redis**: 6379

## ⚠️ Requisitos Importantes

> **Node.js 16 é obrigatório!**  
> O projeto não funciona com versões 18+ ou anteriores a 14.

## 🐛 Problemas Comuns

| Erro | Solução |
|------|---------|
| Port 5432 in use | `sudo systemctl stop postgresql` |
| Permission denied (Docker) | Use `sudo` ou adicione usuário ao grupo docker |
| relation does not exist | Execute `npx sequelize-cli db:migrate` |
| yarn not found | `npm install -g yarn` |

## 📖 Estrutura do Projeto

```
barberapp/
├── barberapp-api-master/     # Backend Node.js
│   ├── src/
│   │   ├── app/             # Controllers, Models, Middlewares
│   │   ├── database/        # Migrations e Seeds
│   │   └── config/          # Configurações
│   └── .env                 # Variáveis de ambiente
├── barberapp-web-master/     # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/          # Páginas
│   │   ├── store/          # Redux
│   │   └── services/       # API client
│   └── .env                 # Variáveis de ambiente
└── *.sh                     # Scripts de automação
```

## ✅ Checklist de Instalação

- [ ] Docker instalado e rodando
- [ ] Node.js 16 instalado via NVM
- [ ] Yarn instalado globalmente
- [ ] PostgreSQL local desabilitado (se instalado)
- [ ] 3 containers Docker rodando (postgres, mongo, redis)
- [ ] Migrations executadas com sucesso
- [ ] API rodando em http://localhost:3003
- [ ] Frontend rodando em http://localhost:3000

## 🤝 Como Usar

1. **Criar conta**: Acesse http://localhost:3000 e registre-se
2. **Login**: Entre com suas credenciais
3. **Agendar**: Selecione prestador, data e horário
4. **Gerenciar**: Veja seus agendamentos no dashboard

## 📄 Licença

MIT

---

**Para mais detalhes, consulte [SETUP_COMPLETO.md](SETUP_COMPLETO.md)**
