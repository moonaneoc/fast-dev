fast start a webpack-dev-server and build

## Installation

```
$ npm install fast-dev -g
```
## Usage

enter the working directory and start a webpack-dev-server

```
$ dev
```

build library

```
$ build
```
build vue project

```
$ build vue
```

merge your webpack config

```
$ build -c <config>
```

configure package.json
```js
{
    ...
    "__package__name": "name", // filename of library, default 'app'.
    "__package__entry": "your-entry.js", // project entry. not necessary.
    "__package__platform": "mobile", // 'mobile' or 'pc', default 'pc'. If you're building a library,ignore this.
}
```