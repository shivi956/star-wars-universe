import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CharacterDetails from './pages/CharacterDetails';
import CharacterList from './pages/CharacterList';
import Favourites from './pages/Favourites';
import RootLayout from './layouts/RootLayout';
import ErrorPage from './pages/ErrorPage';

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
  return <RouterProvider router={router} />;
}

export default App;
