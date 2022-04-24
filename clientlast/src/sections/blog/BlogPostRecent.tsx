// @mui
import { Grid, Typography } from '@mui/material';

//
import BlogPostCard from './BlogPostCard';

// ----------------------------------------------------------------------

type Props = {
  events: any[];
};

export default function BlogPostRecent({ events }: Props) {
  return (
    <>
      {/* <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {events.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
}
