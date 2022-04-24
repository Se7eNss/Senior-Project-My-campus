import { Box, Card, Container, Divider, Pagination, styled, Typography, useTheme } from '@mui/material';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Markdown from 'src/components/Markdown';
import Page from 'src/components/Page'
import { getEventDetail } from 'src/redux/slices/event';
import { dispatch, useSelector } from 'src/redux/store'
import { BlogPostHero, BlogPostTags, BlogPostCommentList, BlogPostCommentForm } from 'src/sections/blog';
import { fNumber } from 'src/utils/formatNumber';
const RootStyle = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
}));

const EventDetail = () => {
    const theme = useTheme()
    const [page, setPage] = useState(3)
    const [before, setBefore] = useState(0)
    const { event } = useSelector(state => state.event)
    const { id = "" } = useParams()
    console.log(before, page);
    useEffect(() => {
        dispatch(getEventDetail(id))
    }, [])

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value*3)
        setBefore(value*3-3)
    }

    return (
        <Page title='Event Detail'>
            <RootStyle>
                <Container>
                    <Card>
                        <BlogPostHero event={event} />

                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <Typography variant="h6" sx={{ mb: 5 }}>
                                {event?.description}
                            </Typography>

                            {/* <Markdown children={post.body} /> */}

                            {/* <Box sx={{ my: 5 }}>
                                <Divider />
                                <BlogPostTags post={post} />
                                <Divider />
                            </Box> */}

                            <Box sx={{ display: 'flex', mb: 2 }}>
                                <Typography variant="h4">Comments</Typography>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                    ({event?.comments.length})
                                </Typography>
                            </Box>

                            <BlogPostCommentList event={event} page={page} before={before} />

                            <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Pagination onChange={handlePage} count={event?.comments ? event.comments.length % 3 > 0  ? parseInt(numeral(event?.comments.length / 3).format())+1 :event.comments.length / 3  : 0 } color="primary" />
                            </Box>

                            <BlogPostCommentForm id={id}/>
                        </Box>
                    </Card>
                </Container>
            </RootStyle>
        </Page>
    )
}

export default EventDetail