module.exports = {
  HTML:function(title,  body, control, authStatusUI='<a href="/wjdtjddnjsdbwlgushafs/login">login</a>'){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${authStatusUI}
      <h1><a href="/">WEB</a></h1>
      ${control}
      ${body}
    </body>
    </html>
    `;
  }
}
