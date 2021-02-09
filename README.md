# clover2lcov
>  Convert Clover reports to LCOV reports

## Install
```
$ npm install --save clover2lcov
```

## Usage
```js
const clover2lcov = require('clover2lcov');

clover2lcov.toLcov("clover.xml")
    .then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.error(err);
    });
```

## License

Copyright © 2021 [André Storhaug](https://github.com/andstor)

clover2lcov is licensed under the [MIT License](https://github.com/andstor/clover2lcov/blob/master/LICENSE).  
