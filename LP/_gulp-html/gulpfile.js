const gulp = require('gulp');
const bourbon = require('node-bourbon');
const sass = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify");
const rename = require('gulp-rename');
const browser = require("browser-sync");
const plumber = require("gulp-plumber");
const notify = require('gulp-notify');
const csscomb = require('gulp-csscomb');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const svgmin = require('gulp-svgmin');
const pleeease = require('gulp-pleeease');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

//ファイルパス関係
const f_root = "../";
const f_html = "../";
const f_css = "../assets/css/";
const f_js = "../assets/js/";
const f_image = "assets/images/";
const f_image_min = "../" + f_image;
const f_sass = "sass/";
const f_es6 = "es6/";
const f_es5 = "es5/";
const other = "other/";
const f_code = "html/";
const f_image_gulp = "img/";
const root_font_px = 16;
// const proxy = 'http://localhost/';
const baseDir = '../';
const browsers = [
    "last 4 versions",
    "> 1%",
    "Android 4.4",
  ];

  gulp.task('browser-sync', (done) => {
      browser.init({
          server: {
              baseDir: baseDir,
              index: "index.html"
          }
      });
      done();
  });

  bourbon.with(f_sass + '/style.scss');

  //sass
  gulp.task('sass', (done) => {
      return gulp.src(f_sass + '**/*.scss')
          // watch中にエラーが発生してもwatchが止まらないようにする
          .pipe(plumber({
              errorHandler: notify.onError('<%= error.message %>')
          }))
          .pipe(sass({ //sassのコンパイル
              includePaths: bourbon.includePaths
          }))
          .pipe(pleeease({
              rem: false,
              browsers: browsers,
              minifier: true, //圧縮
              mqpacker: true, //メディアクエリをまとめる
              autoprefixer: false, //ベンダープレフィックスを付与 true | false
              minifyOptions: {
                  // 圧縮率を高める
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  minifySelectors: true,
                  minifyUrls: true,
              }
          }))
          // .pipe(csscomb()) //css整形する場合（上で圧縮しているので使用する場合注意）
          .pipe(gulp.dest(f_css))
          //ブラウザリロード
          .pipe(browser.reload({
              stream: true,
          }));
          done();
      });

  //画像圧縮
  gulp.task("imagemin", function () {
      return gulp
      .src([f_image_gulp + '**/*.{png,jpg,gif,svg}'])
      .pipe(changed(f_image_min)) // gulp-changed必要
      .pipe(
          imagemin([
              pngquant({
              quality: [.70, .85], // 画質
              speed: 1 // スピード
              }),
              mozjpeg({ quality: 85 }), // 画質
              imagemin.svgo(),
              imagemin.optipng(),
              imagemin.gifsicle({ optimizationLevel: 3 }) // 圧縮率
          ])
      )
      .pipe(gulp.dest(f_image_min));
  });

  gulp.task('browserify', (done) => {
      browserify(f_es6 + 'browserify/main.js', {
          debug: false //ソースマップの調整
      })
          .transform(babelify, {
              presets: ['es2015']
          })
          .bundle()
          .on("error", function (err) {
              console.log("Error : " + err.message);
          })
          .pipe(source('main.js'))
          .pipe(gulp.dest(f_js));
        done();
  });

  gulp.task('babel', (done) => {
      gulp.src([f_es6 + '**/*.js', "!" + f_es6 + 'browserify/*'])
          .pipe(plumber({
          errorHandler: notify.onError('<%= error.message %>')
          }))
          .pipe(babel({
          presets: ['es2015']
          }))
          .pipe(gulp.dest(f_js)),

      //jsファイルの圧縮
      gulp.src(f_es5 + '**/*.js')
          .pipe(plumber({
              errorHandler: notify.onError('<%= error.message %>')
              }))
              .pipe(uglify()) //minify
              .pipe(
                  rename({
                      suffix: '.min',
                  })
              )
              .pipe(gulp.dest(f_js));
          done();
  });

  //otherフォルダ内のファイルを書き出し
  gulp.task('move', (done) => {
      gulp.src(other + '**/*')
          .pipe(gulp.dest(f_html));
          done();
  });

  gulp.task('code', (done) => {
      gulp.src([f_code + "**/*.php"])
          .pipe(browser.reload({
              stream: true
          }))
          .pipe(gulp.dest(f_html));
          done();
  });

  gulp.task('default', gulp.series(['sass', 'babel', 'browserify', 'imagemin', 'move', 'code', 'browser-sync'], (done) => {
      gulp.watch(f_sass + '**/*.scss', gulp.series('sass'));
      gulp.watch(f_es6 + 'browserify/**/*.js', gulp.series('browserify'));
      gulp.watch(f_es6 + '**/*.js', gulp.series('babel'));
      gulp.watch(f_es5 + '**/*.js', gulp.series('babel'));
      gulp.watch(f_code + '**', gulp.series('code'));
      gulp.watch(f_image_gulp + '**', gulp.series('imagemin'));
      done();
  }));
