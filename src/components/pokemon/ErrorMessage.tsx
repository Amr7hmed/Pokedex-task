import type { ErrorMessageProps } from "@/types/pokemon";

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-4 text-center">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
