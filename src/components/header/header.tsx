import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-slate-600 text-white h-8 flex items-center justify-center'>
      <div>
        <Link to='/reduxClientStateDemo' className='mx-2 hover:text-yellow-200'>
          Redux Client State Demo
        </Link>
        <Link to='/reduxServerStateDemo' className='mx-2 hover:text-yellow-200'>
          Redux Server State Demo
        </Link>
      </div>
    </header>
  );
}
