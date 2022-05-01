import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, LinearProgress, Rating } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';

// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextMaxLine from '../../components/TextMaxLine';
import TextIconLabel from '../../components/TextIconLabel';
import SvgIconStyle from '../../components/SvgIconStyle';
import { TabContext } from '@mui/lab';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

type Props = {
  comment: any;
};

export default function BlogPostCard({ comment }: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Link to={`/user/profile/${comment.userId._id}`} color="inherit" component={RouterLink}>
          <Avatar
            alt={comment.userId?.name}
            src={comment.userId?.avatar?.url}
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
            }}
          />
        </Link>
        <Image alt="cover" src={comment.image.url} ratio="4/3" />
      </Box>

      <PostContent comment={comment} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  comment: any;
};

export function PostContent({ comment }: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');


  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        ss
      </Typography>

      <TextMaxLine
        variant={isDesktop ?  "body1" : 'subtitle2'}
        line={4}
        persistent
      >
        {comment.comment}
      </TextMaxLine>
      {/* <Link  to={'/'} color="inherit" component={RouterLink}>
        <TextMaxLine
          variant={isDesktop? 'h5' : 'subtitle2'}
          line={2}
          persistent
        >
          {comment.comment}
        </TextMaxLine>
      </Link> */}

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
        <RatingStyle size='small' readOnly value={comment.rate} precision={0.1} />

      </Stack>
    </CardContent>
  );
}




// ----------------------------------------------------------------------
const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));


