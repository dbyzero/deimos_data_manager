module.exports = config:
  files:
    javascripts: joinTo:
      'libraries.js': /^bower_components/
      'app.js': /^app/
    stylesheets: joinTo:
      'libraries.css': /^bower_components/
      'app.css': /^app/
  watcher:
    usePolling: true
