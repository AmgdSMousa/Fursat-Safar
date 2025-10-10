import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fix: The ErrorBoundary class must extend `React.Component` to be treated as a
// valid class component. This makes `props`, `state`, and `setState` available
// on the component instance, resolving the errors within this file and the
// `children` prop errors in other components.
class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 m-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">حدث خطأ ما</h2>
          <p className="text-red-700 dark:text-red-400 mb-6">
            عذراً، حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى.
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-300"
          >
            حاول مرة أخرى
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;