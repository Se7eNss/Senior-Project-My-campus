import { useState, useEffect, ReactNode } from 'react';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  LinkProps,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
  Button,
} from '@mui/material';
// config
import { NAVBAR } from '../../config';
// components
import Logo from '../../components/Logo';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { IconButtonAnimate } from '../../components/animate';
import { NavSectionVertical } from '../../components/nav-section';
//
import { MenuProps, MenuItemProps } from './type';
import useAuth from 'src/hooks/useAuth';
import { dispatch } from 'src/redux/store';
import { setOpenEvents } from 'src/redux/slices/event';

// ----------------------------------------------------------------------

type StyleProps = LinkProps & ListItemButtonProps;

interface ListItemStyleProps extends StyleProps {
  component?: ReactNode;
  to?: string;
  end?: boolean;
}

const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function MenuMobile({ isOffset, isHome, navConfig}: MenuProps) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user,logout } = useAuth()

  const navigate = useNavigate();

  const isAuth = user ? true : false

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const openEventsDialog = () => {
    navigate('/home');
    dispatch(setOpenEvents(true))
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
            {isAuth && <Box ml={2} display={"flex"} flexDirection="column" justifyContent={"start"} alignItems="flex-start">
                <Button startIcon={<Iconify height={22} width={22} icon={'carbon:location-filled'}></Iconify>} onClick={openEventsDialog}  sx={{fonstSize:"13px"}} >Events</Button>
                <Button color="error"  startIcon={<Iconify height={22} width={22} icon={'carbon:logout'}></Iconify>} sx={{fonstSize:"13px"}} onClick={logout}>Logout</Button>
            </Box>  }
            
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type MenuMobileItemProps = {
  item: MenuItemProps;
  isOpen: boolean;
  onOpen: VoidFunction;
};

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSectionVertical
              navConfig={children}
              sx={{
                '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                  height: 200,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                    'url(https://minimal-assets-api.vercel.app/assets/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
                },
              }}
            />
          </Box>
        </Collapse>
      </>
    );
  }

  if (title === 'Documentation') {
    return (
      <ListItemStyle href={path} target="_blank" rel="noopener" component={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
