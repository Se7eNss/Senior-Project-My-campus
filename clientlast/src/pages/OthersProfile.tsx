import { Card, Container, Grid, Stack, styled } from '@mui/material';
import { id } from 'date-fns/locale';
import React, { useEffect } from 'react'
import Page from 'src/components/Page'
import useAuth from 'src/hooks/useAuth';
import {getOthersProfile } from 'src/redux/slices/user';
import { dispatch, useSelector } from 'src/redux/store';
import { OProfileFollowInfo, OProfileAbout, OProfileSocialInfo, OProfilePostCard, OProfileCover } from 'src/sections/user/othersProfile';
import ProfilePostInput from 'src/sections/user/profile/ProfilePostInput';
import { _userAbout } from 'src/_mock';
import { useParams, useLocation } from 'react-router-dom';

const RootStyle = styled('div')(({ theme }) => ({
    height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

const OthersProfile = () => {
    const { id = '' } = useParams();
    const {other,comments} = useSelector(state => state.profile);
    useEffect(() => {
        dispatch(getOthersProfile(id))
    }, [])
    
    return (
        <Page title="Home">
            <RootStyle>
                <Container sx={{ mt: 10 }}>
                    <Card
                        sx={{
                            mb: 3,
                            height: 280,
                            position: 'relative',
                        }}
                    >
                        <OProfileCover />
                    </Card>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={3}>
                                <OProfileFollowInfo />
                                <OProfileAbout />
                                <OProfileSocialInfo />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Stack spacing={3}>
                                {other?.comments.map((post:any) => (
                                    <OProfilePostCard key={post.id} post={post} />
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </RootStyle>
        </Page>
    )
}

export default OthersProfile