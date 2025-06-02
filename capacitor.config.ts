import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sa.scraapy',
  appName: 'Scraapy',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
  },
  backgroundColor: '#ffffff',
  zoomEnabled: false,
};

export default config;
