module.exports = ({config}) => {
  config.module.rules.push(
    ...[
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('babel-preset-react-app')],
            },
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              shouldExtractLiteralValuesFromEnum: true,
              propFilter: (prop) => {
                if (prop.parent) {
                  return !prop.parent.fileName.includes('node_modules')
                }
                return true
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ]
  )

  config.resolve.extensions.push('.ts', '.tsx')
  config.devtool = 'inline-source-map'
  return config
}
