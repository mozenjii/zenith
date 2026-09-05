---
name: Neo-Graphic Portfolio System
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#a4d64c'
  on-secondary: '#233600'
  secondary-container: '#719e13'
  on-secondary-container: '#1e2f00'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#909191'
  on-tertiary-container: '#282a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#bff365'
  secondary-fixed-dim: '#a4d64c'
  on-secondary-fixed: '#131f00'
  on-secondary-fixed-variant: '#354e00'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is built for creative technologists who need to balance high-level technical proficiency with an energetic, avant-garde aesthetic. The "Neo-Graphic" style merges the raw energy of Neo-Brutalism with the polished execution of modern SaaS interfaces.

The personality is **bold, unapologetic, and precise**. It avoids the "softness" of typical modern design in favor of high-contrast boundaries and intentional, offset depth. The target audience is design-conscious recruiters and fellow creators who value distinctiveness and a strong point of view. The UI should feel like a curated gallery—tactile, rhythmic, and vibrant.

## Colors

The palette is driven by extreme contrast. **Vibrant Purple** serves as the primary brand anchor, used for interactive states and key brand moments. **Acid Green** is the high-energy accent, reserved for "sticker" badges, success states, and primary call-to-actions to ensure maximum "pop" against the **Charcoal** background.

The system uses a dark mode foundation by default to make the vibrant colors feel more luminous. All containers and interactive elements are framed with **True Black (#000000)** borders to provide the necessary structure for the Neo-Graphic aesthetic.

## Typography

The typography strategy relies on the tension between a characterful, variable-style headline and a technical, monospaced utility font.

- **Headlines:** Use **Bricolage Grotesque** for its unique, idiosyncratic curves. It should be set with tight letter-spacing and aggressive line heights.
- **Body:** Use **Hanken Grotesk** for long-form text. It provides a clean, professional balance to the expressive headlines.
- **Labels & UI:** Use **JetBrains Mono** for small labels, data points, and "sticker" content. This reinforces the technical "under the hood" nature of the portfolio.

## Layout & Spacing

This design system uses a **fixed-column grid** for desktop (12 columns) and a **fluid grid** for mobile (4 columns). Layouts should feel modular, like blocks stacked on a canvas.

- **Modular Spacing:** All spacing must be a multiple of 8px.
- **Outer Margins:** Use generous 48px margins on desktop to allow the "sticker" elements and shadows to breathe without clipping.
- **Container Padding:** Internal padding for cards and sections should be consistent at 24px (md) to maintain the structural integrity of the heavy borders.

## Elevation & Depth

Depth in this design system is **physical, not atmospheric**. 

- **Hard Shadows:** Instead of soft Gaussian blurs, use hard-edged, offset shadows. The default shadow is a solid block of color (usually Black or a darker shade of the primary color) offset by `4px 4px` or `8px 8px`.
- **Interaction Depth:** On hover, elements should "press down" by reducing the shadow offset to `2px 2px` and translating the element slightly on the X and Y axes.
- **No Blurs:** Avoid backdrop filters or soft drop shadows entirely. All depth is conveyed through solid fills and offsets.

## Shapes

The shape language is a "Rounded Brutalism." While the borders are heavy and the shadows are hard, the corners are **fully rounded (Pill-shaped)**. This juxtaposition creates a friendly, approachable vibe that softens the aggressive color palette.

- **Borders:** All primary containers and buttons must have a **2px solid black border**.
- **Stickers:** Small UI elements (tags, chips) should use a `rounded-full` radius to resemble physical vinyl stickers.

## Components

### Buttons
Primary buttons use the Acid Green background with a 2px black border and a 4px black hard shadow. On hover, the shadow shrinks to 2px. Use `label-md` (JetBrains Mono) for button text to maintain the technical aesthetic.

### Stickers (Badges)
Stickers are used for categories and skills. They feature a white or purple background, a 2px black border, and are slightly rotated (2-3 degrees) to mimic a haphazardly placed physical sticker.

### Cards
Cards use the Charcoal surface color. They must feature a 2px black border. Content inside should be padded heavily (24px). If the card is interactive, it receives the standard hard-shadow treatment.

### Input Fields
Inputs are flat Charcoal with a 2px black border. On focus, the border changes to Vibrant Purple and the entire field gains a 4px hard shadow in the same purple.

### Progress Bars / Meters
Use Acid Green for the "fill" and Charcoal for the track. The track must have the same 2px black border as other containers.