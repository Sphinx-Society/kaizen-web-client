const { resolve } = require('path')

module.exports = {
  stories: [
    '../src/client/stories/gettingStarted.stories.mdx',
    '../src/client/components/**/**/*.stories.([tj]s[x]|mdx)',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(s*)css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            prependData: `
				@import "${resolve(__dirname, '../src/client/styles/index.scss')}";
			`,
          },
        },
        'postcss-loader',
      ],
    })
    return config
  },
}
