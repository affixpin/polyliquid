/**
 * Polyliquid Theme Config
 *
 * Swap palettes by changing `activeTheme` below.
 * Each theme defines semantic color roles — components never reference raw hex.
 *
 * To add a new theme: copy an existing one, change the values, add to `themes`.
 */

export const themes = {
  forge: {
    name: "Forge",
    description: "Warm black + gold — premium financial feel",

    // Backgrounds
    background: "#0c0a08",
    backgroundAlt: "#121010",
    surface: "#1a1715",
    surfaceHover: "#242120",

    // Borders
    border: "#2c2926",
    borderBright: "#3c3936",

    // Brand / primary
    primary: "#e5a823",
    primaryBright: "#f0c050",
    primaryForeground: "#0c0a08",

    // Semantic accents
    success: "#2dd4a8",
    danger: "#f06070",
    amber: "#f0c050",

    // Text scale (low → high contrast)
    textDim: "#6e6b66",
    text3: "#8e8b86",
    text2: "#b0ada8",
    text1: "#e8e6e2",
    white: "#f8f7f4",

    // Charts
    chart1: "#e5a823",
    chart2: "#2dd4a8",
    chart3: "#f0c050",
    chart4: "#f06070",
    chart5: "#8b5cf6",

    // Tier colors (for voter tiers)
    tierElite: "#e5a823",
    tierTop: "#2dd4a8",
    tierMedium: "#e0a040",
    tierNew: "#6e6b66",

    // Gradient endpoints (for hero text, multiplier, etc.)
    gradFrom: "#e5a823",
    gradTo: "#2dd4a8",

    // Glow color for animations (rgb values for opacity variants)
    glowRgb: "229, 168, 35",
  },

  arctic: {
    name: "Arctic",
    description: "True black + electric cyan — sharp, technical",

    background: "#09090b",
    backgroundAlt: "#0f0f12",
    surface: "#161619",
    surfaceHover: "#1e1e23",

    border: "#262630",
    borderBright: "#363640",

    primary: "#00e0ff",
    primaryBright: "#40eeff",
    primaryForeground: "#09090b",

    success: "#22c55e",
    danger: "#ff5555",
    amber: "#ff9f43",

    textDim: "#606068",
    text3: "#8a8a95",
    text2: "#b0b0b8",
    text1: "#eeeef0",
    white: "#ffffff",

    chart1: "#00e0ff",
    chart2: "#22c55e",
    chart3: "#ff9f43",
    chart4: "#ff5555",
    chart5: "#a78bfa",

    tierElite: "#00e0ff",
    tierTop: "#22c55e",
    tierMedium: "#ff9f43",
    tierNew: "#606068",

    gradFrom: "#00e0ff",
    gradTo: "#22c55e",

    glowRgb: "0, 224, 255",
  },

  meridian: {
    name: "Meridian",
    description: "Deep slate + indigo/violet — modern, distinctive",

    background: "#0c0c14",
    backgroundAlt: "#111120",
    surface: "#1a1a2e",
    surfaceHover: "#222240",

    border: "#2a2a45",
    borderBright: "#3a3a58",

    primary: "#8b5cf6",
    primaryBright: "#a78bfa",
    primaryForeground: "#ffffff",

    success: "#22c55e",
    danger: "#f43f5e",
    amber: "#f59e0b",

    textDim: "#686880",
    text3: "#9898b0",
    text2: "#b8b8d0",
    text1: "#e4e4f0",
    white: "#f4f4ff",

    chart1: "#8b5cf6",
    chart2: "#22c55e",
    chart3: "#f59e0b",
    chart4: "#f43f5e",
    chart5: "#06b6d4",

    tierElite: "#a78bfa",
    tierTop: "#22c55e",
    tierMedium: "#f59e0b",
    tierNew: "#686880",

    gradFrom: "#8b5cf6",
    gradTo: "#06b6d4",

    glowRgb: "139, 92, 246",
  },
} as const;

// ← Change this to switch themes
export const activeTheme = "forge";

export type ThemeKey = keyof typeof themes;
export type Theme = (typeof themes)[ThemeKey];
