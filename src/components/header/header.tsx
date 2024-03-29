import { Link } from 'react-router-dom';
import { SiRedux, SiReact, SiTailwindcss } from 'react-icons/si';

export default function Header() {
  return (
    <header className='bg-gradient-to-r from-teal-800 via-amber-800 to-slate-800 bg-animate text-white h-14 flex items-center justify-between px-10'>
      <div className='flex flex-row items-center gap-2'>
        <SiReact className='text-teal-300' strokeWidth={1} size={32} /> <span>+</span>
        <SiRedux className='text-teal-300' strokeWidth={1} size={32} />
        <span>+</span>
        <SiTailwindcss className='text-teal-300' strokeWidth={1} size={32} />
        <span>Demo App</span>
      </div>

      <div>
        <Link to='/reduxClientStateDemo' className='mx-2 hover:text-yellow-200 text-green-100 text-sm'>
          Redux Client State Demo
        </Link>
        <Link to='/reduxServerStateDemo' className='mx-2 hover:text-yellow-200 text-green-100 text-sm'>
          Redux Server State Demo
        </Link>
      </div>
    </header>
  );
}
