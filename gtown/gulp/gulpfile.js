var gulp = require('gulp'),
    js_uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin');


/*商城*/
//fictitious
gulp.task('fictitious', function() { return gulp.src('./homepage/js/fictitious/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/fictitious'))});
//home
gulp.task('home', function() {return gulp.src('./homepage/js/home/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/home'))});
//login
gulp.task('login', function() {return gulp.src('./js/homepage//login/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/login'))});
//map
gulp.task('map', function() {return gulp.src('./homepage/js/map/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/map'))});
//member
gulp.task('member', function() {return gulp.src('./homepage/js/member/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/member'))});
//order
gulp.task('order', function() {return gulp.src('./homepage/js/order/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/order'))});
//product
gulp.task('product', function() {return gulp.src('./homepage/js/product/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/product'))});
//shop
gulp.task('shop', function() {return gulp.src('./homepage/js/shop/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/js/shop'))});

var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
};

//html
//fictitious
gulp.task('hfictitious', function() { return gulp.src('./homepage/page/fictitious/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/fictitious'))});
//home
gulp.task('hhome', function() {return gulp.src('./homepage/page/home/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/home'))});
//login
gulp.task('hlogin', function() {return gulp.src('./homepage/page/login/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/login'))});
//map
gulp.task('hmap', function() {return gulp.src('./homepage/page/map/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/map'))});
//member
gulp.task('hmember', function() {return gulp.src('./homepage/page/member/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/member'))});
//order
gulp.task('horder', function() {return gulp.src('./homepage/page/order/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/order'))});
//product
gulp.task('hproduct', function() {return gulp.src('./homepage/page/product/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/product'))});
//shop
gulp.task('hshop', function() {return gulp.src('./homepage/page/shop/*.html').pipe(htmlmin(options)).pipe(gulp.dest('./dist/homepage/page/shop'))});

gulp.task('default',['fictitious','home','login','map','member','order','product','shop','hfictitious','hhome','hlogin','hmap','hmember','horder','hproduct','hshop']);


//comment
//css
gulp.task('commentcss', function() { return gulp.src('./homepage/comment/css/*.css').pipe(cleanCSS()).pipe(gulp.dest('./dist/comment/css'))});
//js
gulp.task('commentjs', function() { return gulp.src('./homepage/comment/js/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/homepage/comment/js'))});



//lib
//css
gulp.task('libcss', function() { return gulp.src('./lib/css/*.css').pipe(cleanCSS()).pipe(gulp.dest('./dist/lib/css'))});
//js
gulp.task('libjs', function() { return gulp.src('./lib/js/*.js').pipe(js_uglify({mangle: true,compress: true,})).pipe(gulp.dest('./dist/lib/js'))});



//css
gulp.task('css', function() { return gulp.src('./css/*.css').pipe(cleanCSS()).pipe(gulp.dest('./dist/css'))});


//images
gulp.task('images', function() { return gulp.src('./images/*.png').pipe(imagemin()).pipe(gulp.dest('./dist/images'))});















