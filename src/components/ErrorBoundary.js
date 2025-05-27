// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>خطایی رخ داده است!</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            بارگذاری مجدد
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
