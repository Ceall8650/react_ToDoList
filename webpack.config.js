const path = require('path')
const webpack = require('webpack')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'common.js'
})

const config = {
  /**
  * webpack 執行環境，即 webpack 載入檔案時相對路徑的根目錄環境
  * 預設（沒有設定時）為執行指令（webpack）所在的那個目錄
  *
  * 【其他】
  * 假設自己新增一個 build/build.js 檔案，使用載入 webpack 的作法
  *
  * 例如範例：https://github.com/andyyou/webpack-context-prove/blob/master/build/build.js#L14
  *
  * 在不同目錄執行：
  * > node build/build.js (in root/ folder)
  * > node build.js (in build/ folder)
  * 預設 context 會分別為 root/ 和 root/build/
  */

  context: path.join(__dirname, 'src'),
  /**
   * Entry point
   * 因為設定了 context 所以不需要加上 src/ 了
   */
  entry: {
    app: './app.js',
    admin: './admin.js'
  },
  /**
   * 輸出路徑與檔名
   */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].build.js'
  },
  /**
   * loaders 對應使用規則
   * loaders 的功用就是告訴 webpack 該如何處理匯入的檔案
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            /* Loose mode and No native modules(Tree Shaking)
             * Babel 從 6.13.0 之後提供額外的參數 loose 和 modules
             * loose: 提供 loose 編譯模式，該模式啟動下 Babel 會盡可能產生較精簡的 ES5 程式碼，預設 false 會盡可能產出接近 ES2015 規範的程式碼。
             * modules: 轉換 ES2015 module 的語法（import）為其它類型，預設為 true 轉換為 commonjs。
             */
              ['es2015', { modules: false, loose: false }]
          ]
        }
      },
      {
        test: /\.scss$/,
        /**
         * use 屬性是用來套用，串接多個 loaders。
         * v2 為了相容的因素保留 loaders 屬性，loaders 為 use 的別名，
         * 盡可能的使用 use 代替 loaders
         */
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            /* 小於 10kB 的圖片轉成 base64
             * 把比較小的圖片轉成 base64 字串存在 Javascript 中。這麼作瀏覽器可以預先載入，而且不會發出額外的 HTTP 請求
             */
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractCommons
  ]
}

module.exports = config
