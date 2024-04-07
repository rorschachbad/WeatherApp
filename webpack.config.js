const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './src/index.js', // Точка входа для сборки проекта

  output: {
    filename: 'bundle.js', // Имя выходного файла сборки
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // Регулярное выражение для обработки файлов с расширением .css
        use: ['style-loader', 'css-loader', 'sass-loader',], // Загрузчики, используемые для обработки CSS-файлов
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource',
      }
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },

  plugins: [new HtmlWebpackPlugin(
    { 
      template: './src/index.html', 
    }
  ), new CopyPlugin({
    patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to:   path.resolve(__dirname, 'dist/img')
        }
      ]
    })],


  mode: 'development', // Режим сборки
};