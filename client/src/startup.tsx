import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import { injector } from './config/injectAxios';
import { AppState } from './store/reducer';

type Props = {
  testState?: AppState;
};

function Startup({ testState }: Props) {
  const storeInstance = store(testState);
  injector(storeInstance);
  return (
    <Provider store={storeInstance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Startup;
