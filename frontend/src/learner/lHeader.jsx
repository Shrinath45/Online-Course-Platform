import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

const pages = [
  { name: 'Dashboard', path: '/learner-dashboard' },
  { name: 'Courses', path: '/learner-courses' },
  { name: 'My Learning', path: '/my-learning' }
];

function LHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // ✅ Get user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  // ✅ Logout functionality
  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("token");
    navigate("/login"); // Redirect after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#042439", padding: "10px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

          {/* Left: Logo */}
          <Box className="logo" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/src/Pages/Images/logo.svg" alt="logo" style={{ height: '40px' }} />
            <Typography variant="h6" sx={{ color: '#4E84C1', fontWeight: 'bold', fontSize: '25px' }}>
              SkillForge
            </Typography>
          </Box>

          {/* Center: Desktop Navigation */}
          <Box
            className="link-nav"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 3 }}
          >
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

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            {/* Notification Icon */}
            <IconButton sx={{ color: "#fff" }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Desktop: Profile Avatar + Username */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={handleOpenUserMenu}
            >
              <Avatar
                src={user?.profile_photo || '/default-avatar.png'}
                alt={user?.name || 'Profile'}
                sx={{ width: 40, height: 40 }}
              />
              <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                {user?.name || 'User'}
              </Typography>
            </Box>

            {/* Mobile Menu Icon */}
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
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((item, index) => (
          <MenuItem key={index} onClick={() => { handleCloseNavMenu(); navigate(item.path); }}>
            {item.name}
          </MenuItem>
        ))}

        {/* ✅ Added Profile & Logout options for Mobile */}
        <MenuItem onClick={() => { handleCloseNavMenu(); navigate("/profile"); }}>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
          Logout
        </MenuItem>
      </Menu>

      {/* Profile Dropdown Menu (Desktop) */}
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/profile"); }}>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default LHeader;
