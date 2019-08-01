// shared by textColor, borderColor, and backgroundColor utilities
let colors = {
  black: "#000",
  white: "#fff",
  gray: {
    100: "#f7fafc",
    200: "#edf2f7",
    300: "#e2e8f0",
    400: "#cbd5e0",
    500: "#a0aec0"
  }
};

// shared by padding (p), margin (m), width (w), and height(h) utilities
let spacing = {
  0: "0rem",
  xxxs: "0.25rem",
  xxs: "0.5rem",
  xs: "0.75rem",
  s: "1rem",
  m: "1.25rem",
  l: "1.5rem",
  xl: "2rem",
  xxl: "2.5rem",
  xxxl: "3rem"
};

module.exports = {
  important: true,

  theme: {
    screens: {
      mobile: "640px",
      tablet: "768px",
      desktop: "1024px",
      ldesktop: "1280px"
    },
    fontFamily: {
      heading: ["WorkSans-Regular", "sans-serif"],
      body: ["WorkSans-Regular", "sans-serif"]
    },
    fontSize: {
      xs: ".75rem",
      s: ".8rem",
      m: "1rem",
      l: "1.2rem",
      xl: "1.4rem",
      xxl: "1.6rem",
      xxxl: "1.875rem"
    },
    colors: colors,
    spacing: spacing,
    textColor: colors,
    padding: spacing,
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2"
    }
  },
  variants: {}
};
