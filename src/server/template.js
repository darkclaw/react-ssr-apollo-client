const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default function template({ content, styleSheet, initialState }) {
  return `<!doctype html>
  <html lang="es">
  <head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Welcome to Razzle</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''
    }
  <!-- Render the style tags gathered from the components into the DOM -->
  ${styleSheet}
  </head>
  <body>
      <div id="root">${content}</div>
      ${process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
      <script type="text/javascript">
        window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};
      </script>  
  </body>
</html>
`;
}