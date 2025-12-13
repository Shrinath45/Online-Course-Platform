import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import './Header.css';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#042439", padding: "10px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

          {/* Logo + Title */}
          <Box className="logo" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/src/Pages/Images/logo.svg" alt="logo" style={{ height: '40px' }} />
            <Typography variant="h6" sx={{ color: '#4E84C1', fontWeight: 'bold', fontSize:'25px' }}>
            <span className='text-white'>Skill</span>Forge
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box className="link-nav" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 3 }}>
            {pages.map((page, index) => (
              <NavLink
                key={index}
                to={page.path}
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                style={{ textDecoration: 'none', fontSize: '18px' }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <button className="auth-btn">Sign In</button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: 'none' }}>
              <button className="auth-btn">Sign Up</button>
            </NavLink>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {[...pages, { name: 'Sign In', path: '/login' }, { name: 'Sign Up', path: '/signup' }].map((item, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                    style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}
                  >
                    {item.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
