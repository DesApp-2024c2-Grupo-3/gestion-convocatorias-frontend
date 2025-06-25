import type { Preview } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/styles.scss';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
};

export default preview;