module.exports = {
  plugins: [
    {
      postcssPlugin: true,
      Declaration: {
        // Set font-display: swap to fonts
        'font-display': (node) => {
          if (node.parent.name === 'font-face' && node.parent.type === 'atrule') node.value = 'swap'
        }
      }
    }
  ]
}
