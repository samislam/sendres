SendRes is a small and simple utility for sending formatted responses to the clients, it internally handles the `status: success | fail | error` based on the status code as well as other fields.

# API

# sendRes(statusCode: number, res [, body: object , options: object])

- `statusCode`:  The status code.
- `res`: The response object which is given to you by express.
- `body`: optional, an object, which is the main response.body you want.
- `options`: optional, options to configure how `sendRes()` or `sendResMw()` will behave.

### Example using the `sendRes()` function:

```js
app.route("/").get((req, res, next) => {
  // some code
  sendRes(200, res, { message: "Hello" });
  //   { # 200
  //     "status": "success",
  //     "message": "Hello"
  //   }
});
```
---------------
## sendRes as an ExpressJs middleware:

# sendResMw(statusCode: number [, body: object | function , options: object])


- `statusCode`:  The status code.
- `body`: optional, an object or a function, which is the main response.body you want.
  - when using this argument as a function, it will be called with the `req` object as the first and only arguemnt. Your function must return an object.
- `options`: optional, options to configure how `sendRes()` or `sendResMw()` will behave.

### Example using the `sendResMw()` middleware:

```js
app.route("/").get(sendResMw(200, { message: "Hello" }));
//   { # 200
//     "status": "success",
//     "message": "Hello"
//   }
```

# Available options
- `statusField`: *boolean*, weither to add the `status` property to the response or not (default: `true`).
- `magicalOperators`: *boolean*, weither to disable the magical operators or to allow them (default: `true`).
- `statusFieldValue`: *function*, this function will be called with the arguemnt `statusCode`, the return value determines the value of the status field.
- `tidy`: *boolean*, weither to organize the order for the body of the response or not (default: `true`). 
  - sendRes internally orders your json object, this can be disabled using this option. 
- `resultsFieldName`: *string*, the name you want for the **results** property which gets added when you use the `$$data` operator if you want to change it (default: `'results'`).
- `statusFieldName`: *string*, the name you want for the **status** property which gets added automatically if you want to change it (default: `'status'`).


### Example of using the options arguemnt:
```js
app.route("/").get((req, res, next) => {
  // some code...
  sendRes(
    404,
    res,
    {},
    {
      statusFieldValue(statusCode) {
        if (statusCode >= 200 && statusCode <= 205) return "OK";
        else if (statusCode.toString().startsWith("4")) return "FAIL";
        else return "ERR";
      },
    }
  );
  //   { # 404
  //     "status": "FAIL"
  //   }
});
```

# About the `status` property:
The status field depends on the status code you chose:

- If the statusCode was >= **200** and <= **205**, the status field will be `'success'`.
- If the statusCode starts with the number **4**, the status field will be `'fail'`.
- otherwise, the status field will be `'error'`.

> **Tip:**
> You can change the **status** field value using the `statusFieldValue` option in the **options** argument object. 

# Magical Operators
Magical operators are the fields that you add within the `body` parameter. All the magical operators names start with `$$`, ex: `$$data`. They're used to manipulate the response body programatically. 

1. `$$data`: adds the **results** property to the response object, and converts its name in the response from **$$data** to **data**.
    - this property should hold an array.
    - the **results** property is the length of the `$$data` operator entries.

\- *Currently, as of v1.0.x the only magical operator available is the `$$data` operator.*



### Example without using the `$$data` magical operator:

```js
app.route('/').get(
  async (req, res, next) => {
    // ... some code
    const dbRes = await axios.get('https://jsonplaceholder.typicode.com/users') // [{name: Omer}, {name: Nadia}, {name: Boyd}]
    req.allUsers = dbRes.data
    next()
  },
  sendResMw(200, (req) => ({
    message: 'Welcome, here are all the users',
    data: req.allUsers,
  }))
  // { # 200
  //     status: 'success',
  //     message: 'Welcome, here are all the users',
  //     data: [
  //         { name: Omer },
  //         { name: Nadia },
  //         { name: Boyd },
  //     ]
  // }
)
```


### Example using the `$$data` magical operator:

```js
app.route('/').get(
  async (req, res, next) => {
    // ... some code
    const dbRes = await axios.get('https://jsonplaceholder.typicode.com/users') // [{name: Omer}, {name: Nadia}, {name: Boyd}]
    req.allUsers = dbRes.data
    next()
  },
  sendResMw(200, (req) => ({
    message: 'Welcome, here are all the users',
    $$data: req.allUsers,
  }))
  // { # 200
  //     status: 'success',
  //     message: 'Welcome, here are all the users',
  //     results: 3, // <-- notice
  //     data: [
  //         { name: Omer },
  //         { name: Nadia },
  //         { name: Boyd },
  //     ]
  // }
)
```

---------------
version: 1.0
30 - June - 2022