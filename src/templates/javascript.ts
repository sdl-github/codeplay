const indexHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodePlayer</title>
  </head>
  <body>
    <div id="root">hello world</div>
  </body>
  <script type="module">
    import './index.js';
  </script>
</html>
`.trim()

const indexJs = `
`.trim()

const importMap = `
{
  "imports": {
  }
}
`.trim()

export const JsTemplate = {
  'index.html': indexHtml,
  'index.js': indexJs,
  'import-map.json': importMap,
}