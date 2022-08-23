const path = require("path");

// 引入 html 套件
const HTMLWebpackPlugin = require("html-webpack-plugin");

// webpack 中所有設定訊息都寫在 module.exports 中
module.exports = {
  // 指定入口檔案
  entry: "./src/index.ts",
  // 指定部署檔案所在目錄
  output: {
    // 指定部署檔案的目錄
    path: path.resolve(__dirname, "dist"),
    // 部署後檔案的名字
    filename: "bundle.js",
    // clean:true,
  },
  mode: "development",

  // 指定 webpack 打包時要使用的模塊
  module: {
    // 指定要加載的規則
    rules: [
      {
        // test 指定的是規則生效的文檔案
        test: /\.ts$/,
        // 要使用的 loader
        use: [
          // 設定 babel
          {
            // 指定 loader
            loader: "babel-loader",
            // 設定 babel
            options: {
              // 設定預設的環境
              presets: [
                [
                  // 指定環境的套件
                  "@babel/preset-env",
                  // 設定內容
                  {
                    // 要兼容的目標瀏覽器
                    targets: {
                      chrome: "88",
                    },
                    // 指定 corejs 的版本
                    corejs: "3",
                    // 使用 corejs 的方法 "usage"，表示按需加載
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的檔案
        exclude: /node_modules/,
      },
      {
        // 設置 less 文件
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },

  // 設定 webpack 套件
  plugins: [
    new HTMLWebpackPlugin({
      //   title: "這是一個 title",
      template: "./src/style/index.html",
    }),
  ],

  // 設定引用模塊
  resolve: {
    extensions: [".ts", ".js"],
  },
};
