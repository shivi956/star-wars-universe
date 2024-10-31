import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

describe('ErrorPage', () => {
  const renderErrorPage = () =>
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );

  it('renders the 404 error message', () => {
    renderErrorPage();

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(screen.getByText('404 - Not Found')).toHaveClass(
      'text-4xl font-bold mb-4',
    );

    expect(
      screen.getByText('The page you are looking for does not exist.'),
    ).toBeInTheDocument();
  });

  it('renders the "Go to Home" link with correct styling and route', () => {
    renderErrorPage();

    const homeLink = screen.getByText('Go to Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('text-4xl text-blue-600 hover:underline');
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
