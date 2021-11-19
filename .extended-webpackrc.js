module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
          {
            loader: 'url-loader',
            options: {limit: 25000},
          },
        ]
      }
    ]
  }
};