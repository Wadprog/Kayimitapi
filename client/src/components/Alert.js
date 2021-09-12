import { Alert } from 'reactstrap';
import { removeAlert } from '../store/alerts';
import { useDispatch } from 'react-redux';

export default function Toast({ alerts }) {
  const dispatch = useDispatch();
  const onDismiss = (e) => 
    dispatch(removeAlert(e.target.parentElement.parentElement.id));
  
  return (
    <>
      {alerts?.list.map((alert) => (
        <Alert
          key={`alert-${alert.id}`}
          color={alert.type}
          id={alert.id}
          toggle={onDismiss}
        >
          {alert.icon && (
            <span className="alert-inner--icon">
              <i className={alert.icon} />
            </span>
          )}{' '}
          <span className="alert-inner--text">{alert.msg}</span>
        </Alert>
      ))}
    </>
  );
}
