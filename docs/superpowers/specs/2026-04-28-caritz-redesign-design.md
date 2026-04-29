# Caritz — Rediseño Visual del Frontend

**Fecha:** 2026-04-28  
**Rama:** feat/brand-color-redesign  
**Autor:** Brainstorming session con Gabriel Figueroa

---

## Objetivo

Rediseñar la interfaz de Caritz Joyería para que el diseño comunique **joyería artesanal de diseño** de forma coherente con el logo existente (botánico, borgoña, serif elegante). El diseño actual se percibe inconsistente — la paleta mezcla tonos sin criterio y no transmite calidad artesanal.

Referencia de mercado analizada: ginebrajoyeria.mx, Mejuri, Missoma.

---

## Decisiones de diseño aprobadas

### 1. Paleta de colores

Reemplaza completamente la paleta anterior (`gold`, `rose`, `teal`, `cream`, `blush`).

| Token Tailwind | Rol | Hex |
|---|---|---|
| `burgundy` | Primario — del logo | `#6E1F3A` |
| `burgundy-dark` | Hover / gradientes | `#9B3555` |
| `sage` | Acento botánico | `#7A8C72` |
| `sage-light` | Fondos de cards | `#E8EDE4` |
| `gold` | Acento metálico | `#B89060` |
| `gold-light` | Detalles, ornamentos | `#C4A882` |
| `cream` | Fondo principal | `#F5F2EC` |
| `cream-dark` | Fondo alternativo / secciones | `#EDE5D8` |
| `ink` | Texto principal | `#1A1018` |
| `muted` | Texto secundario | `#7A6A5A` |

**Regla de uso:**
- `burgundy` → acentos primarios, CTAs, badges de precio, bordes activos
- `sage` → etiquetas de sección, detalles botánicos, bordes suaves en cards
- `gold` → ornamentos decorativos, líneas separadoras, iconos metálicos
- `cream` → fondo de página, hero, secciones claras
- `sage-light` → fondo de product cards (reemplaza el anterior `#faeef1`)

### 2. Tipografía

Sin cambios — la combinación actual funciona bien con el nuevo sistema de color:
- **Serif:** Playfair Display — títulos, nombres de producto, frases de marca
- **Sans:** Inter — navegación, precios, etiquetas, body copy

### 3. Hero (homepage)

**Estilo:** Minimalista — logo como protagonista absoluto, fondo crema.

Elementos:
- Barra ornamental superior: `linear-gradient(90deg, transparent, burgundy, sage, transparent)` — 3px
- Ornamento de líneas con punto dorado centrado
- Caja del logo: borde `rgba(110,31,58,0.1)`, `border-radius: 16px`, fondo `linear-gradient(135deg, cream, cream-dark/50)`
- Logo `/images/logo-2x.png` — tamaño máximo en desktop
- Texto "By Beatriz Figueroa" en `muted`, `letter-spacing: 4px`, `uppercase`
- Descripción en `muted`, máx 480px de ancho
- **Dos CTAs en desktop:** "Explorar Colección" (borde burgundy) + "Nuestra historia" (borde muted/ghost)
- **Un CTA en móvil:** Solo "Explorar Colección"
- Barra ornamental inferior: variante con sage/burgundy invertidos — 2px
- Sin hero oscuro (`#180A0D` eliminado)

### 4. Estructura del homepage

Orden de secciones:

```
Navbar
Hero (minimalista crema)
Frase de marca ("Quote section")
Productos destacados (grid asimétrico)
Nuestra historia (sección borgoña)
Propuesta de valor (3 cards)
Newsletter
Footer
```

#### 4a. Quote section
- Línea vertical izquierda: `linear-gradient(180deg, burgundy, sage)`, 4px, `border-radius: 2px`
- Frase en Playfair Display, 24px desktop / 18px móvil, `font-style: italic`, color `burgundy`
- Autoría: "— Beatriz Figueroa, Fundadora de Caritz"
- Badge derecho (solo desktop): tarjeta pequeña con íconos "Hecha en México" + "100% Artesanal"

#### 4b. Productos destacados
- **Desktop:** Grid 4 columnas — primera card más grande (1.4fr), las otras iguales
- **Móvil:** Grid 2 columnas — primera card ocupa 2 filas (grid asimétrico)
- Header de sección: label `sage` + título serif `ink` + línea dorada + link "Ver toda la colección →"

#### 4c. Nuestra historia
- Fondo `burgundy` con `border-radius: 20px`, margen horizontal 48px desktop / 20px móvil
- **Desktop:** 2 columnas — texto izquierda, ornamento decorativo (anillos concéntricos + rosa 🌹) derecha
- **Móvil:** columna única
- Badge label en `sage` (acento botánico)
- CTA: borde `rgba(sage, 0.5)`, texto `sage`
- **No usar** `bg-[#180A0D]` — usar solo `burgundy` (`#6E1F3A`)

#### 4d. Propuesta de valor
- 3 cards en `white` con borde `rgba(burgundy, 0.06)`, `border-radius: 12px`
- Items: ✦ Artesanal · 🛡 Garantía de por vida · 🚚 Envío gratis +$500 MXN
- Título en Playfair Display, descripción en Inter 11px `muted`

