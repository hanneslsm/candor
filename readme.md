# candor

# The perfect start for your new project.
### A simple CSS framework with gulp automation

candor is the simple and tidy css framework. Initially it was used to create wordpress themes, but now it's a perect fit for whatever you want to create.


***
# Getting Started
## Installation – First time setup for theme development
I'm glad you want to use candor. It's easy to get it running, just follow the steps:
1. Download & install a local server, for example https://www.mamp.info/de/downloads/,
2. Download & install Node.js https://nodejs.org/en/
3. If you're on a Apple machine download & install XCode https://developer.apple.com/xcode/
4. Download & install Gulp `npm install gulp -g`
5. Navigate in the terminal to your project folder
6. Download & install node modules with `npm install`
7. Configure the gulpfile.js:
  * `url` (line 14)



## gulp
  candor has a gulp automation that compiles your scss files,
  minifies them + javascript + images and zip the template to a release folder.
  Also, browserSync is supported.

  To run the gulp tasks, navigate in the terminal to your project folder and run the default gulp task with `gulp` while your server is up.
  You might configure the gulpfile for your environment.

  #### gulp Tasks
  * `gulp img-min` minifies images from `./assets/img_raw` to `./assets/img`
  * `gulp sass` compiles files from `./assets/scss/*.scss` to `style.css`
    * autoprefixer included
    * sourcemaps included
  * `gulp css-min` minifies `style.css` to `style.min.css`
  * `gulp js` concats all files from `./assets/js/src` to `./assets/js/script.js`
  * `gulp release` packages the theme to a zip file in the `_build` folder. Takes the version number from package.json

  * `gulp watch` has an eye on the scss and js files
  * `gulp min` same as default but additionally with `css-min` and `img-min` included
  *  **`gulp default` or simply `gulp` runs the `js`, `sass` the `watch` task**


## structure
```
Project Root
└── assets
    ├── css               // External styles from third parties
    ├── fonts             // Webfonts   
    ├── img               // A place for all the images that are required and were minified
      └── src             // candor has a build-in img minifier. Put your original images in this folder. See (### gulp tasks)
    ├── js                // All the javascript files that are needed  
      ├── src             // candor has a build-in js minifier. Put your original javascript files in this folder. See (### gulp tasks)  
      └── script.js       // the minfied and concated file of all javascript files in the src folder
    └── scss
        ├── 01_config     // scss files in the folder contain mostly variables
        ├── 02_helpers    // helpers are mixins or classes that can be used in many cases and support in the development
        ├── 03_elements   // All the css classes that are not specific to the theme layout  
        ├── 04_sections   // This folder is for all the classes that bring the your webpage to life
        └── style.scss    // Putting it all together
```

## Usage
🚧 WIP
***

# Config
## Fonts
`01_config/_variables.scss`  
* Four variables describe the different font types. `$sans`, `$mono`, `$icon` and `$serif`.  
* The websites line-height and font-size are defined with `$line-height` and `$font-size`.
* font-sizes should be defined in em. Use the pixel2em helper mixin if needed.
* Google fonts are used by default.
* *font-display* is set to *swap* by default via `03_elements/_body.scss`


## Colors
`01_config/_colors.scss`  
🚧 WIP
candor uses color tokes.

## Layout
`01_config/_variables.scss`  
🚧 WIP


***
# Helpers
## breakpoints
`02_helpers/_breakpoints.scss`  
candor uses the mobile first approach. Everything is optimized for the smartphone
by default, unless otherwise specified by breakpoints.

Three breakpoints can used via the `bp` mixin
1. default, for devices (e.g. smartphones) smaller than 768px. The breakpoint should only be used if the style should only been display on small devices but not the others: `@include bp(small) {YOUR CSS;}`
2. medium, for devices (e.g. tables) between 768px and 1024px `@include bp(medium) {YOUR CSS;}`
3. large, for devices (e.g. desktop PCs) larger than 1024px `@include bp(large) {YOUR CSS;}`



## pixel2em
`02_helpers/_px2em.scss`  
For some of us it's easier to think in pixel, other prefer em.  
For those who like pixels but also the advantages of ems the helper `pixel2em` in `02_helpers.scss` should be used.
```
/* Usage: */
margin: em(32);

/* Output: */
margin: 2em;
```
Read more: https://css-tricks.com/snippets/sass/px-to-em-functions/

## Helper classes
`02_helpers/_…`  
🚧 Helper classes are little utilities that can be used when needed.
#### center-block
#### flex
#### noscroll
#### word-break

## screen-reader
🚧 WIP Accessiblity


***
# Elements & Components
## Root, Globals, HTML, Body
`03_elements/_body.scss`  
Even though these are one of the most important elements, there is not much to say.
Use the variables to make global changes. Other than that, have fun!

## Grid
`03_elements/_grid.scss`  
candor has a built in 12 grid system, based on the css flex property.

To use the grid, make a container div with the `.row` class.
Use the `.column` div to make columns or specify their size with the numbers at the end, like `.column5`.
The sum of the column sizes must be 12.

Add `--large` to the `.column` class if you want the grid optimzed for large displays, like `.column5--large`
```
/* Column example */

<div class="row">
  <div class="column5">Column 5</div>
  <div class="column5">Column 5</div>
  <div class="column2">Column 2</div>
</div> <!-- row -->
```

## Headlines
`03_elements/_headlines.scss`  
The font sizes for headlines are defined in pixel but outputted in em, using the px2em helper.
h1,h2,h3 change their size in the medium breakpoint.
```
<h1>Headline 1</h1>
<h2>Headline 2</h2>
<h3>Headline 3</h3>
<h4>Headline 4</h4>
<h5>Headline 5</h5>
<h6>Headline 6</h6>
```

## Quotes
`03_elements/_quotes.scss`
1. `q` for inline quotation
2. `blockquote` for block quotations
3. `cite` styles the source

```
<p><q cite="The boy">I love you</q>, he said.</p>

<blockquote>
You've gotta dance like there's nobody watching,
Love like you'll never be hurt,
Sing like there's nobody listening,
And live like it's heaven on earth.
</blockquote>
<cite>William W. Purkey</cite>
```

## Tables
##






***
# Sections
## Header
## Drawer

***
# Acknowledgment
candor uses some 3rd party components. Thank you!   
A lot of code was only possible to write because of wonderful & helpful people in user forums or their blog articles. Whenever some helped me with their answers or articles, I added a link to the code.
- [normalize.css](https://necolas.github.io/normalize.css/) *MIT License*
- [animate.css](https://daneden.github.io/animate.css/) *MIT License*
- [Font Awesome](https://fontawesome.com/v4.7.0/) *SIL OFL & MIT License*
- [Undraw](https://undraw.co/) *custom license*
