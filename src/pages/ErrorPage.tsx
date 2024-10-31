import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4 p-4">404 - Not Found</h1>
        <p className="text-lg mb-8">
          The page you are looking for does not exist.
        </p>
        <Link className="text-4xl text-blue-600 hover:underline" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
