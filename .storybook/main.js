const { resolve } = require('path')

module.exports = {
  stories: [
    '../src/client/stories/gettingStarted.stories.mdx',
    '../src/client/stories/codeOfConduct.stories.mdx',
    '../src/client/stories/contributing.stories.mdx',
    '../src/client/components/**/**/*.stories.([tj]s[x]|mdx)',
    '../src/client/schemas/**/stories/*.stories.mdx',
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
    '@storybook/addon-links'
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
