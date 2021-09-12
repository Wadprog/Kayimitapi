import Alerts from './Alert';
import { useSelector } from 'react-redux';
import { getAlerts } from 'store/alerts';
export default function PageWrapper({ isLoading, Loader, children }) {
  const alerts = useSelector(getAlerts);
  return (
    <>
      {isLoading ? (
        <div
          className="bg-indigo"
          style={{
            width: '100vw',
            height: '100vh',
            zIndex: 200,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
          }}
        >
          <div class="spinner-border text-white" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`bg-dark d-${!alerts.list.length ? 'none' : ''}`}
            style={{
              width: '100vw',
              height: '100%',
              zIndex: 200,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              opacity: '0.95',
              scroll: 'no',
              overflow: 'hidden',
            }}
          >
            <Alerts alerts={alerts} />
          </div>
          {children}
        </>
      )}
    </>
  );
}