#### 4e. Newsletter
- Fondo: `linear-gradient(135deg, burgundy, burgundy-dark)`
- **Desktop:** 2 columnas — copy izquierda, formulario derecha
- **Móvil:** columna única, centrado
- Input: `background: rgba(white, 0.12)`, borde suave, `border-radius: 28px`
- Botón: fondo `cream`, texto `burgundy`

### 5. Product Card

**Estilo base:** Fondo `sage-light` (`#E8EDE4`), `border-radius: 14px`, borde `rgba(sage, 0.25)`.

Anatomía:
```
[Imagen con fondo gradiente sage-light → cream-dark]
  Badge "NUEVO" / "OFERTA" → fondo gold (nuevo) / burgundy-dark (oferta)
  Ícono corazón wishlist → borde gold/50, fondo cream/85
[Body]
  Categoría → sage, 8px, letter-spacing 2px, uppercase
  Nombre → Playfair Display, 13px (card normal) / 16px (card grande)
  [Fila precio + metal]
    Price pill → fondo burgundy, texto cream, border-radius 20px
    Metal → gold, 8px
  [CTA — dos estados]
```

**Interacción CTA (UX quantity stepper):**

Estado 1 — Reposo:
```
[+ Agregar al carrito]   ← botón pill burgundy full-width
```

Estado 2 — Al hacer clic en "Agregar" (se transforma in-place):
```
[ − · 2 · + ]  [🛍]
  stepper ctl   ícono carrito redondo burgundy
```

- El stepper usa `border: 1.5px solid burgundy`, `border-radius: 20px`, fondo blanco
- El botón carrito es un círculo `burgundy` con ícono `ShoppingBag` — al hacer clic navega a `/cart`
- Hacer clic en `−` hasta llegar a 0 regresa al estado botón "Agregar" y elimina el item del carrito
- Cada cambio en el stepper (+ o −) actualiza el carrito **inmediatamente** vía `cartStore` — no hay confirmación separada
- El ícono carrito circular es solo navegación a `/cart`, no un botón de confirmación

### 6. Navbar

Sin cambios estructurales. Solo actualización de colores:
- Transparente en hero → borde `white/10`, links `white/80`
- Scrolled → fondo `cream/95`, borde `burgundy/8`, links `ink/70` con hover `sage`
- Underline hover: cambia de `rose` a `burgundy`
- Badge del carrito: cambia de `rose` a `burgundy`
- Botón de idioma: hover borde/texto `sage`

### 7. Footer

Nueva estructura de 4 columnas (desktop) / 2 columnas (móvil):
- Col 1: Logo + descripción + redes sociales
- Col 2: Colecciones (Anillos, Collares, Aretes, Pulseras, Novedades)
- Col 3: Información (Nuestra historia → `/`, Guía de tallas → placeholder `#`, Cuidado de joyas → placeholder `#`, Blog → placeholder `#`)
- Col 4: Ayuda (Envíos, Devoluciones, Garantía, Contacto, FAQ)
- Fondo: `ink` (`#1A1018`)
- Bottom bar: copyright + links legales

---

## Scope de implementación

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `tailwind.config.ts` | Reemplazar paleta completa con nuevos tokens |
| `src/app/globals.css` | Actualizar colores de scrollbar, clases base |
| `src/app/layout.tsx` | Sin cambios |
| `src/components/layout/Header.tsx` | Actualizar colores de hover y badge |
| `src/components/layout/Footer.tsx` | Rediseño completo — 4 columnas |
| `src/components/HomePageClient.tsx` | Rediseño completo de todas las secciones |
| `src/components/features/ProductCard.tsx` | Nuevo estilo + lógica de stepper |

### Archivos fuera de scope (no tocar)
- Páginas de admin, auth, account, checkout, cart — se benefician del cambio de tokens pero no se rediseñan
- Stores, hooks, API, types — sin cambios
- i18n / traducciones — sin cambios de estructura (solo se revisarán strings si hace falta)

---

## Notas técnicas

- El stepper en `ProductCard` necesita acceso a `cartStore` — el componente ya es client component, sin problema
- La lógica del stepper usa `useState<number>` local inicializado desde `cartStore.getItemQty(sku)`. Cada cambio llama a `cartStore.updateQuantity(sku, newQty)` inmediatamente — no hay estado desincronizado
- Eliminar completamente el color `#180A0D` del codebase — reemplazar por `burgundy`
- Los gradientes decorativos del hero actual (radial glow) se eliminan — el nuevo hero es limpio
- Los anillos flotantes animados del hero actual se eliminan — el nuevo ornamento es estático (líneas + punto)
- La sección de **categorías actual** (`CATEGORY_GRADIENTS`) se **elimina del homepage** — reemplazada por la Quote section y el grid de productos. La navegación por categoría se mantiene vía navbar y página `/products`
- Las clases `from-rose/30`, `from-gold/20` en `CATEGORY_GRADIENTS` quedan obsoletas y se eliminan junto con la sección
