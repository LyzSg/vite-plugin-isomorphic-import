# vite-plugin-isomorphic-import

A vite plugin that allows you to configure whether to import modules on the server-side or client-side.

## Install

```bash
npm i -D vite-plugin-isomorphic-import
```
or
```bash
yarn add -D vite-plugin-isomorphic-import
```

## Usage
```javascript
// vite.config.js
import { isomorphicImport } from 'vite-plugin-isomorphic-import';

export default {
  plugins: [
    isomorphicImport({
      // modules that you want to be imported only on client-side
      client: ['some-client-side-module'],
      // modules that you want to be imported only on server-side
      server: [],
    })
  ]
}
```
This will be very useful for handling browser-only modules that do not support for node.


## Effect
```javascript
// ... other imports
import someModule from 'some-client-side-module';
// ... other imports
```
This statement will be removed when on server-side:
```javascript
// ... other imports
```
Therefore, it should be noted that if you use the variable `someModule` on the server-side, an error(undefined) will be occured. 
