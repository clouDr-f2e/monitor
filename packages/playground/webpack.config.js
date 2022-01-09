const fs = require('fs')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const entries = fs.readdirSync('src').reduce((r, o) => {
  return {
    ...r,
    [o]: `./src/${o}/index.ts`
  }
}, {})

const htmlWebpackPlugin = fs.readdirSync('src').reduce((plugins, dir) => {
  return [
    ...plugins,
    new HtmlWebpackPlugin({
      title: '智云健康',
      filename: `${dir}.html`,
      template: path.join(__dirname, `./src/${dir}/index.html`),
      chunks: [dir]
    })
  ]
}, [])

module.exports = {
  mode: 'development',
  entry: entries,
  devtool: 'cheap-module-source-map',
  stats: 'errors-only',
  output: {
    path: undefined,
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  resolve: {
    alias: {
      '@zyf2e/monitor-web-performance': path.join(__dirname, '../web-performance/src/index.ts'),
      '@zyf2e/monitor-browser': path.join(__dirname, '../browser/src/index.ts'),
      '@zyf2e/monitor-web-exception': path.join(__dirname, '../web-exception/src/index.ts')
    },
    extensions: ['.js', '.json', '.ts', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader')
      },
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: path.join(__dirname, '../'),
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  {
                    runtime: 'automatic'
                  }
                ]
              ]
            }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: require.resolve('style-loader')
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [require('tailwindcss'), require('autoprefixer')]
                  }
                }
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), ...htmlWebpackPlugin],
  devServer: {
    port: 8087,
    hot: 'only',
    compress: true,
    client: {
      logging: 'info',
      progress: true
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/browser.html' },
        { from: /^\/react$/, to: '/react.html' },
        { from: /^\/vue$/, to: '/vue.html' }
      ]
    },
    onListening(devServer) {
      console.log('####test sdk browser#### visit path  "/"')
      console.log('####test sdk react#### visit path  "/react"')
      console.log('####test sdk vue#### visit path  "/vue"')
    }
  }
}
