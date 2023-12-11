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
    <div id="root">
      <h1 class="title">Html JS CSS Template</h1>
    </div>
  </body>
  <script type="module">
    import './index.js';
  </script>
</html>
`.trim()

const indexJs = `
import './index.css'

console.log('hello world')
`.trim()
const indexCss = `
#root {
}
`.trim()

const importMap = `
{
  "imports": {
  }
}
`.trim()

export const HtmlTemplate = {
  'index.html': indexHtml,
  'index.js': indexJs,
  'index.css': indexCss,
  'import-map.json': importMap,
}
