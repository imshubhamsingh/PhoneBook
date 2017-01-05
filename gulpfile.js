
var gulp = require('gulp')
var connect = require('gulp-connect-php')
var browserSync = require('browser-sync')
var exit = require('gulp-exit')

gulp.task('connect-sync', function () {
  connect.server({}, function () {
    browserSync({
      proxy: '127.0.0.1:8000'
    })
  }).pipe(exit())

  gulp.watch('php/*.php').on('change', function () {
    browserSync.reload()
  })
})

