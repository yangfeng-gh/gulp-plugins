# gulp-changed

> Only pass through changed files

No more wasting precious time on processing unchanged files.

By default it's only able to detect whether files in the stream changed. If you require something more advanced like knowing if imports/dependencies changed, create a custom comparator, or use [another plugin](https://github.com/gulpjs/gulp#incremental-builds).

## Install

```
$ npm install --save-dev gulp-changed
```

*Support this module by buying this excellent Node.js course.*

## Usage

```
const gulp = require('gulp');
const changed = require('gulp-changed');
const ngAnnotate = require('gulp-ng-annotate'); // Just as an example

const SRC = 'src/*.js';
const DEST = 'dist';

gulp.task('default', () =>
	gulp.src(SRC)
		.pipe(changed(DEST))
		// `ngAnnotate` will only get the files that
		// changed since the last time it was run
		.pipe(ngAnnotate())
		.pipe(gulp.dest(DEST))
);
```

## API

### changed(destination, [options])

#### destination

Type: `string` `Function`

Destination directory. Same as you put into `gulp.dest()`.

This is needed to be able to compare the current files with the destination files.

Can also be a function returning a destination directory path.

#### options

Type: `Object`

##### cwd

Type: `string`
Default: `process.cwd()`

Working directory the folder is relative to.

##### extension

Type: `string`

Extension of the destination files.

Useful if it differs from the original, like in the example below:

```
gulp.task('jade', () =>
	gulp.src('src/**/*.jade')
		.pipe(changed('app', {extension: '.html'}))
		.pipe(jade())
		.pipe(gulp.dest('app'))
);
```

##### hasChanged

Type: `Function`
Default: `changed.compareLastModifiedTime`

Function that determines whether the source file is different from the destination file.

###### Built-in comparators

- `changed.compareLastModifiedTime`
- `changed.compareContents`
- `changed.compareSha1Digest` (Deprecated)

###### Example

```
gulp.task('jade', () =>
	gulp.src('src/**/*.jade')
		.pipe(changed('app', {hasChanged: changed.compareContents}))
		.pipe(jade())
		.pipe(gulp.dest('app'))
);
```

You can also supply a custom comparator function which will receive the following arguments and should return `Promise`.

- `stream` *(transform object stream)* - Should be used to queue `sourceFile` if it passes some comparison
- `sourceFile` *(Vinyl file object)*
- `destPath` *(string)* - Destination for `sourceFile` as an absolute path

##### transformPath

Type: `Function`

Function to transform the path to the destination file. Should return the absolute path to the (renamed) destination file.

Useful if you rename your file later on, like in the below example:

```
gulp.task('marked', () =>
	gulp.src('src/content/about.md')
		.pipe(changed('dist', {transformPath: newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html')}))
		.pipe(marked())
		.pipe(rename(newPath => path.join(path.dirname(newPath), path.basename(newPath, '.md'), 'index.html'))))
		.pipe(gulp.dest('dist'))
);
```

## In-place change monitoring

If you're looking to process source files in-place without any build output (formatting, linting, etc), have a look at [gulp-changed-in-place](https://github.com/alexgorbatchev/gulp-changed-in-place).

## License

MIT © [Sindre Sorhus](https://sindresorhus.com/)