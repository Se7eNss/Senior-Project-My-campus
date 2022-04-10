import { Card, Container, Grid, Stack, styled } from '@mui/material';
import React, { useEffect } from 'react'
import Page from 'src/components/Page'
import useAuth from 'src/hooks/useAuth';
import { getCommentsForUser, getProfile } from 'src/redux/slices/user';
import { dispatch, useSelector } from 'src/redux/store';
import { ProfileFollowInfo, ProfileAbout, ProfileSocialInfo, ProfilePostCard, ProfileCover } from 'src/sections/user/profile';
import ProfilePostInput from 'src/sections/user/profile/ProfilePostInput';
import { _userAbout } from 'src/_mock';

const RootStyle = styled('div')(({ theme }) => ({
    height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

const Profile = () => {
    const { user } = useAuth();
    console.log(user)
    const {profile,comments} = useSelector(state => state.profile);
    useEffect(() => {
        dispatch(getProfile())
        dispatch(getCommentsForUser(user?._id))
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
                        <ProfileCover />
                    </Card>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={3}>
                                <ProfileFollowInfo />
                                <ProfileAbout />
                                <ProfileSocialInfo />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Stack spacing={3}>
                                {comments?.map((post:any) => (
                                    <ProfilePostCard key={post.id} post={post} />
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </RootStyle>
        </Page>
    )
}

export default Profile