import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Programs from '../../pages/programs';
import ReduxProvider from '../__mocks__/provider';

describe('Testing Programs Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', async () => {
    moxios.stubRequest('/program', {
      status: 200,
      response: {
        result: [
          {
            name: 'Program',
            options: [
              {
                name: 'name',
                price: 1,
              },
            ],
            _id: 'jasdoijaod',
            createdAt: new Date().toDateString(),
          },
        ],
      },
    });
    render(
      <ReduxProvider>
        <Programs />
      </ReduxProvider>
    );

    const out = await waitFor(() => screen.findByTestId('delete-icon'));

    fireEvent.click(out);
  });
});
