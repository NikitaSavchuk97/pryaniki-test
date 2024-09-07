import './index.module.scss';

import App from './components/App/App';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
);
