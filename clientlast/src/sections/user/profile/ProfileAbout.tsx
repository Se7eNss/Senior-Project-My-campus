// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from 'src/components/Iconify';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'src/redux/store';
// @types

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileAbout() {
  const {user}=useAuth();
  const {profile} = useSelector(state => state.profile);
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{profile?.firstName}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{profile?.email}</Typography>
        </Stack>
        {profile?.faculty &&(
          <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {user?.faculty}
          </Typography>
        </Stack>
        )}
      </Stack>
    </Card>
  );
}
