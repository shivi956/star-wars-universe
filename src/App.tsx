import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import RootLayout from './layouts/RootLayout';
import { useFavouriteStore } from './store/useFavouriteStore';
import { Loading } from './components/Loading';

const CharacterDetails = lazy(() => import('./pages/CharacterDetails'));
const CharacterList = lazy(() => import('./pages/CharacterList'));
const Favourites = lazy(() => import('./pages/Favourites'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <CharacterList />,
      },
      {
        path: '/character/:id',
        element: <CharacterDetails />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const { setFavourites } = useFavouriteStore();

  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem('favourites') ?? '[]',
    );
    setFavourites(storedFavourites);
  }, [setFavourites]);

  return (
    <Suspense
      fallback={
        <div className="text-black">
          <Loading />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
