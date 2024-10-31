import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import starWarsBackground from '../assets/StarWarsBackground.jpg';
import { ErrorBoundary } from '../components/ErrorBoundary';
const RootLayout: React.FC = () => {
  return (
    <div
      className="bg-contain bg-center min-h-screen w-full"
      style={{ backgroundImage: `url(${starWarsBackground})` }}
    >
      <header>
        <NavBar />
      </header>
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default RootLayout;
