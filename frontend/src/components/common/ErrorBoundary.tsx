import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="section-wrap min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 mb-6">
            <AlertTriangle size={26} />
          </div>
          <span className="eyebrow text-red-400">INTERFACE RECOVERY</span>
          <h2 className="text-3xl md:text-5xl font-serif text-ink mt-3 mb-4">A component encountered an issue.</h2>
          <p className="text-muted max-w-md mb-8 leading-relaxed">
            The rest of the portfolio remains safe. You can reload this view or continue exploring.
          </p>
          <button
            className="button button--primary inline-flex items-center gap-2"
            type="button"
            onClick={this.handleReset}
          >
            <RotateCcw size={15} /> Reload portfolio
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
