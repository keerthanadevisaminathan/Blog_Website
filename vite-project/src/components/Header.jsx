import { Navbar, TextInput, Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
export default function Header() {
    const path=useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white'>Nest</span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button className='bg-gradient-to-r from-orange-500 to-pink-500 text-white' >
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link to='/'  style={{ color: path === '/' ? '#FFA500' : 'inherit' }}>
                    Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link to='/about'  style={{ color: path === '/about' ? '#FFA500' : 'inherit' }}>
                   About
                </Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'}>
                <Link to='/project'  style={{ color: path === '/project' ? '#FFA500' : 'inherit' }}>
                    Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
      
    </Navbar>
  );
}
