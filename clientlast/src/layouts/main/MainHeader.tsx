import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, MenuItem } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import { menuAuthConfig, menuDefaultConfig } from './MenuConfig';
import useAuth from 'src/hooks/useAuth';
import Iconify from 'src/components/Iconify';
import { dispatch } from 'src/redux/store';
import { setOpenEvents } from 'src/redux/slices/event';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const navigate = useNavigate()

  const { user,logout } = useAuth()

  const isAuth = user ? true : false

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/home';

  const openEventsDialog = () => {
    navigate('/home');
    dispatch(setOpenEvents(true))
  }

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {isAuth &&  isDesktop ? (
            <>
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={menuAuthConfig} /> 
            <Button onClick={openEventsDialog}  sx={{fonstSize:"13px",mr:2,ml:-2}} >Events</Button>
            <Button color="error"  endIcon={<Iconify icon={'carbon:logout'}></Iconify>} sx={{fonstSize:"13px"}} onClick={logout}>Logout</Button>
            </>
          ):isAuth &&  !isDesktop ?(
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={menuAuthConfig} />
          ):!isAuth &&  isDesktop ?(
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={menuDefaultConfig} />
          ):!isAuth &&  !isDesktop &&(
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={menuDefaultConfig} />
          )
        }
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
