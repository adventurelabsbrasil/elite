# 🚀 Quick Start - Ver a Landing Page

## Passos para visualizar a LP funcionando:

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Acessar no Navegador
Abra: [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Notas Importantes

### Formulário (Modo Demo)
- O formulário está configurado para funcionar **mesmo sem Supabase**
- Ele vai redirecionar para a página de agradecimento
- Os dados serão apenas logados no console (não salvos)

### Para o Formulário Funcionar Completamente:
1. Criar projeto no Supabase
2. Executar o SQL em `supabase-schema.sql`
3. Atualizar `.env.local` com as credenciais:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-key
   ```

### Área Admin
- A área admin (`/admin`) **só funciona com Supabase configurado**
- Para ver a landing page, não precisa configurar ainda

---

## ✅ Checklist Rápido

- [ ] `npm install` executado
- [ ] `npm run dev` rodando
- [ ] Acessar http://localhost:3000
- [ ] Verificar se a landing page carrega
- [ ] Testar scroll pelas seções
- [ ] Testar formulário (modo demo)

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
- Execute `npm install` novamente

### Erro: "Port 3000 already in use"
- Feche outros processos usando a porta 3000
- Ou use: `npm run dev -- -p 3001`

### Imagens não aparecem
- Verifique se a pasta `public/` existe e tem os arquivos
- No Windows, pode ser `Public/` (maiúscula) - Next.js aceita ambos

---

**Pronto! Agora você pode ver a landing page funcionando! 🎉**
