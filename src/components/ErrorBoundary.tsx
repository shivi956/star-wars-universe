import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ error: null, errorInfo: null });
    }
  }

  render() {
    if (this.state.error || this.state.errorInfo) {
      return (
        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-4/5 h-[calc(100vh-2.5rem)] m-auto flex flex-col">
            <h2 className="text-red-600 text-2xl mb-4">
              An Error Has Occurred
            </h2>
            <details className="bg-red-100 p-4 rounded-lg whitespace-pre-wrap">
              {this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
