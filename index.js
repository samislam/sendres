/*=============================================
=            importing dependencies            =
=============================================*/
const checkTypes = require('@samislam/checktypes')
const jsonKeysSort = require('json-keys-sort')
const _ = require('lodash')
/*=============================================
=            importing modules            =
=============================================*/

/*=====  End of importing dependencies  ======*/

function _sendRes(statusCode, body, options) {
  // working with options ---------------
  const chosenOptions = {} // to prevent mutating the options argument
  const resBody = Object.assign(body) // to prevent mutating the options argument
  const defaultOptions = {
    statusField: true,
    magicalOperators: true,
    statusFieldValue(statusCode) {
      if (statusCode >= 200 && statusCode <= 205) return 'success'
      else if (statusCode.toString().startsWith('4')) return 'fail'
      else return 'error'
    },
    tidy: false,
    resultsFieldName: 'results',
    statusFieldName: 'status',
  }
  _.merge(chosenOptions, defaultOptions, options)
  // ^ test
  // console.log(chosenOptions, defaultOptions, options);
  // working with the status property ---------------
  if (chosenOptions.statusField)
    resBody[chosenOptions.statusFieldName] =
      chosenOptions.statusFieldValue(statusCode)
  // working with the magical operators ---------------
  if (chosenOptions.magicalOperators) {
    if (resBody.$$data) {
      resBody.data = resBody.$$data
      delete resBody.$$data
      if (checkTypes.isArray(resBody.data))
        resBody[chosenOptions.resultsFieldName] = resBody.data.length
    }
  }

  if (chosenOptions.tidy) return jsonKeysSort.sort(resBody, false)
  else return resBody
}

function sendRes(statusCode, res, body = {}, options = {}) {
  // @param statusCode*: Number
  // @param res*: response object from express
  // @param body: object
  // @param options: object
  // generating and sending the response ---------------
  const resBody = _sendRes(statusCode, body, options)
  res.status(statusCode).json(resBody)
}

function sendResMw(statusCode, body = {}, options = {}) {
  return async (req, res, next) => {
    // @param statusCode*: Number
    // @param body: object
    // @param options: object
    // generating and sending the response ---------------
    const resolvedBody = checkTypes.isAsycOrSyncFunc(body)
      ? await body(req)
      : body
    const resBody = _sendRes(statusCode, resolvedBody, options)
    res.status(statusCode).json(resBody)
  }
}

/*----------  end of code, exporting  ----------*/
module.exports = {
  sendRes,
  sendResMw,
}
