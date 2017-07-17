const path = require('path')
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
  entry: './app.js',
  /**
   * 輸出路徑與檔名
   */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  /**
   * loaders 對應使用規則
   *
   * Babel 從 6.13.0 之後提供額外的參數 loose 和 modules
   * loose: 提供 loose 編譯模式，該模式啟動下 Babel 會盡可能產生較精簡的 ES5 程式碼，預設 false 會盡可能產出接近 ES2015 規範的程式碼。
   * modules: 轉換 ES2015 module 的語法（import）為其它類型，預設為 true 轉換為 commonjs。
   */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            /* Loose mode and No native modules(Tree Shaking) */
            ['es2015', { modules: false, loose: false }]
          ]
        }
      }
    ]
  }
}

module.exports = config
