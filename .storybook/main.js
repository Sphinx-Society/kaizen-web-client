const { resolve } = require('path');

module.exports = {
	stories: ['../src/client/components/**/**/stories/*.stories.([tj]s[x]|mdx)'],
	addons: ['@storybook/addon-docs'],
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
		});
		return config;
	},
};