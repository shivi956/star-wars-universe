import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import starWarsBackground from '../assets/StarWarsBackground.jpg';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Suspense } from 'react';
import { Loading } from '../components/Loading';
const RootLayout: React.FC = () => {
  return (
    <div
      className="bg-contain bg-center w-full min-w-96 min-h-screen"
      style={{ backgroundImage: `url(${starWarsBackground})` }}
    >
      <header>
        <NavBar />
      </header>
      <main>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="text-center text-slate-100">
                <Loading />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default RootLayout;
