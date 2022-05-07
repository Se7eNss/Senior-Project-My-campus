// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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

// ----------------------------------------------------------------------


export default function OProfileCover() {
  const { user } = useAuth();
  const {other} = useSelector(state => state.profile);
  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          types={other?.avatar.url}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{other?.firstName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{other?.faculty}</Typography>
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
