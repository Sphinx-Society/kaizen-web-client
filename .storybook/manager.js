import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { version } from '../package.json';

const theme = create({
  base: 'dark',
  brandTitle: `Kaizen web client ${version}`,
  brandUrl: 'https://github.com/Sphinx-Society/kaizen-web-client',
});

addons.setConfig({ theme });