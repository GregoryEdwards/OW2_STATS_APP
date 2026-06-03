import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/EmptyState';

export function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      message="The page you’re looking for doesn’t exist."
      action={
        <Link to="/" className="text-ow-orange hover:underline">
          Back to heroes
        </Link>
      }
    />
  );
}
