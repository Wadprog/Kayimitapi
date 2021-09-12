import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'store/auth';
import { setAlert } from 'store/alerts';

const SuperUserRoutes = ({ component: Component, ...rest }) => {
  console.log('Super Routes ');
  const auth = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  if (!auth?.data.user?.isAdmin) console.log('(setAlert)');
  return (
    <>
      {
        auth?.data.user?.isAdmin ? (
          <Route {...rest} render={(props) => <Component {...props} />} />
        ) : null
        // <>{console.log("(setAlert({ msg: 'Not Authorized' }))") }</>
      }
    </>
  );
};

export default SuperUserRoutes;
