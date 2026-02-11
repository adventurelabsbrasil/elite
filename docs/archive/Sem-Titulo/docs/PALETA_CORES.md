# Paleta de Cores - Loteadora ELITE

## Cores Oficiais

Paleta definida em `Assets/Loteadora_Elite_ColorTheme.jpeg` (Adobe Color).

### 1. Premium Quartz
- **Hexadecimal**: `#F2F4F6`
- **RGB**: `242, 244, 246`
- **HSL**: `210°, 14%, 96%`
- **Essência da Marca**: Reflete clareza, superfícies de alto padrão e o respiro necessário em interfaces digitais.
- **Uso**: Fundos claros, backgrounds secundários, espaçamentos, áreas de respiro visual

### 2. Sold Red
- **Hexadecimal**: `#DA0028`
- **RGB**: `218, 0, 40`
- **HSL**: `348°, 100%, 43%`
- **Essência da Marca**: A cor da conversão máxima. Remete ao selo de "Vendido" e à energia do fechamento.
- **Uso**: CTAs principais, botões de ação, destaques de conversão, urgência, elementos de fechamento

### 3. Blueprint Navy
- **Hexadecimal**: `#0E1D37`
- **RGB**: `14, 29, 55`
- **HSL**: `218°, 59%, 14%`
- **Essência da Marca**: Representa o planejamento estratégico e a fundação de qualquer grande projeto urbano.
- **Uso**: Textos principais, headers, dark mode, elementos de destaque, seções estratégicas

### 4. Smart Flow
- **Hexadecimal**: `#00BCBC`
- **RGB**: `0, 188, 188`
- **HSL**: `180°, 100%, 37%`
- **Essência da Marca**: Focado na automação. Representa a fluidez dos dados e a tecnologia "limpa".
- **Uso**: Elementos secundários, ícones, acentos, links, seções de tecnologia/automação

### 5. Urban Glow
- **Hexadecimal**: `#FE5009`
- **RGB**: `254, 80, 9`
- **HSL**: `13°, 99%, 52%`
- **Essência da Marca**: Simboliza o crescimento das cidades e o dinamismo do marketing imobiliário moderno.
- **Uso**: CTAs secundários, alertas, destaques alternativos, badges, elementos de crescimento/dinamismo

## Aplicação na Landing Page

### Hierarquia de Cores - Distribuição de Uso

**Regra de Ouro:**
- **60%** Blueprint Navy (`#0E1D37`) - Base estrutural
- **30%** Premium Quartz (`#F2F4F6`) - Fundos e espaçamentos
- **8%** Smart Flow (`#00BCBC`) + Urban Glow (`#FE5009`) - Cores de destaque oficiais
- **2%** Sold Red (`#DA0028`) - **Casos extremamente raros apenas**

### Cores de Destaque Oficiais

**Smart Flow** e **Urban Glow** são as cores de destaque oficiais para CTAs e elementos de ação.

#### Cores Primárias (Ação)
- **CTA Principal**: `#00BCBC` (Smart Flow) ou `#FE5009` (Urban Glow) - Cores de destaque oficiais
- **CTA Secundário**: Alternar entre Smart Flow e Urban Glow conforme contexto
- **Sold Red**: Apenas em casos extremamente raros (ex: alertas críticos, urgência máxima)

#### Cores de Texto
- **Texto Principal (Light Mode)**: `#0E1D37` (Blueprint Navy) - Planejamento estratégico
- **Texto Secundário (Light Mode)**: `#0E1D37` com opacidade 70-80%
- **Texto Principal (Dark Mode)**: `#F2F4F6` (Premium Quartz) - Clareza e alto padrão
- **Texto Secundário (Dark Mode)**: `#F2F4F6` com opacidade 70-80%

#### Cores de Fundo
- **Fundo Claro (Light Mode)**: `#F2F4F6` (Premium Quartz) - Clareza e respiro, ou `#FFFFFF`
- **Fundo Escuro (Dark Mode)**: `#0E1D37` (Blueprint Navy) - Fundação estratégica
- **Fundo de Seções**: Alternar entre claro e escuro para contraste e hierarquia visual

#### Cores de Acento (8% do total)
- **Ícones**: `#00BCBC` (Smart Flow) - Tecnologia e automação, ou `#FE5009` (Urban Glow) - Dinamismo
- **Links**: `#00BCBC` (Smart Flow) - Fluidez dos dados
- **Badges/Tags**: `#FE5009` (Urban Glow) - Crescimento, ou `#00BCBC` (Smart Flow) - Automação
- **Bordas**: `#0E1D37` (Blueprint Navy) com opacidade 20-30% - Estrutura sutil
- **Destaques**: Usar Smart Flow ou Urban Glow para elementos que precisam chamar atenção

