const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const bundlePerView = {
  about: './src/about.js',
  gallery: [ './src/gallery.js', './styles/gallery.css' ],
  index:  [ './src/app.js', './styles/styles.css' ]
}

const entryHtmlPlugins = Object.keys(bundlePerView).map(entryName => {
  return new HtmlWebpackPlugin({
    chunks: [entryName],
    template: path.resolve(`eleventySites/${entryName}/index.html`),
    filename: path.resolve(`dist/${entryName}.html`)
  })
})

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    ...bundlePerView
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      minChunks: 2
    }
  },
  plugins: [
    ...entryHtmlPlugins,
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => `${name.replace('js/', '/css/')}.css`,
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('eleventySites/error/index.html'),
      filename: path.resolve('dist/error.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          }
        ]
      }
    ]
  }
}
