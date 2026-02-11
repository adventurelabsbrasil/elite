# Guia de instalação do Pixel para tráfego pago

Este guia explica como instalar e configurar pixels de rastreamento (Meta/Facebook e opcionalmente Google Ads) no site ELITE para campanhas de tráfego pago.

---

## 1. Meta (Facebook) Pixel

### 1.1 Obter o ID do Pixel

1. Acesse [Meta Business Suite](https://business.facebook.com) ou [Gerenciador de Eventos](https://business.facebook.com/events_manager).
2. Selecione a conta de anúncios (ou crie um Pixel).
3. Em **Fontes de dados** → **Pixels**, copie o **ID do Pixel** (numérico, ex.: `1234567890123456`).

### 1.2 Configurar variável de ambiente

No `.env.local` (e na Vercel, em **Settings → Environment Variables**) adicione:

```env
# Meta Pixel – ID numérico do pixel (Events Manager)
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

Deixe em branco ou não defina a variável se não for usar Meta Pixel.

### 1.3 Onde o pixel é carregado no projeto

| Arquivo | Função |
|--------|--------|
| `components/Pixel/MetaPixel.tsx` | Injetar o script do Meta Pixel e disparar **PageView** em todas as páginas. |
| `components/Pixel/ObrigadoPixel.tsx` | Disparar o evento **Lead** ao carregar a página de obrigado (pós-formulário). |
| `app/layout.tsx` | Inclui `<MetaPixel />` no body. |
| `app/obrigado/page.tsx` | Inclui `<ObrigadoPixel />` para registrar conversão Lead. |

Se `NEXT_PUBLIC_META_PIXEL_ID` não estiver definido, o pixel não é carregado (sem erro).

### 1.4 Eventos recomendados para tráfego

| Evento   | Quando disparar              | Uso em campanhas        |
|----------|------------------------------|-------------------------|
| PageView | Carregamento de qualquer página | Remarketing, otimização |
| Lead     | Após envio do formulário (redirect /obrigado) | Conversão, otimização de lead |

---

## 2. Google Ads (opcional)

### 2.1 Obter o ID de conversão

1. Acesse [Google Ads](https://ads.google.com) → **Ferramentas** → **Conversões**.
2. Crie uma conversão do tipo **Site** (ex.: “Lead – formulário ELITE”).
3. Copie o **ID de tag** (formato `AW-XXXXXXXXX`) e o **ID de conversão** (ex.: `AbCdEfGhIjKlMnOpQrStUvWxYz`).

### 2.2 Variáveis de ambiente

```env
# Google Ads – ID da tag (AW-...)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
# ID da ação de conversão (criada em Conversões no Google Ads)
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIjKlMnOpQrStUvWxYz
```

### 2.3 Onde configurar no código

- Incluir o script global do gtag (`gtag('config', AW-...)`) no layout.
- Na página de obrigado, disparar `gtag('event', 'conversion', { send_to: 'AW-XXX/YYY' })` usando o mesmo `send_to` configurado no Google Ads.

Para implementar Google Ads no mesmo padrão do Meta Pixel, crie um componente que injeta o gtag e chame o evento de conversão na página de obrigado (conforme IDs em **Ferramentas → Conversões**).

---

## 3. Checklist antes de ligar o tráfego

- [ ] Pixel Meta: `NEXT_PUBLIC_META_PIXEL_ID` preenchido no ambiente (local e Vercel).
- [ ] Google (se usar): `NEXT_PUBLIC_GOOGLE_ADS_ID` e label de conversão configurados.
- [ ] Teste em produção: enviar um lead de teste e conferir no Gerenciador de Eventos (Meta) e em Conversões (Google) se o evento Lead/Conversão aparece.
- [ ] Consentimento: em sites que exigem LGPD/cookie banner, considere carregar o pixel apenas após consentimento (implementação à parte).

---

## 4. Testar o pixel

### Meta

1. Instale a extensão [Meta Pixel Helper](https://www.facebook.com/business/help/742478679120153) (Chrome).
2. Acesse a LP e a página de obrigado após enviar o formulário.
3. Confira se **PageView** e **Lead** aparecem na extensão e no Gerenciador de Eventos (tempo real).

### Google Ads

1. Em **Ferramentas** → **Conversões**, use “Testar conversões” ou aguarde algumas horas e verifique se a conversão foi registrada após um lead de teste.

---

## 5. Resumo rápido

| Item              | Onde configurar                          |
|-------------------|-------------------------------------------|
| ID Meta Pixel     | `NEXT_PUBLIC_META_PIXEL_ID` no .env/Vercel |
| ID Google Ads     | `NEXT_PUBLIC_GOOGLE_ADS_ID` + conversion label |
| Código no site    | Layout global + página /obrigado (evento Lead) |
| Teste             | Pixel Helper (Meta) + Conversões (Google) |

Com o pixel instalado e os eventos de Lead disparando, você pode criar campanhas de tráfego pago (Meta e/ou Google) e otimizar para conversões de lead.
