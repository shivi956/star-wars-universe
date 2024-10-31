import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

const NonErrorThrowingComponent = () => <div>Normal component</div>;

describe('ErrorBoundary', () => {
  test('renders without crashing and displays children', () => {
    render(
      <ErrorBoundary>
        <NonErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Normal component')).toBeInTheDocument();
  });

  test('catches an error and displays error message', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('An Error Has Occurred')).toBeInTheDocument();
    expect(screen.getByText(/Error: Test error/)).toBeInTheDocument();
  });

  test('resets error state on prop change', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('An Error Has Occurred')).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <NonErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.queryByText('An Error Has Occurred')).not.toBeInTheDocument();
    expect(screen.getByText('Normal component')).toBeInTheDocument();
  });
});
