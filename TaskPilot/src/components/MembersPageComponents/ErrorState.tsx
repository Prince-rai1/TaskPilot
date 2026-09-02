import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="tf-members-error">
      <div className="tf-members-error-icon">
        <AlertCircle size={28} />
      </div>
      <h3>Unable to load members</h3>
      <p>Something went wrong while loading workspace members.</p>
      <button className="tf-btn-primary" onClick={onRetry}>
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;
