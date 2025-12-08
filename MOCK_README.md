# BarberApp - Mock API

Este projeto agora inclui uma API mock completa para demonstrar as funcionalidades do frontend sem necessidade de banco de dados.

## 🚀 Como Usar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor Mock
```bash
npm run mock
```

O servidor mock estará disponível em `http://localhost:3001`

### 3. Iniciar o Frontend
Em outro terminal, navegue até a pasta do frontend:
```bash
cd barberapp-web-master
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000` e já está configurado para usar o mock.

## 📦 Deploy no Vercel

### Backend Mock (API)
O arquivo `api/mock.js` funciona como uma serverless function no Vercel e simula toda a API do BarberApp.

**Endpoints disponíveis:**
- `GET /api` - Health check
- `POST /api/sessions` - Login
- `POST /api/users` - Registro de usuário
- `PUT /api/users` - Atualizar usuário
- `GET /api/providers` - Listar barbeiros
- `GET /api/providers/:id/available` - Horários disponíveis
- `GET /api/appointments` - Listar agendamentos
- `POST /api/appointments` - Criar agendamento
- `DELETE /api/appointments/:id` - Cancelar agendamento
- `GET /api/notifications` - Listar notificações
- `PUT /api/notifications/:id` - Marcar notificação como lida
- `POST /api/files` - Upload de arquivos (simulado)

### Frontend
Para fazer o deploy do frontend no Vercel:

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `REACT_APP_API_URL` = URL da sua API no Vercel (ex: `https://seu-projeto.vercel.app/api`)
3. O Vercel detectará automaticamente que é um projeto React e fará o build

## 🔧 Estrutura do Mock

### Dados Mock Inclusos:
- **Usuário de teste:** João Silva (joao@example.com)
- **Barbeiros:** 3 provedores de serviço com avatares
- **Agendamentos:** 2 agendamentos de exemplo
- **Notificações:** 2 notificações de teste

### Funcionalidades Implementadas:
✅ Sistema de autenticação (mock)
✅ Listagem de barbeiros
✅ Criação de agendamentos
✅ Cancelamento de agendamentos
✅ Notificações
✅ Horários disponíveis
✅ Upload de avatar (simulado)
✅ CORS habilitado

## 🎯 Credenciais de Teste

Para testar o sistema, você pode fazer login com qualquer email/senha, pois o mock aceita qualquer credencial e retorna um usuário de teste.

## 📝 Notas

- O mock não persiste dados entre reinicializações
- Todos os dados são resetados quando o servidor é reiniciado
- Perfeito para demonstrações e desenvolvimento frontend
- No Vercel, cada request é isolado (stateless)
