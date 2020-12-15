import { pathOr, construct, assocPath, mergeLeft } from 'ramda'

function Error(record:any) {
  const message:string = pathOr(null, ['message'], record)
}

Error.prototype = {
  setMessage: function(value) {
    return assocPath(['message'], value, this)
  },
  
}

export default construct(Error)