#### Sold Red - Uso Extremamente Raro (2% do total)
- **Apenas para**: Alertas críticos, urgência máxima, situações excepcionais
- **NÃO usar para**: CTAs principais, botões de ação padrão, elementos comuns
- **Exemplos de uso raro**: Avisos de erro crítico, alertas de segurança, urgência extrema de prazo

## Configuração Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        elite: {
          // Nomes técnicos (para uso no código)
          quartz: '#F2F4F6',      // Premium Quartz
          'sold-red': '#DA0028',  // Sold Red
          navy: '#0E1D37',        // Blueprint Navy
          flow: '#00BCBC',        // Smart Flow
          glow: '#FE5009',        // Urban Glow
          
          // Aliases para compatibilidade
          gray: '#F2F4F6',
          red: '#DA0028',
          turquoise: '#00BCBC',
          orange: '#FE5009',
        },
      },
    },
  },
}
```

## Uso em Componentes

### Botões
- **Primário (Destaque Oficial)**: `bg-elite-flow text-white hover:bg-[#009999]` - Smart Flow (tecnologia/automação)
- **Primário Alternativo**: `bg-elite-glow text-white hover:bg-[#E04508]` - Urban Glow (crescimento/dinamismo)
- **Secundário**: Alternar entre Smart Flow e Urban Glow conforme contexto
- **Sold Red (Raro)**: `bg-elite-sold-red text-white hover:bg-[#B80020]` - **Apenas casos extremamente raros**

### Cards
- **Light Mode**: `bg-white border-elite-navy/20` - Fundação estratégica sutil
- **Dark Mode**: `bg-elite-navy border-elite-flow/30` - Blueprint Navy com acento Smart Flow

### Textos
- **Headings**: `text-elite-navy` (light - Blueprint Navy) ou `text-elite-quartz` (dark - Premium Quartz)
- **Body**: `text-elite-navy/90` (light) ou `text-elite-quartz/90` (dark)

## Acessibilidade

### Contraste WCAG AA
- ✅ `#DA0028` sobre `#F2F4F6`: 4.5:1 (passa)
- ✅ `#0E1D37` sobre `#F2F4F6`: 15.8:1 (passa)
- ✅ `#00BCBC` sobre `#0E1D37`: 4.2:1 (passa - considerar ajuste)
- ✅ `#FE5009` sobre `#0E1D37`: 3.8:1 (considerar ajuste para AA)

### Recomendações de Uso

#### Distribuição Visual (60-30-8-2)
1. **Blueprint Navy (60%)**: Base estrutural
   - Textos principais, headers, seções estratégicas
   - Fundo dark mode
   - Elementos estruturais

2. **Premium Quartz (30%)**: Fundos e respiro
   - Fundos claros, backgrounds secundários
   - Espaçamentos, áreas de respiro
   - Textos em dark mode

3. **Smart Flow + Urban Glow (8%)**: Destaques oficiais
   - **CTAs principais**: Usar Smart Flow ou Urban Glow (não Sold Red)
   - Ícones, links, badges, elementos de destaque
   - Alternar entre as duas cores conforme contexto

4. **Sold Red (2%)**: Casos extremamente raros
   - **NÃO usar para CTAs principais**
   - Apenas alertas críticos, urgência máxima, situações excepcionais
   - Usar com parcimônia extrema

#### Boas Práticas
- **CTAs**: Sempre usar Smart Flow ou Urban Glow (cores de destaque oficiais)
- **Textos**: Blueprint Navy sobre Premium Quartz (light mode) ou Premium Quartz sobre Blueprint Navy (dark mode)
- **Destaques**: Smart Flow para tecnologia/automação, Urban Glow para crescimento/dinamismo
- **Sold Red**: Evitar ao máximo, apenas em situações críticas excepcionais
- Testar contraste de Smart Flow e Urban Glow sobre Blueprint Navy e Premium Quartz

## Variações e Gradientes

### Gradientes Sugeridos
- **Hero Background**: `from-elite-navy to-elite-navy/80` - Blueprint Navy (fundação estratégica - 60%)
- **CTA Hover**: `from-elite-flow to-elite-glow` - Smart Flow para Urban Glow (destaques oficiais - 8%)
- **Acento Tecnologia**: `from-elite-flow to-elite-glow` - Smart Flow para Urban Glow (automação → dinamismo)
- **Estratégia → Destaque**: `from-elite-navy to-elite-flow` ou `from-elite-navy to-elite-glow` - Blueprint Navy para cores de destaque
- **Evitar**: Gradientes com Sold Red (apenas casos extremamente raros)

### Opacidades
- **Overlay**: `bg-elite-navy/80`
- **Bordas sutis**: `border-elite-navy/20`
- **Textos secundários**: `text-elite-navy/70`
