import * as R from 'ramda'
import {Alert} from 'react-native'

import {setMessageError} from "../modules/ErrorBoundary/action-type"
function RequestHandler(error:any ,dispatch:any) {
  const message = R.pathOr(
    "Lỗi hệ thống, vui lòng thử lại sau.",
    ["message"],
    error
  );
  console.log('message',message)
   dispatch(setMessageError(message))
}

export default RequestHandler
