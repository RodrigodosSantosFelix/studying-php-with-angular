/*
 * O Webpack 4.8 é usado para compilar e empacotar todos os arquivos do projeto
 * para que eles estejam prontos para serem carregados em um navegador. Isso é
 * feito com a ajuda de carregadores e plug-ins configurados no arquivo
 * webpack.config.js.
 *
 * Este é um webpack.config.js mínimo para empacotar um aplicativo Angular 6, ele
 * compila arquivos TypeScript usando ts-loader, carrega modelos angulares com
 * raw-loadere injeta os scripts empacotados no corpo da página index.html usando
 * o HtmlWebpackPlugin. Ele também define um objeto de configuração global com o
 * plugin webpack.DefinePlugin.
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [{
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      config: JSON.stringify({
        apiUrl: 'http://localhost:4000'
      })
    })
  ],
  optimization: {
    splitChunks: {
      chuncks: 'all',
    },
    runtimeChunk: true
  },
  devServer: {
    historyApiFallback: true
  }
};
