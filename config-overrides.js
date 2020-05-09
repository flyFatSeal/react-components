const {
  override,
  addWebpackExternals,
  disableChunk,
  overrideDevServer,
  watchAll,
  addWebpackModuleRule
} = require("customize-cra");

//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
// 关闭soucemap
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

// 改变webpack中的output选项 将打包模式更改为库模式（即打包成一个挂载在全局的函数，符合目前海为前端的开发模式）--只在生产模式中使用
const changePackOutPut = () => config => {
  if (config.mode === 'production') {
    config.output.library = 'renderReactDom'
    config.output.libraryTarget = 'umd'
    config.output.libraryExport = 'default'
  }
  return config
}

module.exports = {
  webpack: override(
    // 生产环境下去除soucemap和console语句
    process.env.NODE_ENV === 'production' && dropConsole() && rewiredMap(),
    // 去除runtimechunk选项,目前的打包环境不需要执行这个选项增加复杂度
    disableChunk(),
    addWebpackModuleRule({test: /\.txt$/, use: 'raw-loader'}),
    addWebpackExternals({
      react: 'React',
      'react-dom': 'ReactDOM'
    }),
    changePackOutPut(),
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
}