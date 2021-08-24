const gulp = require('gulp')
const gap = require('gulp-append-prepend')

gulp.task('licenses', async function () {
  gulp
    .src('build/static/js/*chunk.js', { base: './' })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Kayimit Exchange
=========================================================
* UI From Creative Tim Argon Dashboard:
* Coded by Wadson Vaval 
=========================================================

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }))

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src('build/index.html', { base: './' })
    .pipe(
      gap.prependText(`<!--
      Whatever
      -->`)
    )
    .pipe(gulp.dest('./', { overwrite: true }))

  gulp
    .src('build/static/css/*chunk.css', { base: './' })
    .pipe(
      gap.prependText(`/*!

Sheesh

*/`)
    )
    .pipe(gulp.dest('./', { overwrite: true }))
  return
})
