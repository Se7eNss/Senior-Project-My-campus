import { Card, Container, Grid, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import ProfileEditDialog from 'src/components/dialogs/ProfileEditDialog';
import Page from 'src/components/Page'
import useAuth from 'src/hooks/useAuth';
import { getCommentsForUser, getProfile } from 'src/redux/slices/user';
import { dispatch, useSelector } from 'src/redux/store';
import { ProfileFollowInfo, ProfileAbout, ProfileSocialInfo, ProfilePostCard, ProfileCover, ProfileEventInfo } from 'src/sections/user/profile';
import ProfileEventCard from 'src/sections/user/profile/ProfileEventCard';
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
    const [active, setActive] = useState("joined")
    const { profile, comments } = useSelector(state => state.profile);
    const [editDialog, setEditDialog] = useState(false)


    const handleEditDialog = () => {
      setEditDialog(true)
    };
    useEffect(() => {
        dispatch(getProfile())
        dispatch(getCommentsForUser(user?._id))
    }, [active, ])

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
                    >{
                        profile &&  <ProfileEditDialog open={editDialog} setOpenDialog={setEditDialog} profile={profile} />
                    }
                        
                        <ProfileCover editDialog={editDialog} setEditDialog={setEditDialog} />
                    </Card>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={3}>
                                <Box sx={{ cursor: "pointer" }} onClick={() => setActive("joined")}>
                                    <ProfileFollowInfo active={active} />
                                </Box>
                                <Box sx={{ cursor: "pointer" }} onClick={() => setActive("created")}>
                                    <ProfileEventInfo active={active} />
                                </Box>
                                <ProfileAbout />
                                <ProfileSocialInfo />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            {active === "joined" ? (
                                <Stack spacing={3}>
                                    {comments?.map((post: any,i:any) => (
                                        <ProfilePostCard key={i} post={post} />
                                    ))}
                                </Stack>) : (
                                <Stack spacing={3}>
                                    {profile?.events?.map((eve,i:any) => (
                                        <ProfileEventCard key={i} eve={eve} />
                                    ))}
                                    
                                </Stack>
                            )}

                        </Grid>
                    </Grid>
                </Container>
            </RootStyle>
        </Page>
    )
}

export default Profile