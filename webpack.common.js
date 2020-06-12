const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const bundlePerView = {
  about: './src/about.js',
  gallery: [ './src/gallery.js', './styles/gallery.css' ]
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
    app: [ './src/app.js', './styles/styles.css' ],
    ...bundlePerView
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    ...entryHtmlPlugins,
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => `${name.replace('js/', '/css/')}.css`,
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: path.resolve('eleventySites/index.html'),
      filename: path.resolve('dist/index.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: path.resolve('eleventySites/error/index.html'),
      filename: path.resolve('dist/404.html')
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
          'css-loader'
        ]
      }
    ]
  }
}
