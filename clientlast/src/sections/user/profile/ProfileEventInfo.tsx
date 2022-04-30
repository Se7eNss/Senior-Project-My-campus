// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
import { AuthUser } from 'src/@types/auth';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'src/redux/store';
// utils
// @types

// ----------------------------------------------------------------------

export default function ProfileEventInfo(active:any) {
  const {profile,comments} = useSelector(state => state.profile);
   console.log(active)
  return (
    <Card sx={{py:3}}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Pending").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
            Pending Events Created
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Active").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
           Active Events Created
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
