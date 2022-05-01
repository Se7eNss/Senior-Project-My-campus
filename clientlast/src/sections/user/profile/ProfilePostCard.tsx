import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  Rating,
} from '@mui/material';
// @types
import { UserPost } from '../../../@types/user';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MyAvatar from '../../../components/MyAvatar';
import EmojiPicker from '../../../components/EmojiPicker';
import { dispatch, useSelector } from 'src/redux/store';
import {getEventDetail } from 'src/redux/slices/event';
import { useSnackbar } from 'notistack';
import DeleteDialog from 'src/components/dialogs/DeleteDialog';

// ----------------------------------------------------------------------

interface Props {
  post: UserPost;
}

export default function ProfilePostCard({ post }: any) {
  const { profile } = useSelector(state => state.profile);
  const { user } = useAuth();
  const {error} = useSelector(state => state.event);
  const [openDialog, setOpenDialog] = useState(false)
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = async() => {
      setOpenDialog(true)
  };

  const handleDetail = async () => {
    if(post.eventId.status !== "deleted"){
    await dispatch(getEventDetail(post.eventId._id))
    navigate(`/event/detail/${post.eventId._id}`);
    }
    else 
    {
      enqueueSnackbar("Event is not active yet", {variant: "error"})
    }
}
  return (
    <Card>
      <DeleteDialog open={openDialog} setOpen={setOpenDialog} post={post} type="comment" />
      <CardHeader
        disableTypography
        avatar={<MyAvatar types='me'/>}
        title={
          <Box sx={{cursor:"pointer"}} onClick={handleDetail}>
          <Typography   variant="subtitle2" color="text.primary" >
             {post?.eventId?.title}
          </Typography>
          </Box>
        }
        subheader={
          <>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.' }}>
             
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              {post.createdAt != undefined ? fDate(post.createdAt) : post.createdAt}
            </Typography>
          </>
        }
        action={
          <IconButton onClick={handleDelete}>
            <Iconify color={"red"} icon={'fluent:delete-20-regular'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{post.message}</Typography>

        <Image alt="post media" src={post.image ? post.image.url : `https://oguzhanse7en.com/dest/images/ozi1.jpg`} ratio="1/1" sx={{ borderRadius: 1 }} />
        <Typography>{post.comment}</Typography>
        <Box width={1} sx={{ display: 'flex', alignItems: 'center',justifyContent:"flex-end" }}>
            <Rating precision={0.5}  value={post.rate} readOnly size="small" />
        </Box>
        {/* <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup> */}
        <Box sx={{ flexGrow: 1 }} />
      </Stack>

    </Card>
  );
}
