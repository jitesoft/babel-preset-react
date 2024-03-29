# @jitesoft/babel-preset-react

[![npm (scoped)](https://img.shields.io/npm/v/@jitesoft/babel-preset-react)](https://www.npmjs.com/package/@jitesoft/babel-preset-react)
[![Known Vulnerabilities](https://dev.snyk.io/test/npm/@jitesoft/babel-preset-react/badge.svg)](https://dev.snyk.io/test/npm/@jitesoft/babel-preset-react)
[![pipeline status](https://gitlab.com/jitesoft/open-source/javascript/babel-preset-react/badges/master/pipeline.svg)](https://gitlab.com/jitesoft/open-source/javascript/babel-preset-react/commits/master)
[![npm](https://img.shields.io/npm/dt/@jitesoft/babel-preset-react)](https://www.npmjs.com/package/@jitesoft/babel-preset-react)
[![Back project](https://img.shields.io/badge/Open%20Collective-Tip%20the%20devs!-blue.svg)](https://opencollective.com/jitesoft-open-source)

React preset for Jitesoft javascript projects which uses babel.

Includes the following presets and plugins:

```
@jitesoft/preset-main
@babel/plugin-transform-react-display-name
@babel/plugin-transform-react-jsx
@babel/plugin-syntax-jsx

@babel/plugin-transform-react-inline-elements *
@babel/plugin-transform-react-constant-elements *
@babel/plugin-transform-react-jsx-compat *
```

_* Packages will only be used if they are added to the `include` array of the options object._

If babel is in development mode, the following plugins will be enabled:

```
@babel/plugin-transform-react-jsx-source
@babel/plugin-transform-react-jsx-self
```

Requires `corejs (v 3+)` and `@babel/core`.

## Options

Other than the default presets in [`@jitesoft/babel-preset-main`](https://gitlab.com/jitesoft/open-source/javascript/babel-preset-main), the following options
are available:

* `useBuiltIns` (boolean) - Use built ins instead of polyfill. Uses same value as passed for the main preset (defaults to `false`).
* `include` (array) - Addition for the three plugins marked with `*` in the above list (defaults to empty array).

The following options are prefixed with 'react' and corresponds to the options of the `transform-react-jsx` plugin.  
(Prefixed with `react.` since v2.0.0).

* `react.useSpread` (boolean) - Uses js props spread instead of babel helper. Defaults to `false`.
* `react.throwIfNamespace` (boolean) - Makes babel throw an error if using xml namespaces. Defaults to `true`.
* `react.runtime` (string) - `classic` or `automatic`, defaults to `classic`.

if runtime is set to `classic` (default) the following options are available:

* `react.pragma` (string) - Defines which create element method to use. Defaults to `React.createElement`.
* `react.pragmaFrag` (string) - Defines which Fragment component to use. Defaults to `React.Fragment`.

if runtime is set to `automatic` the following options are available:

* `react.importSource` (string) - defaults to `react`.
