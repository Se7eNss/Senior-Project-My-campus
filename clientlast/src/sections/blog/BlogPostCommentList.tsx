// @mui
import { Box, Grid, List } from '@mui/material';
import BlogPostCard from './BlogPostCard';

//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

type Props = {
 event: any;
 before:number,
 page:number,
};


export default function BlogPostCommentList({ event,page,before }: Props) {


  return (
    <Grid container spacing={2} sx={{display:"flex", flexDirection:"row",gap:3}}>
      {event?.comments.slice(before,page).map((comment:any) => {
        return (
          <Grid item md={3.8} key={comment?._id} sx={{width:1/2}}>
            <BlogPostCard comment={comment}/>
          </Grid>
        );
      })}
    </Grid>
  );
}
