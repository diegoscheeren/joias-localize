module.exports = {
    'transpileDependencies': [
        'vuetify',
    ],
    pwa: {
        name: 'Veiculos',
        msTileColor: '#6565bf',
        themeColor: '#f6f6f6',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'dev/sw.js',
        },
        manifestOptions: {
            background_color: '#f6f6f6',
        },
    },
  };

