/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const log = require('@samislam/log')
const axios = require('axios')

/*=============================================
=            importing modules            =
=============================================*/
const { sendRes, sendResMw } = require('./index')

/*=====  End of importing dependencies  ======*/

const app = express()

// app.route("/").get((req, res, next) => {
//   // some code
//   sendRes(200, res, { message: "Hello" });
//   //   { # 200
//   //     "status": "success",
//   //     "message": "Hello"
//   //   }
// });

// app.route("/").get(sendResMw(200, { message: "Hello" }));
// //   { # 200
// //     "status": "success",
// //     "message": "Hello"
// //   }

// app.route("/").get((req, res, next) => {
//   // some code...
//   sendRes(
//     404,
//     res,
//     {},
//     {
//       statusFieldValue(statusCode) {
//         if (statusCode >= 200 && statusCode <= 205) return "OK";
//         else if (statusCode.toString().startsWith("4")) return "FAIL";
//         else return "ERR";
//       },
//     }
//   );
//   //   { # 404
//   //     "status": "FAIL"
//   //   }
// });

// app.route('/').get(
//   async (req, res, next) => {
//     // ... some code
//     const dbRes = await axios.get('https://jsonplaceholder.typicode.com/users') // [{name: Omer}, {name: Nadia}, {name: Boyd}]
//     req.allUsers = dbRes.data
//     next()
//   },
//   sendResMw(200, (req) => ({
//     message: 'Welcome, here are all the users',
//     data: req.allUsers,
//   }))
//   // { # 200
//   //     status: 'success',
//   //     message: 'Welcome, here are all the users',
//   //     data: [
//   //         { name: Omer },
//   //         { name: Nadia },
//   //         { name: Boyd },
//   //     ]
//   // }
// )

// app.route('/').get(
//   async (req, res, next) => {
//     // ... some code
//     const dbRes = await axios.get('https://jsonplaceholder.typicode.com/users') // [{name: Omer}, {name: Nadia}, {name: Boyd}]
//     req.allUsers = dbRes.data
//     next()
//   },
//   sendResMw(200, (req) => ({
//     message: 'Welcome, here are all the users',
//     $$data: req.allUsers,
//   }))
//   // { # 200
//   //     status: 'success',
//   //     message: 'Welcome, here are all the users',
//   //     results: 3, // <-- notice
//   //     data: [
//   //         { name: Omer },
//   //         { name: Nadia },
//   //         { name: Boyd },
//   //     ]
//   // }
// )

// app.route('/').get(
//   async (req, res, next) => {
//     // ... some code
//     const dbRes = await axios.get('https://jsonplaceholder.typicode.com/users') // [{name: Omer}, {name: Nadia}, {name: Boyd}]
//     req.allUsers = dbRes.data
//     next()
//   },
//   sendResMw(
//     200,
//     (req) => ({
//       message: 'Welcome, here are all the users',
//       $$data: req.allUsers,
//     }),
//     {
//       statusField: false,
//       magicalOperators: false,
//       statusFieldValue(statusCode) {
//         return statusCode === 200 ? 'Nice 👍' : 'ERROR'
//       },
//       tidy: false,
//       resultsFieldName: 'records',
//       statusFieldName: 'statusString',
//     }
//   )
//   // { # 200
//   //     status: 'success',
//   //     message: 'Welcome, here are all the users',
//   //     results: 3, // <-- notice
//   //     data: [
//   //         { name: Omer },
//   //         { name: Nadia },
//   //         { name: Boyd },
//   //     ]
//   // }
// )

console.clear()
app.listen(8111, () => log.info(log.label, 'test running on port 8111...'))
