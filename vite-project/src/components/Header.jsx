import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-react';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white'>Nest</span>
        Blog
      </Link>
      <form className="ml-auto hidden lg:inline">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme==='light'?<FaMoon/>:<FaSun/>}
          
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
            <DropdownHeader>
              <span className='block text-sm'>
                @{currentUser.username}
              </span>
              <span className='block text-medium truncate'>
                {currentUser.email}
              </span>
            </DropdownHeader>
            <Link to={'/dashboard?tab=profile'}>
              <DropdownItem>
                Profile
              </DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
            <Link to='/sign-in'>
              <Button className='bg-gradient-to-r from-orange-500 to-pink-500 text-white' outline>
                Sign In
              </Button>
            </Link>
          )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/' style={{ color: path === '/' ? '#FFA500' : 'inherit' }}>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about' style={{ color: path === '/about' ? '#FFA500' : 'inherit' }}>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/project'} as={'div'}>
          <Link to='/project' style={{ color: path === '/project' ? '#FFA500' : 'inherit' }}>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
