// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, SpeedDial, Typography, SpeedDialAction, IconButton, useTheme } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, InstapaperShareButton, LinkedinShareButton, } from 'react-share';
import useAuth from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';
import EditEventDialog from 'src/components/dialogs/EditEventDialog';
import { dispatch } from 'src/redux/store';
import { getEventDetail } from 'src/redux/slices/event';

// ----------------------------------------------------------------------



const OverlayStyle = styled('h1')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h2,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------



export default function BlogPostHero({ event }: any) {
  const url = window.location.href;
  const SOCIALS = [
    {
      name: 'Facebook',
      icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
    },
    {
      name: 'Linkedin',
      icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
    },
    {
      name: 'Twitter',
      icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
    },
  ];


  
  const theme = useTheme();
  const { user } = useAuth();
  const isDesktop = useResponsive('up', 'sm');
  const edit = user?._id === event?.user?._id ? true : false;
  
  return (
    <Box sx={{ position: 'relative' }}>
     
      <TitleStyle>{event?.title}</TitleStyle>
      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={event?.user?.firstName} src={event?.user?.avatar.url} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {event?.user?.firstName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {event?.eventDate.slice(0, 10)}
            </Typography>
          </Box>
        </Box>


        {/* {edit ? (
            <IconButton sx={{zIndex:99,color:theme.palette.primary.main}} size="large" onClick={handleOpen}>
            <Iconify icon={'eva:edit-2-outline'} width={24} height={24} />
        </IconButton>) :
        ( */}

        <Box display={"flex"}>
          <LinkedinShareButton url={url}>
            <IconButton sx={{ zIndex: 99, }} size="large">
              <Iconify icon={'eva:linkedin-fill'} width={24} height={24} />
            </IconButton>
          </LinkedinShareButton>
          <TwitterShareButton
            url={url}
            title="Check This Event,It's amazing... ">
              <IconButton sx={{ zIndex: 99, }} size="large">
            <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />
            </IconButton>
          </TwitterShareButton>
        </Box>
        
      </FooterStyle>

      <OverlayStyle />
      <Image alt="post cover" src={event?.eventImage?.url} ratio="16/9" />
    </Box>
  );
}
