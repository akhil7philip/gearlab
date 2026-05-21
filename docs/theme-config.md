# Gear Lab Theme Configuration
# Niche: Portable Power Stations
# Vibe: Technical, precision-engineered, high-energy

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--gl-bg-primary` | `#0a0a0a` | Page background |
| `--gl-bg-secondary` | `#141414` | Cards, sections |
| `--gl-bg-elevated` | `#1c1c1c` | Hover states, modals |
| `--gl-accent` | `#ff6b35` | CTAs, links, highlights |
| `--gl-accent-hover` | `#ff8555` | Button hover |
| `--gl-accent-muted` | `#ff6b3540` | Subtle accent backgrounds |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--gl-text-primary` | `#f5f5f5` | Headings, body |
| `--gl-text-secondary` | `#a3a3a3` | Meta, captions |
| `--gl-text-muted` | `#737373` | Dates, tags |

### Functional Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--gl-success` | `#22c55e` | In-stock, positive |
| `--gl-warning` | `#f59e0b` | Price drops, alerts |
| `--gl-danger` | `#ef4444` | Out of stock, warnings |
| `--gl-info` | `#3b82f6` | Tips, info boxes |

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Inter / system-ui | 800 | 2.5rem |
| H2 | Inter / system-ui | 700 | 1.875rem |
| H3 | Inter / system-ui | 600 | 1.5rem |
| Body | Inter / system-ui | 400 | 1.125rem |
| Caption | Inter / system-ui | 400 | 0.875rem |
| Mono | JetBrains Mono | 400 | 0.875rem | Code, specs |

## Visual Style

- **Border radius:** 12px (cards), 8px (buttons), 4px (inputs)
- **Shadows:** Subtle, colored (`0 4px 24px rgba(255,107,53,0.1)`)
- **Transitions:** 200ms ease
- **Grid:** 12-column, max-width 1280px
- **Spacing scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96)

## Components

### Primary Button
- Background: `--gl-accent`
- Text: `#0a0a0a` (dark on orange)
- Padding: 12px 24px
- Border-radius: 8px
- Hover: `--gl-accent-hover`, scale(1.02)

### Secondary Button
- Background: transparent
- Border: 1px solid `--gl-accent`
- Text: `--gl-accent`
- Hover: `--gl-accent-muted`

### Cards
- Background: `--gl-bg-secondary`
- Border: 1px solid `#262626`
- Border-radius: 12px
- Hover: border color shifts to `--gl-accent` at 30% opacity

### Comparison Table
- Header row: `--gl-bg-elevated` background
- Alternating rows: `--gl-bg-primary` / `--gl-bg-secondary`
- Best pick row: `--gl-accent-muted` background
- Cell padding: 16px
- Border: 1px solid `#262626`

## Favicon
- Text-based: "GL" in `--gl-accent` on `--gl-bg-primary` background
- Format: SVG (scalable) + PNG fallback
- Sizes: 16x16, 32x32, 180x180 (apple-touch)

## Mood
> "A precision-engineered testing lab that happens to review camping gear."
> 
> Think: Dark mode by default. Clean lines. Specs tables that look like they belong in a technical manual. Orange accents that feel like warning labels — in a good way. Trust through transparency, not warmth.