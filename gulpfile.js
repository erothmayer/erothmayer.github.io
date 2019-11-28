// see: https://nvbn.github.io/2015/06/19/jekyll-browsersync/ (but note that it's in gulp 3 format)

var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// Task for building blog when something changed:
const build = shell.task(['jekyll serve']);
exports.build = build;

// Task for serving blog with Browsersync
function serve() {
  browserSync.init({server: {baseDir: '_site/'}});
  // Reloads page when some of the already built files changed:
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
}
exports.serve = serve;

// note: MUST be parallel as both tasks are persistent
const defaultTask = gulp.parallel(build, serve);
exports.default = defaultTask;
