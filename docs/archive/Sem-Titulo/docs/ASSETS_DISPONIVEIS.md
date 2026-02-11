# Assets Disponíveis - Loteadora ELITE

## Localização
Todos os assets estão localizados na pasta `Public/`

## Logos e Identidade Visual

### Isotipo (Símbolo)
- **Isotipo.png** (29KB)
  - Versão padrão do símbolo/ícone da marca
  - Uso: Quando apenas o símbolo é necessário
  
- **Isotipo_Light.png** (29KB)
  - Versão otimizada para fundos claros
  - Uso: Headers/footers com fundo claro
  
- **Isotipo_Dark.png** (24KB)
  - Versão otimizada para fundos escuros
  - Uso: Headers/footers com dark mode

### Logo Monocromático
- **Mono_Light.png** (36KB)
  - Versão monocromática para fundos claros
  - Uso: Quando necessário contraste em fundos coloridos claros
  
- **Mono_Dark.png** (36KB)
  - Versão monocromática para fundos escuros
  - Uso: Quando necessário contraste em fundos coloridos escuros

### Logo Completo
- **Primary.png** (39KB)
  - Logo primário completo (símbolo + texto)
  - Uso: Header principal, hero section, materiais principais
  
- **Secondary.png** (39KB)
  - Logo secundário/alternativo
  - Uso: Quando necessário variação do logo principal

## Imagens de Conteúdo

### Foto do Apresentador
- **Ribas Young.png** (675KB)
  - Foto em alta resolução do apresentador/fundador
  - Uso: Hero section, seção "Sobre", materiais impressos
  
- **ribas-young.jpg** (121KB)
  - Versão otimizada para web
  - Uso: Landing page, carregamento rápido

## Recomendações de Uso

### Header/Navigation
- **Light Mode**: `Isotipo_Light.png` ou `Primary.png`
- **Dark Mode**: `Isotipo_Dark.png` ou `Mono_Dark.png`
- **Tamanho recomendado**: Altura de 40-60px

### Hero Section
- **Logo**: `Primary.png` (tamanho grande, 120-150px de altura)
- **Foto do Apresentador**: `ribas-young.jpg` (otimizada para web)
- **Layout**: Logo à esquerda, foto à direita (ou vice-versa)

### Footer
- **Logo**: `Mono_Light.png` ou `Mono_Dark.png` (dependendo do tema)
- **Tamanho recomendado**: Altura de 30-40px

### Favicon
- **Arquivo**: `Isotipo.png` ou `Isotipo_Dark.png`
- **Formatos necessários**: 
  - `favicon.ico` (16x16, 32x32, 48x48)
  - `favicon.png` (32x32)
  - `apple-touch-icon.png` (180x180)

### Seção "Sobre o Apresentador"
- **Foto**: `Ribas Young.png` (alta resolução)
- **Tamanho**: 300-400px de largura (responsivo)

### Materiais de Marketing
- **Logo Principal**: `Primary.png`
- **Logo Alternativo**: `Secondary.png`
- **Foto**: `Ribas Young.png` (alta resolução)

## Otimização para Web

### Formatos Recomendados
- **Logos**: PNG (transparência) ou SVG (preferível se disponível)
- **Fotos**: JPG (otimizado) ou WebP (melhor compressão)

### Tamanhos Sugeridos
- **Logo Header**: 120-150px de largura (retina: 240-300px)
- **Logo Footer**: 80-100px de largura (retina: 160-200px)
- **Foto Hero**: 400-600px de largura (retina: 800-1200px)
- **Foto Seção**: 300-400px de largura (retina: 600-800px)

### Lazy Loading
- Implementar lazy loading para imagens abaixo do fold
- Usar `loading="lazy"` em tags `<img>`
- Considerar Next.js Image component para otimização automática

## Estrutura de Pastas Recomendada

```
public/
├── logos/
│   ├── isotipo.png
│   ├── isotipo-light.png
│   ├── isotipo-dark.png
│   ├── mono-light.png
│   ├── mono-dark.png
│   ├── primary.png
│   └── secondary.png
├── images/
│   ├── ribas-young.jpg (web)
│   └── ribas-young.png (alta resolução)
└── favicon.ico
```

## Checklist de Implementação

- [ ] Organizar assets em pastas (logos/, images/)
- [ ] Criar versões otimizadas (WebP, tamanhos múltiplos)
- [ ] Gerar favicon em múltiplos tamanhos
- [ ] Configurar Next.js Image component (se usando Next.js)
- [ ] Implementar lazy loading
- [ ] Testar logos em diferentes fundos (claro/escuro)
- [ ] Verificar contraste e legibilidade
- [ ] Otimizar tamanhos de arquivo (compressão)
