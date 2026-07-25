import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
    // Observability Channel: Dispatch telemetry payload to error monitoring service if configured
    if (typeof window !== 'undefined' && 'reportError' in window) {
      window.reportError(error);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="bg-surface flex min-h-dvh w-full flex-col items-center justify-center p-6 text-center font-sans">
          <div className="border-brand shadow-card flex max-w-md flex-col items-center justify-center rounded-2xl border-2 bg-white p-8">
            <div className="bg-brand/10 text-brand flex size-16 items-center justify-center rounded-full">
              <AlertTriangle className="size-8" />
            </div>
            <h2 className="text-text mt-6 text-2xl font-bold">
              Something went wrong
            </h2>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              An unexpected runtime error occurred. Please try reloading the
              page or returning home.
            </p>
            {this.state.error && (
              <pre className="text-text/80 mt-4 max-h-40 w-full overflow-auto rounded-lg bg-black/5 p-3 text-left font-mono text-xs">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="bg-brand hover:bg-brand-hover focus-visible:ring-brand/30 mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md transition-colors focus-visible:ring-4 focus-visible:outline-none"
            >
              <RotateCcw className="size-5" />
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
