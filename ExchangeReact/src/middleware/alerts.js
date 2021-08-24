import uuid from 'uuid'
import * as actions from '../store/api'
import { setAlert, removeAlert } from '../store/alerts'
const lastId = 0
const alert = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallFailed.type) return next(action)
  const id = lastId + 1
  next(action)

  store.dispatch(
    setAlert({
      msg: action.payload,
      id,
      type: 'warning',
      icon: 'fa fa-exclamation-triangle',
    })
  )
  setTimeout(() => store.dispatch(removeAlert(id)), 5000)
}

export default alert
