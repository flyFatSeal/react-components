module.exports = {
  stories: ['../src/**/*.stories.{tsx,mdx}'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    {
      name: '@storybook/preset-create-react-app',
      options: {
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
  ],
  webpackFinal: async (config, {configType}) => {
    // remove svg from existing rule
    config.module.rules = config.module.rules.map((rule) => {
      if (
        String(rule.test) ===
        String(
          /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
        )
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        }
      }

      return rule
    })
    config.module.rules.push(
      ...[
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
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
    config.node = {
      fs: 'empty',
    }
    config.resolve.extensions.push('.ts', '.tsx')
    config.devtool = 'inline-source-map'
    return config
  },
}
