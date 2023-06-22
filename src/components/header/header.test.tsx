import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

describe('header component', () => {
  it('should render header component correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Demo App/i)).toBeVisible();
  });
});
