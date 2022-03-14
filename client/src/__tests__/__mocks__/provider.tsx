import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { AppState } from '../../store/reducer';

type Props = {
  children: ReactNode;
  state?: AppState;
};

function ReduxProvider({ children, state }: Props) {
  return (
    <Provider store={store(state)}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}

export default ReduxProvider;
