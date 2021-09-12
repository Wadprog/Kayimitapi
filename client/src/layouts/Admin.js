import env from '../config';
import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';
import SuperUserRoutes from './SuperUserRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'store/auth';

const { endpoints, layouts } = env;
const Admin = (props) => {
  const currentUser = useSelector(getCurrentUser);
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === layouts.ADMIN) {
        if (prop?.supervisorAccess) {
          return (
            <SuperUserRoutes
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <>
      <Sidebar {...props} routes={routes} />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          {currentUser?.data?.user?.isAdmin ? (
            <Redirect from="*" to={`${layouts.ADMIN}${endpoints.DASHBOARD}`} />
          ) : (
            <Redirect
              from="*"
              to={`${layouts.ADMIN}${endpoints.TRANSACTIONS}`}
            />
          )}
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
