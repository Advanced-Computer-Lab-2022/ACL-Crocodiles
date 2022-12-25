import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../images/logo.png'
import {Link, redirect} from 'react-router-dom'
import NewCountryDD from './NewCountryDD' 
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'
import PersonIcon from '@mui/icons-material/Person';
import SearchAppBar from './SearchAppBar'
import { useDispatch } from 'react-redux';
import { chooseSwipableIsOpen } from '../Features/swipableIsOpen'

const pages = ['Explore', 'My Courses','Filter'];
const settings = ['Profile', 'Account', 'Logout'];
const log = ['sign in', 'sign up'];

function TraineeNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { logout } = useLogout()

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
 
  };

  const handleCloseNavMenu = (e) => {

    if(e=='Explore')
    navigate('/course');
    else
    if(e=='My Courses' && user)
    navigate('/MyCourses');
    else
    if(e=='Filter')
    dispatch(chooseSwipableIsOpen(true))
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {

    switch(setting){
        case "Logout": {
               logout();
                break;};
        case "Profile": {
          if(user.Type==='trainee')
            navigate('/traineeprofile');
          else
            navigate('/instructorprofile');
              break;};
     
    }
    setAnchorElUser(null);
  };
  const theme = createTheme({

    palette:{
        primary:{
            main: '#ffffff00'
        },
        secondary:{
            main: '#A00407'
        }
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="fixed" sx={{ backgroundColor:"#ffffffff",zIndex: (theme) => theme.zIndex.drawer+1}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

                <Link to="/"><img src={logo} alt="logo"  style={{  maxWidth: 160,}} /></Link> 
<SearchAppBar/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton  
              size="large"
              aria-label="account of current user"
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() =>handleCloseNavMenu(page)} >
                  <Typography color='secondary' textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
   
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
              <Button
                onClick={() => handleCloseNavMenu('Explore')}
                color='secondary'
                sx={{ my: 2, display: 'block' }}
              >
                {'Explore'}
              </Button>

             { user &&<Button
                onClick={() => handleCloseNavMenu('My Courses')}
                color='secondary'
                sx={{ my: 2, display: 'block' }}
              >
                {'My Courses'}
              </Button>}
              
        
          </Box>

          {user? <Box sx={{ display: { xs: 'flex'}, flexGrow: 0 }}>
          <NewCountryDD/>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , marginLeft:'8px'}}>
                <Avatar alt={user.Email} src="/static/images/avatar/2.jpg">
                <PersonIcon fontSize='large'/> </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:
               <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }} alignItems='center'>
                <NewCountryDD/>
                 <Button
                 
                   key={'sign in'}
                   onClick={() => navigate('/signin')}
                   color='secondary'
                   sx={{ my: 2, display: 'block' }}
                 >
                   {'sign in'}
                 </Button>
            
                 <Button
                 
                 key={'sign up'}
                 onClick={() => navigate('/signup')}
                 color='secondary'
                 sx={{ my: 2, display: 'block' }}
               >
                 {'sign up'}
               </Button>
             </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar/>
    </ThemeProvider>
  
  );
}
export default TraineeNavBar;