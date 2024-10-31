import { Link } from 'react-router-dom';
import StarWarsLogo from '../assets/light-saber.png';
import FavouriteLogo from '../assets/star.png';

const NavBar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-3">
        <div className="flex gap-5">
          <img alt="light-saber" src={StarWarsLogo} width={50} />
          <Link
            to={`/`}
            className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
          >
            Star Wars
          </Link>
        </div>
        <div className="flex gap-2">
          <img alt="light-saber" src={FavouriteLogo} width={30} />
          <Link
            to={`/favourites`}
            className="font-semibold text-xl whitespace-nowrap dark:text-white"
          >
            Favourites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
