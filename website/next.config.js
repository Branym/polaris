const withPlugins = require("next-compose-plugins")
const reactSvg = require("next-react-svg")
const path = require("path")

// next.js configuration
const nextConfig = {
  images: {
    // loader: "imgix", // Uncomment this line for STATIC EXPORT
    // path: "", // Uncomment this line for STATIC EXPORT
  },
  env: {
    production_type: "server", // Change variable to "static" for STATIC EXPORT
  },
  // trailingSlash: true // Uncomment this line for STATIC EXPORT
}

module.exports = withPlugins(
  [
    [
      reactSvg,
      {
        include: path.resolve(__dirname, "src/assets/svg"),
      },
    ],
  ],
  nextConfig
)
