const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');
const packageInfo = require('./package.json');
module.exports = env => {
  const isDevelopment = env.NODE_ENV !== 'production';
  const isBuildDemo = env.entry === 'demo';
  const entry = {
    index: isDevelopment || isBuildDemo ? './demo/index.tsx' : './src/index.tsx',
  }
  return {
    mode: env.NODE_ENV, // none production development
    devtool: isDevelopment ? 'inline-source-map' : false, // 'source-map'
    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        `...`,
        !isDevelopment && new CssMinimizerPlugin(),
      ].filter(Boolean),
      splitChunks: {
        chunks: 'all', // 提取公共模块 loadash
        name: false,
        // cacheGroups: {
        //   defaultVendors: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name: 'vendors',
        //     chunks: 'all',
        //   },
        // },
        // runtimeChunk: 'single' // 提取引导模板 将 runtime 代码拆分为一个单独的 chunk 容易引起react 报错
      },
    },
    devServer: isDevelopment
      ? {
        static: './static',
        //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses. Enable devServer.historyApiFallback by setting it to true:
        historyApiFallback: true,
        open: true,
        hot: true, // 模块热更新 loader会自动处理热更新，官网配置比较多，也说明了这一点
        host: 'localhost',
        proxy: {
          '/live': {
            target: 'https://testdevlive.xylink.com',
            changeOrigin: true,
          },
        },
      }
      : undefined,
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      filename: '[name].js', // content hash 内容变化才会变化
      chunkFilename: '[name].[contenthash].js',
      assetModuleFilename: 'images/[hash][ext][query]',
      // 暴露 library 这是库名称 import from 'webpackNumbers'
      library: {
        name: 'template-npm-library',
        type: 'umd',
      },
      // Prevents conflicts when multiple webpack runtimes (from different apps)
      // are used on the same page.
      // chunkLoadingGlobal: `webpackJsonp${packageInfo.name}`,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    plugins: [
      (isDevelopment || isBuildDemo) &&
      new HtmlWebpackPlugin({
        title: 'react组件库',
        template: './public/index.html',
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }),
      !isDevelopment &&
      new webpack.BannerPlugin(`package version: ${packageInfo.version}`),
      new webpack.DefinePlugin({
        'process.env.version': JSON.stringify(packageInfo.version),
        'process.env.PUBLIC_URL': JSON.stringify('.'),
      }),
      // 禁掉splitchuncks https://github.com/webpack/webpack/issues/11431
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/,
          sideEffects: true,
          use: [isDevelopment ? 'style-loader' : { loader: MiniCssExtractPlugin.loader }, 'css-loader'].filter(Boolean),
        },
        {
          test: /\.scss$/,
          sideEffects: true,
          use: [
            isDevelopment ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[name]__[local]',
                },
              },
            },
            'postcss-loader',
            'sass-loader',
          ].filter(Boolean),
        },
        // {
        //   test: /\.less$/,
        //   sideEffects: true,
        //   use: [
        //     isDevelopment ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
        //     {
        //       loader: 'css-loader',
        //       options: {
        //       },
        //     },
        //     'postcss-loader',
        //     {
        //       loader: 'less-loader',
        //       options: {
        //         lessOptions:{
        //           javascriptEnabled:true
        //         }
        //       },
        //     }
        //   ].filter(Boolean),
        // },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/inline',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: () => ({
                  before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
                }),
                transpileOnly: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      // 按顺序解析，碰到这些后缀名，可以不写
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    externals: isDevelopment || isBuildDemo
      ? {}
      : {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
      },
    // 持久缓存，存到了文件系统中，不容易失效，二次构建速度明显提升
    cache: {
      type: 'filesystem',
      // cacheDirectory 默认路径是 node_modules/.cache/webpack
      cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    },
  }
}
