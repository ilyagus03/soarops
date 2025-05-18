import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="dashboard-container" style={{ textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <div className="card">
            <p>We're sorry, but an error occurred while rendering this component.</p>
            {this.state.error && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#fee2e2', 
                color: '#ef4444',
                borderRadius: '8px',
                textAlign: 'left',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}>
                <p><strong>Error:</strong> {this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                    <summary>Stack trace</summary>
                    {this.state.errorInfo.componentStack}
                  </details>
                )}
              </div>
            )}
            <button 
              className="btn mt-4"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
