# README

This program reads a csv file containing data on customer orders, and outputs to STDOUT how many of each organ a customer shall receive based on a rebate system.

There are four major components to the program, the `Logger module`, the `rebates` object found in the `rebates.js` file which holds data about the rebates structure, the `test.js` file and the `index.js`.



# Run & Test

* Install dependencies: `npm install`
* Run with: `npm run start`
* Test with: `npm run test`



## Logger Module

Taking advantage of Javascript closures, we can encapsulate data and behavior.

the Logger module is initialized with a `rebates` object, with the following structure:

```javascript
{
  [organ]: {
    required: INTEGER,
    freeOrgans: {
      [organ]: INTEGER,
    },
  },
  [organ]: {
    required: INTEGER,
    freeOrgans: {
      [organ]: INTEGER,
      [organ]: INTEGER,
    },
  },
}
```

It Exposes a single method called `#outputOrgansReceived(row)` which expects a `row={organ: INTEGER, cash: INTEGER, price: INTEGER}` argument and prints a single line to the console in the form of `heart <count>, liver <count>, lung <count>`.



## Index.js

The `index.js` is the entry point to the program: 

* We initialize the `Logger` module with a `rebates` Object imported from the `rebates.js` file.
* Using the `fs` library, we read our csv file into a stream, which we pipe into our parser.
* For every row of data, a object of the form `csvrow={organ: INTEGER, cash: INTEGER, price: INTEGER}` , is returned with which we run our `logger.outputOrgansReceived(csvrow)`



## Notes

Another version of the program exists in the 

[refactor-to-oop]: https://github.com/camfeghali/nipso-nagro-egnellahc/tree/refactor-to-oop

 branch where the `Logger` is developed using Javascript `class`. That version has more tests because I did not figure out how to test private (unexposed) functions when taking advantage of closures.

