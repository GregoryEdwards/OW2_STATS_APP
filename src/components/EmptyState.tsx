import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

/** Centered placeholder for empty lists / no-selection states. */
export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center justify-center px-6 py-16 text-center">
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
