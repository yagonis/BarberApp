# 🔓 Como Desabilitar a Proteção do Deployment no Vercel

## Problema Atual

A API está retornando uma página de autenticação em vez de responder às requisições. Isso acontece porque o **Deployment Protection** está ativado.

## ✅ Solução Rápida

### Via Dashboard do Vercel:

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto: **barber-jvdfqo5ub-yago-britos-projects**
3. Vá em **Settings** (⚙️)
4. No menu lateral, clique em **Deployment Protection**
5. Desabilite a proteção:
   - **Standard Protection**: OFF
   - **Vercel Authentication**: OFF
6. Salve as alterações

### Via CLI (Alternativa):

```bash
cd "/home/yago/Área de trabalho/barberapp/barberapp-api-master"
vercel --prod
```

## 🧪 Teste Após Desabilitar

Aguarde 1-2 minutos e teste novamente:

```bash
curl https://barber-jvdfqo5ub-yago-britos-projects.vercel.app/
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

## ⚠️ Nota sobre Segurança

- Para APIs públicas, deixe a proteção **desabilitada**
- Para APIs privadas/internas, você pode usar:
  - **Environment Variables** para chaves de API
  - **JWT Authentication** no código (já implementado)
  - **IP Allowlist** (plano Pro)

## 📸 Localização no Dashboard

```
Vercel Dashboard
  └── Seu Projeto
      └── Settings (⚙️)
          └── Deployment Protection
              ├── Standard Protection [OFF] ← Desabilite aqui
              └── Vercel Authentication [OFF] ← Desabilite aqui
```

## ✅ Após Desabilitar

A API funcionará normalmente e você poderá:
- Acessar `GET /` para health check
- Fazer `POST /sessions` para login
- Fazer `POST /users` para registro
- Usar todos os endpoints com autenticação JWT

