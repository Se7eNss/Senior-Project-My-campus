// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
import { AuthUser } from 'src/@types/auth';
import useAuth from 'src/hooks/useAuth';
import { useSelector } from 'src/redux/store';
// utils
// @types

// ----------------------------------------------------------------------

export default function OProfileFollowInfo() {
  const {other} = useSelector(state => state.profile);

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{other?.comments.length}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Events joined
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
