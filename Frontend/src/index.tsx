import './index.css';
import App from './Layout/App/App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import { store } from './Globalstate/Store';
import { Provider } from 'react-redux';
import InterceptorService from './Services/InterceptorService';

InterceptorService.interceptor();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotifications />
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
