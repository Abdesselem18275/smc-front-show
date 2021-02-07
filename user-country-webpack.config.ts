import { Configuration } from 'webpack';

export default {
  devServer: {
    headers: {
      'view-country': 'TN',
    },
  },
} as Configuration;
