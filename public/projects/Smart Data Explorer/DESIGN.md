---
name: Smart Data Explorer
colors:
  surface: '#07122a'
  surface-dim: '#07122a'
  surface-bright: '#2f3952'
  surface-container-lowest: '#030d25'
  surface-container-low: '#101b33'
  surface-container: '#151f37'
  surface-container-high: '#1f2942'
  surface-container-highest: '#2a344e'
  on-surface: '#d9e2ff'
  on-surface-variant: '#c5c6cd'
  inverse-surface: '#d9e2ff'
  inverse-on-surface: '#263049'
  outline: '#8f9097'
  outline-variant: '#44474d'
  surface-tint: '#b9c7e4'
  primary: '#b9c7e4'
  on-primary: '#233148'
  primary-container: '#0a192f'
  on-primary-container: '#74829d'
  inverse-primary: '#515f78'
  secondary: '#41e4c0'
  on-secondary: '#00382d'
  secondary-container: '#00c7a5'
  on-secondary-container: '#004d3f'
  tertiary: '#d4bbff'
  on-tertiary: '#400688'
  tertiary-container: '#230052'
  on-tertiary-container: '#956bdf'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#5ffbd6'
  secondary-fixed-dim: '#38debb'
  on-secondary-fixed: '#002019'
  on-secondary-fixed-variant: '#005142'
  tertiary-fixed: '#ebdcff'
  tertiary-fixed-dim: '#d4bbff'
  on-tertiary-fixed: '#260058'
  on-tertiary-fixed-variant: '#582a9f'
  background: '#07122a'
  on-background: '#d9e2ff'
  surface-variant: '#2a344e'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-edge: 32px
---

## Brand & Style

This design system is built on the pillars of **Intelligent Efficiency** and **High-Tech Sophistication**. It is designed for data scientists, analysts, and executive stakeholders who require high-density information delivered through a lens of clarity and futuristic precision.

The visual style is a fusion of **Modern Corporate** reliability and **Subtle Glassmorphism**. By leaning into a dark-mode-first architecture, the system creates a focused, cinematic environment where data visualizations become the focal point. Key interactions are punctuated by "light-leaks" and glowing accents, signaling AI-driven insights and system intelligence. The aesthetic avoids clutter, opting for generous whitespace and razor-sharp borders to maintain a professional, institutional feel.

## Colors

The color architecture is anchored by **Deep Tech Blue (#0A192F)**, providing a stable, low-strain background for prolonged analytical sessions. **Electric Cyan (#64FFDA)** serves as the primary action color, offering high contrast and a futuristic "active" state.

**Dynamic Purple (#B388FF)** is reserved exclusively for AI-augmented features, automated insights, and predictive modeling paths, creating a distinct visual vocabulary for machine-learning elements. Neutrals scale from **Sophisticated Slate** to **Light Grey**, used primarily for secondary typography and structural borders to ensure the hierarchy remains clear without relying on heavy lines.

## Typography

This design system utilizes **Inter** for its entire typographic scale to maintain a clean, utilitarian, and highly readable interface. The hierarchy is established through significant weight shifts rather than excessive size variations. 

Headlines are bold and tight, designed to ground complex dashboards. Labels and data points utilize slightly increased letter spacing and medium weights to ensure legibility against dark backgrounds. For data-heavy tables, a slightly reduced "body-sm" variant is employed to maximize information density without sacrificing the user's ability to scan information quickly.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with a maximum container width of 1600px for desktop environments. This ensures that data visualizations have room to breathe while remaining manageable on ultra-wide monitors.

A 12-column system is used for dashboard layouts, with flexible "widget" containers that typically span 3, 4, 6, or 12 columns. Spacing is intentional and generous; a 24px gutter is the standard to prevent data widgets from feeling cramped. On mobile devices, the grid collapses to a single column with 16px side margins, prioritizing vertical scrollability for charts and key metrics.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows. 

1.  **Base Layer:** The deepest level (#020C1B), reserved for the application background.
2.  **Surface Layer:** Semi-transparent panels with a `backdrop-filter: blur(12px)` and a subtle 1px border (#CCD6F6 at 10% opacity). This creates a sense of physical stacks.
3.  **Accent Elevation:** AI components utilize a "Glow" effect—a soft, diffused outer shadow using the Dynamic Purple (#B388FF) at 20-30% opacity to simulate light emitting from the element.
4.  **Interaction:** Hover states on cards should slightly increase the border brightness and background opacity, bringing the element "closer" to the user.

## Shapes

The shape language is consistently **Rounded**, using a 0.5rem (8px) base radius. This softens the high-tech aesthetic, making the sophisticated tools feel more accessible and modern. 

- **Cards & Modals:** Use `rounded-lg` (1rem) to define clear boundaries for major content sections.
- **Buttons & Inputs:** Use the base 0.5rem radius to maintain a compact, professional look.
- **Data Points:** In charts and graphs, nodes should be perfectly circular to contrast against the structured grid.

## Components

### Buttons
- **Primary:** Solid Electric Cyan with Deep Tech Blue text. No shadow, but a subtle "outer glow" on hover.
- **AI-Action:** Solid Dynamic Purple with white text. Features a persistent soft purple glow.
- **Ghost:** Transparent background with a 1px Slate border.

### Sleek Cards
Cards are the primary container for data. They feature a `0.7` opacity background-color of Deep Tech Blue, a 12px backdrop-blur, and a subtle top-down gradient border to simulate light hitting the edge of a glass pane.

### Data Tables
Tables are borderless between rows, using alternating subtle row tints for readability. The header row uses the `label-sm` typography in Sophisticated Slate to keep the focus on the data cells.

### Interactive Charts
Charts should use the primary and secondary color palette for standard data. Use the Dynamic Purple only for "Predicted" or "AI-Suggested" trend lines. All tooltips should follow the glassmorphic card style.

### Input Fields
Fields are dark-filled with a subtle 1px border. On focus, the border transitions to Electric Cyan with a small "glow" at the base of the input to indicate activity.