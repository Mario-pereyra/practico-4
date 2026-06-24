---
type: Reference
name: Cinematheque Administrative System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#564338'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#897267'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#903f00'
  on-primary: '#ffffff'
  primary-container: '#b45309'
  on-primary-container: '#fff1eb'
  inverse-primary: '#ffb68e'
  secondary: '#555f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f3'
  on-secondary-container: '#596373'
  tertiary: '#005998'
  on-tertiary: '#ffffff'
  tertiary-container: '#0072c0'
  on-tertiary-container: '#eef3ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb68e'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#d9e3f6'
  secondary-fixed-dim: '#bdc7d9'
  on-secondary-fixed: '#121c2a'
  on-secondary-fixed-variant: '#3d4756'
  tertiary-fixed: '#d2e4ff'
  tertiary-fixed-dim: '#9fcaff'
  on-tertiary-fixed: '#001d36'
  on-tertiary-fixed-variant: '#00497e'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  surface-white: '#FFFFFF'
  text-main: '#111827'
  text-muted: '#4B5563'
  border-subtle: '#E5E7EB'
  status-confirmed: '#065F46'
  status-canceled: '#991B1B'
  status-reserved: '#92400E'
  status-available: '#1E40AF'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The visual identity of the design system is rooted in **Modern Corporate Minimalism** with an academic undertone. It is designed for an administrative and cinematic management environment where clarity, efficiency, and professional rigor are paramount. The aesthetic avoids the typical "neon-and-popcorn" tropes of cinema apps, opting instead for a sophisticated, archival feel that reflects the logistical complexity of theater management.

The target audience consists of administrative staff and discerning clients who value a focused, distraction-free interface. The emotional response should be one of **trust, precision, and calm**.

**Design Principles:**
- **Rationality:** Every element has a clear purpose and logical placement within a structured grid.
- **Sobriety:** Use of high-quality typography and subtle tonal shifts instead of heavy decorative elements.
- **Precision:** High-contrast actions and clear boundaries to facilitate rapid data entry and management.

## Colors

The palette is anchored by a neutral foundation to ensure long-term legibility and reduced eye strain during administrative tasks.

- **Primary (Amber Dark):** Used exclusively for primary call-to-actions (CTAs), highlights, and critical administrative triggers. It provides a warm, sophisticated contrast against the cool grays.
- **Secondary (Deep Slate):** Used for navigation sidebars, headers, and structural elements to provide a sense of authority and groundedness.
- **Neutral (Light Gray):** The primary background color (`#F9FAFB`) provides a soft canvas, while **White** is reserved strictly for interactive containers (cards, tables, modals) to create a clear "layering" effect.
- **Status Colors:** Functional colors for badges follow a muted but clear logic, ensuring they do not compete with the primary amber accent.

## Typography

The design system utilizes **Hanken Grotesk** across all roles. This typeface was selected for its exceptional legibility in data-heavy environments and its "sharp" contemporary finish which bridges the gap between academic seriousness and modern tech.

- **Headlines:** Use tighter letter-spacing and heavier weights to establish a clear hierarchy.
- **Labels:** Small labels use uppercase styling with increased letter-spacing to improve scanability in badges and table headers.
- **Body:** Standardized at 16px for optimal reading of descriptions and movie details.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain a structured, "ledger-like" appearance, while transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid with a 1280px max-width centered in the viewport.
- **Admin Shell:** Uses a persistent lateral sidebar (280px) on desktop to provide quick access to "Películas, Salas, and Funciones."
- **Rhythm:** An 8px (0.5rem) base unit governs all spatial relationships. Administrative tables use a compact vertical rhythm to maximize data density without sacrificing legibility.
- **Breakpoints:**
  - Mobile: < 768px (Single column, hidden sidebar).
  - Tablet: 768px - 1024px (Fluid grid, collapsed sidebar icons).
  - Desktop: > 1024px (Fixed grid, expanded sidebar).

## Elevation & Depth

To maintain a "sober and professional" look, this design system avoids heavy shadows or neomorphic effects. Instead, it utilizes **Tonal Layers** and **Low-contrast Outlines**.

- **Level 0 (Background):** The Light Gray (`#F9FAFB`) serves as the base.
- **Level 1 (Cards/Content):** White surfaces (`#FFFFFF`) with a subtle 1px border (`#E5E7EB`).
- **Interaction (Hover):** When an element is interactive (like a MovieCard), a very soft, diffused shadow (10% opacity, 4px blur) is applied to indicate lift.
- **Modals:** Use a semi-transparent backdrop blur (8px) with a Slate-tinted overlay (40% opacity) to maintain focus on the administrative action.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding provides a modern touch without appearing overly "bubbly" or informal.

- **Buttons & Inputs:** Use the standard 0.25rem (4px) radius.
- **Badges:** Use a slightly higher radius (0.5rem) to differentiate them from functional inputs, giving them a distinct "pill-lite" appearance.
- **Movie Posters:** Follow the standard radius to maintain consistency across the UI.

## Components

### Buttons
- **Primary:** Background `#B45309`, text White. Bold, clear, and used only for the main action (e.g., "Confirmar Reserva").
- **Secondary:** Transparent background, border 1px `#E5E7EB`, text `#1F2937`.
- **Ghost:** No border or background, used for "Cancelar" or secondary navigation.

### Administrative Tables (DataTable)
- **Header:** Background `#F3F4F6`, text `#111827` (Label-sm style).
- **Rows:** White background, thin border-bottom. High density.
- **Actions:** Icon-based buttons in Slate for edit/delete, keeping the interface clean.

### Status Badges
- Defined by a low-opacity background of the status color with high-contrast text.
- **Disponible:** Blue tint.
- **Reservado:** Amber tint.

### Form Fields
- Labels are positioned above the input, using `label-lg` in `#1F2937`.
- Inputs have a 1px border in `#E5E7EB` that turns `#B45309` on focus.
- Error states utilize clear red text below the input field.

### MovieCard
- Vertical aspect ratio for posters.
- White container with a subtle border.
- Metadata (Genre, Duration) uses `body-sm` in `#4B5563`.

### SeatMap
- **Available:** Light Gray border, White fill.
- **Occupied:** Solid Slate fill.
- **Selected:** Solid Amber Dark (`#B45309`) fill.
- Grid-based layout with clear row/column labeling.