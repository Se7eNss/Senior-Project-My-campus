// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Typography } from '@mui/material';
// @types
import { Profile } from '../../../@types/user';
// utils
import cssStyles from '../../../utils/cssStyles';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import MyAvatar from '../../../components/MyAvatar';
import Image from '../../../components/Image';
import { useSelector } from 'src/redux/store';
import Iconify from 'src/components/Iconify';
import { useState } from 'react';
import ProfileEditDialog from 'src/components/dialogs/ProfileEditDialog';
import MoreMenu from 'src/components/dialogs/MoreMenu';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));
const EditStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    right: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    left: "auto",
    bottom: "auto",
  },
}));

// ----------------------------------------------------------------------
type Props = {
  editDialog: boolean,
  setEditDialog: Function,
}

export default function ProfileCover({ setEditDialog, editDialog }: Props) {
  const { user } = useAuth();
  const { profile } = useSelector(state => state.profile);
  const handleEditDialog = () => {
    setEditDialog(true);
};

  return (
    <RootStyle>
     
      <EditStyle>
        {/* <Box onClick={handleEditDialog} sx={{ cursor:"pointer",color: 'common.white',":hover":{opacity:0.8} }} >
          <Iconify fontSize={27} icon={"ci:more-vertical"}></Iconify>
        </Box> */}
        <MoreMenu editDialog={editDialog} setEditDialog={setEditDialog}/>
      </EditStyle>
      <InfoStyle>
        <Avatar
        src={profile?.avatar.url}
        sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}/>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{profile?.firstName + " " + profile?.lastName.toUpperCase()}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{profile?.faculty}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src="https://i.ytimg.com/vi/jxGfM9e4YyA/maxresdefault.jpg"
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
