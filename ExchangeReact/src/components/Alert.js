import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux'
import { getAlerts } from 'store/alerts'
export default function Toast() {
  const alerts = useSelector(getAlerts)

  return (
    <>
      {alerts?.list.map((alert) => (
        <Alert color={alert.type}>
          <span className="alert-inner--icon">
            <i className={alert.icon} />
          </span>{' '}
          <span className="alert-inner--text">{alert.msg}</span>
        </Alert>
      ))}
    </>
  )
}
