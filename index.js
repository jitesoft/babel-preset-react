const helperUtils = require('@babel/helper-plugin-utils');
const declare = helperUtils.declare;

module.exports = declare((api, options) => {
  api.assertVersion(7);

  // region Helpers.
  const isNotExcluded = (str, then) => ((options.exclude || []).indexOf(str) === -1) ? then() : null;
  const isIncluded = (str, and) => ((options.include || []).some(s => s.indexOf(str) === -1)) ? and() : null;
  // endregion

  options.targets = options.targets || {
    esmodules: true
  };

  options.react = {
    runtime: 'classic',
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment',
    importSource: 'react',
    throwIfNamespace: true,
    useSpread: false,
    ...(options.react || {}),
  };

  return {
    presets: [
      [
        require('@jitesoft/babel-preset-main'),
        options
      ]
    ].filter(p => p !== null),
    plugins: [
      isNotExcluded('react-jsx', () => [
        require('@babel/plugin-transform-react-jsx'),
        {
          runtime: options.runtime || 'classic',
          useBuiltIns: options.useBuiltIns || false,
          pragma: options.react.pragma || 'React.createElement',
          pragmaFrag: options.react.pragmaFrag || 'React.Fragment',
          useSpread: options.react.useSpread || false,
          throwIfNamespace: options.react.throwIfNamespace || true
        }
      ]),
      isIncluded('react-constant-elements', () => require('@babel/plugin-transform-react-constant-elements')),
      isIncluded('react-jsx-compat', () => require('@babel/plugin-transform-react-jsx-compat')),
      isIncluded('react-inline-elements', () => require('@babel/plugin-transform-react-inline-elements')),
      isNotExcluded('react-display-name', () => require('@babel/plugin-transform-react-display-name')),
      isNotExcluded('syntax-jsx', () => require('@babel/plugin-syntax-jsx')),
      isNotExcluded('react-jsx-source', () => process.env.BABEL_ENV === 'development' ? require('@babel/plugin-transform-react-jsx-source') : null),
      isNotExcluded('react-jsx-self', () => process.env.BABEL_ENV === 'development' ? require('@babel/plugin-transform-react-jsx-self') : null)
    ].filter(p => p !== null)
  };
});
