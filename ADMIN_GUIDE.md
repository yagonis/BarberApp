# 🔐 Guia do Admin Dashboard - BarberApp

## Visão Geral

O Admin Dashboard é uma área restrita para administradores do sistema, onde é possível:
- ✅ Gerenciar usuários (criar, editar, deletar)
- ✅ Gerenciar horários de atendimento dos barbeiros
- ✅ Definir dias e horários de funcionamento

## 🚀 Como Acessar

1. **Login como Admin**: Use uma conta de usuário que tenha privilégios de administrador
2. **Acesse**: `http://localhost:3000/admin`

> ⚠️ **Importante**: Apenas usuários com `admin = true` podem acessar esta área. Se tentar acessar sem permissão, será redirecionado para o dashboard.

## 👥 Gerenciamento de Usuários

### Criar Novo Usuário
1. Clique no ícone "Usuários" na barra lateral
2. Clique em "+ Novo Usuário"
3. Preencha:
   - **Nome**: Nome completo do usuário
   - **Email**: Email único do sistema
   - **Senha**: Senha inicial
   - **Barbeiro (Provider)**: Marque se é prestador de serviço
   - **Administrador**: Marque se terá acesso ao painel admin

4. Clique em "Criar"

### Editar Usuário
1. Localize o usuário na tabela
2. Clique no ícone de edição (lápis)
3. Atualize os dados desejados
4. Clique em "Atualizar"

> **Nota**: Deixe o campo de senha vazio para manter a senha atual

### Deletar Usuário
1. Localize o usuário na tabela
2. Clique no ícone de lixeira (delete)
3. Confirme a exclusão

> ⚠️ **Atenção**: A exclusão é irreversível e removerá todos os agendamentos do usuário

## 📅 Gerenciamento de Horários

### Editar Horários de um Barbeiro
1. Clique no ícone "Horários" na barra lateral
2. Selecione o barbeiro no dropdown
3. Para cada dia da semana:
   - **Marcar como Aberto/Fechado**: Use o toggle
   - **Horário de Abertura**: Defina a hora de início
   - **Horário de Fechamento**: Defina a hora de término

4. Clique em "Salvar Horários"

### Exemplo de Configuração
```
Segunda: 08:00 - 18:00 (Aberto)
Terça:   08:00 - 18:00 (Aberto)
Quarta:  08:00 - 18:00 (Aberto)
Quinta:  08:00 - 18:00 (Aberto)
Sexta:   08:00 - 18:00 (Aberto)
Sábado:  09:00 - 13:00 (Aberto)
Domingo: ----- (Fechado)
```

## 🔄 Estrutura de Dados

### Campos de Usuário
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email único
- `password`: Senha (hasheada)
- `provider`: Indica se é barbeiro (true/false)
- `admin`: Indica se é administrador (true/false)
- `avatar_id`: ID da foto de perfil

### Campos de Horário
- `id`: Identificador único
- `provider_id`: ID do barbeiro
- `day_of_week`: Dia da semana (0-6: seg-dom)
- `start_time`: Hora de abertura (HH:MM)
- `end_time`: Hora de fechamento (HH:MM)
- `is_open`: Status (aberto/fechado)

## 🔐 Segurança

### Middleware de Admin
- Todas as rotas de admin requerem token JWT válido
- Verifica se o usuário tem `admin = true`
- Retorna erro 403 (Forbidden) se sem permissão

### Backend Endpoints

```bash
# Usuários
GET    /admin/users              # Listar todos
POST   /admin/users              # Criar novo
PUT    /admin/users/:id          # Atualizar
DELETE /admin/users/:id          # Deletar

# Horários
GET    /admin/schedule-config/:provider_id    # Listar
POST   /admin/schedule-config/:provider_id    # Criar/Atualizar
PUT    /admin/schedule-config/:id             # Atualizar um horário
DELETE /admin/schedule-config/:id             # Deletar
```

## 💡 Dicas e Truques

### Criando seu Primeiro Admin
1. Use a API diretamente ou o banco de dados:
```sql
UPDATE users SET admin = true WHERE id = 1;
```

2. Ou via POST inicial:
```bash
POST /admin/users
{
  "name": "Admin Principal",
  "email": "admin@barbershop.com",
  "password": "senha_segura",
  "admin": true
}
```

### Padrão de Horários
O sistema salva horários para todos os 7 dias da semana. Se um dia não tiver configuração, usa valores padrão:
- Seg-Sex: 08:00 - 18:00
- Sábado: 09:00 - 13:00
- Domingo: Fechado

## ❌ Problemas Comuns

### "Acesso Negado" ao acessar /admin
- ✅ Verifique se seu usuário tem `admin = true` no banco
- ✅ Faça logout e login novamente
- ✅ Limpe o cache do navegador

### "Erro ao carregar barbeiros"
- ✅ Verifique se existem usuários com `provider = true`
- ✅ Verifique a conectividade com a API

### Horários não salvam
- ✅ Verifique se o barbeiro está corretamente selecionado
- ✅ Veja os logs da API para mais detalhes
- ✅ Verifique a conexão com o banco de dados

## 🔄 Próximas Melhorias Sugeridas

- [ ] Busca e filtro de usuários
- [ ] Paginação na tabela de usuários
- [ ] Importação em massa de usuários
- [ ] Relatórios de agendamentos
- [ ] Gestão de serviços/cortes
- [ ] Histórico de alterações
- [ ] Controle de acesso granular
