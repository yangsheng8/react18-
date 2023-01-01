const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ],
  webpack: {
    alias: {
      '@': resolve('src')
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules[1].oneOf = [
        ...[
          {
            test: /\.svg$/,
            include: [path.join(__dirname, 'src/assets/icons')],
            use: [
              { loader: 'svg-sprite-loader', options: {} },
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [
                    // 插件名字必须加
                    {
                      name: 'removeAttrs',
                      params: {
                        attrs: '(fill|stroke)'
                      }
                    }
                  ]
                }
              }
            ]
          }
        ],
        ...webpackConfig.module.rules[1].oneOf
      ]
      return webpackConfig
    }
  }
}
