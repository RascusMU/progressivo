globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_CoN0qipK.mjs';
import './chunks/astro/server_BqfROL9Y.mjs';
import { s as sequence } from './chunks/index_CI39tNGS.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,


);

export { onRequest };
