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
       <Typography textAlign={"center"} color={active.active === "created" ? "green" : "text.secondary"} variant="body1">
            Created Events
          </Typography>
      <Divider sx={{m:2}} orientation="horizontal" flexItem />
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Pending").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
            Pending
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Upcoming").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
           Upcoming 
          </Typography>
        </Stack>
        </Stack>
        <Divider sx={{m:2}} orientation="horizontal" flexItem />
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Active").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
           Active
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography color={active.active === "created" ? "green" : "black"} variant="h4">{profile?.events?.filter(e=>e.status === "Finished" || e.status === "Closed").length}</Typography>
          <Typography color={active.active === "created" ? "green" : "text.secondary"} variant="body2">
           Finished
          </Typography>
        </Stack>
        </Stack>
    </Card>
  );
}
