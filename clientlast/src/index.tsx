// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

//
import App from './App';
import { AuthProvider } from './contexts/JWTContext';
import { store } from './redux/store';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root')
);
