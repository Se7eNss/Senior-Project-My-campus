// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
import { AuthUser } from 'src/@types/auth';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'src/redux/store';
// utils
// @types

// ----------------------------------------------------------------------

export default function ProfileFollowInfo(active:any) {
  const {profile,comments} = useSelector(state => state.profile);

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography  color={active.active === "joined" ? "green" : "black"}  variant="h4">{comments?.length}</Typography>
          <Typography  color={active.active === "joined" ? "green" : "text.secondary"}  variant="body2" >
            Events joined
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
