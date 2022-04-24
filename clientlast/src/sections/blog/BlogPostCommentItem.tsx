import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar,
  Card,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  avatarUrl?: string;
  message: string;
  tagUser?: string;
  postedAt: Date;
  hasReply?: boolean;
  image?: string;
};

export default function BlogPostCommentItem({
  name,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
  image
}: Props) {
  const [openReply, setOpenReply] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  return (
    <Card>
      
    </Card>
  );
}
