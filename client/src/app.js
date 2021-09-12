import { Provider } from 'react-redux';

// Custom dependencies
import { store } from './store';
import Routes from 'layouts/Routes.js';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/react.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
