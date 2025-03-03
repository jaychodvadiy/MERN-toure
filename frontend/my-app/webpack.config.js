module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  };
  