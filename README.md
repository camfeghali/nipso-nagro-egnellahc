# README

This program reads a csv file containing data on customer orders,  and outputs to STDOUT how many organs of each organ a customer shall receive.

There are four major components to the program, the `Logger module`, the `rebates` object found in the `rebates.js` file which holds data about the rebates structure, the `test.js` file and the `index.js`.



## Logger Module

Is initialized with a `rebates`, with the following structure: 

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

Exposes a single method called `#outputOrgansReceived(row)` which prints a single line to the console in the form of `heart <count>, liver <count>, lung <count>`

