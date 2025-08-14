/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#2c2c2c',
        'gray-medium': '#515151',
        'gray-light': '#7e848c',
        'green-dark': '#454b3a',
        'green-light': '#a3b18a',
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Lato', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      spacing: {
        'xs': '5px',
        'sm': '10px',
        'md': '20px',
        'lg': '30px',
        'xl': '40px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  // Optimisations de production
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Garder uniquement les fonctionnalités utilisées
  corePlugins: {
    // Garder les fonctionnalités de base
    preflight: true,
    container: false,
    // Garder les fonctionnalités de typographie
    fontFamily: true,
    fontSize: true,
    fontSmoothing: true,
    fontStyle: true,
    fontWeight: true,
    letterSpacing: true,
    lineHeight: true,
    textAlign: true,
    textColor: true,
    textDecoration: true,
    textOpacity: true,
    textTransform: true,
    // Garder les fonctionnalités de mise en page
    margin: true,
    padding: true,
    width: true,
    height: true,
    maxWidth: true,
    minWidth: true,
    maxHeight: true,
    minHeight: true,
    // Garder les fonctionnalités de positionnement
    position: true,
    inset: true,
    zIndex: true,
    // Garder les fonctionnalités de flexbox
    flex: true,
    flexDirection: true,
    flexWrap: true,
    alignItems: true,
    alignContent: true,
    alignSelf: true,
    justifyContent: true,
    justifyItems: true,
    justifySelf: true,
    order: true,
    // Garder les fonctionnalités de grille
    gridTemplateColumns: true,
    gridColumn: true,
    gridTemplateRows: true,
    gridRow: true,
    gridAutoFlow: true,
    gridAutoColumns: true,
    gridAutoRows: true,
    gap: true,
    // Garder les fonctionnalités de visibilité
    visibility: true,
    opacity: true,
    // Garder les fonctionnalités de transition
    transitionProperty: true,
    transitionDuration: true,
    transitionTimingFunction: true,
    transitionDelay: true,
    // Garder les fonctionnalités de transformation
    transform: true,
    transformOrigin: true,
    translate: true,
    rotate: true,
    scale: true,
    skew: true,
    // Garder les fonctionnalités d'interactivité
    cursor: true,
    userSelect: true,
    // Garder les fonctionnalités de fond
    backgroundAttachment: true,
    backgroundClip: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    backgroundSize: true,
    // Garder les fonctionnalités de bordure
    borderWidth: true,
    borderColor: true,
    borderStyle: true,
    borderRadius: true,
    // Garder les fonctionnalités d'effet
    boxShadow: true,
    dropShadow: true,
  }
} 