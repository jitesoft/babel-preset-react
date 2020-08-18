const helperUtils = require('@babel/helper-plugin-utils');
const declare = helperUtils.declare;

module.exports = declare((api, options) => {
  api.assertVersion(7);

  // region Helpers.
  const isExcluded = (str, or) => ((options.exclude || []).indexOf(str) === -1) ? or() : null;
  // endregion

  options.targets = options.targets || {
    esmodules: true
  };

  return {
    presets: [
      [
        require('@jitesoft/babel-preset-main'),
        options
      ]
    ].filter(p => p !== null),
    plugins: [
      isExcluded('react-jsx', () => [
        require('@babel/plugin-transform-react-jsx'),
        {
          pragma: options.pragma || 'React.createElement',
          pragmaFrag: options.pragmaFrag || 'React.Fragment',
          useBuiltIns: options.useBuiltIns || false,
          useSpread: options.useSpread || false,
          throwIfNamespace: options.throwIfNamespace || true
        }
      ]),
      isExcluded('react-display-name', () =>
        require('@babel/plugin-transform-react-display-name')),
      isExcluded('syntax-jsx', () =>
        require('@babel/plugin-syntax-jsx')),
      isExcluded('react-jsx-source', () => process.env.BABEL_ENV === 'development' ? require('@babel/plugin-transform-react-jsx-source') : null),
      isExcluded('react-jsx-self', () => process.env.BABEL_ENV === 'development' ? require('@babel/plugin-transform-react-jsx-self') : null)
    ].filter(p => p !== null)
  };
});
