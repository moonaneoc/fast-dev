fast start a webpack-dev-server and build

## Installation

```
$ npm install fast-dev -g
```
## Usage

Enter the working directory and start a webpack-dev-server

```
$ dev
```
Specify the port number, default 8080
```
$ PORT=8081 dev
```

build a library

```
$ build
```
build a vue project

```
$ build vue
```

## more configuration
Create a new file in your working directory named '.fastdev.js' if you need more configuration.

```js
// .fastdev.js

module.exports = {
    /**
     * Type: String || Object
     * Default: the 'main' field of package.json or 'index.js'
     *
     * The path is relative to your working directory.
     * Refer to the entry of webpack.
     */
    entry: {
        app: "index.js" // example
    },

    /**
     * Type: Object
     * 
     * The path is relative to your working directory.
     */
    output: {
        path: "dist", // default: "dist"
        filename: "[name].min.js", // Effective only when building a library. Default: "[name].min.js"
        libraryTarget: "commonjs2" // Effective only when building a library. Default: "commonjs2"
    },

    /**
     * Type: String || Object
     * 
     * Pass a string path if you need to use your HTML template.
     * The path is relative to your working directory.
     */
    template: {
        title: "fast-dev", // Html title. Default: 'fast-dev'
        platform: "pc", // Set it to 'mobile' to add <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">.
        favicon: "favicon.ico", // Relative to your working directory
        js: ["library.js", ...], // Add <script src="library.js"></script>
        css: ["cssAssets.css", ...] // Add <link rel="stylesheet" href="cssAssets.css" />
    }
}
```
## html template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <!--mobile meta-->
    <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">

    <title>Your-title</title>
</head>
<body>
    <div id="app"></div>

    <!--js/css assets will be insert here-->
</body>

</html>
```
## alias
```js
    // '@' is an alias for your working directory
    require("@/assets/example.svg");
```