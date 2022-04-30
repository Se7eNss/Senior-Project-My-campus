import { Card, CardHeader, Box, Typography, IconButton, Stack, Chip, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eve } from 'src/@types/event'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import Iconify from 'src/components/Iconify'
import MyAvatar from 'src/components/MyAvatar'
import { getEventDetail } from 'src/redux/slices/event'
import { dispatch } from 'src/redux/store'
import { fDate } from 'src/utils/formatTime'
import Image from '../../../components/Image';

const ProfileEventCard = ({ eve }: any) => {
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate();
    const handleDelete = async () => {
        setOpenDialog(true)
    };

    const handleDetail = async () => {
        await dispatch(getEventDetail(eve._id))
        navigate(`/event/detail/${eve._id}`);
    }
    return (
        <Card>
            <DeleteDialog open={openDialog} setOpen={setOpenDialog} post={eve} type="event" />
            <CardHeader
                disableTypography
                avatar={<MyAvatar />}
                title={
                    <Box sx={{ cursor: "pointer" }} onClick={handleDetail}>
                        <Typography variant="subtitle2" color="text.primary" >
                            {eve.title}
                        </Typography>
                    </Box>
                }
                subheader={
                    <>
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                            {eve.createdAt != undefined ? fDate(eve.createdAt) : eve.createdAt}
                        </Typography>
                    </>
                }
                action={
                    <>
                    <Tooltip title={eve.status === "Active" ? " Active Now " :"Waiting For Admin Permission"}>
                    <Chip label={eve.status} color={eve.status === "Active" ? 'success' : 'warning'} size="small" />
                    </Tooltip>
                    <IconButton onClick={handleDelete}>
                        <Iconify color={"red"} icon={'fluent:delete-20-regular'} width={20} height={20} />
                    </IconButton>
                    </>
                }
            />

            <Stack spacing={3} sx={{ p: 3 }}>
                <Typography>{eve.message}</Typography>

                <Image alt="eve media" src={eve.eventImage ? eve.eventImage.url : `SS`} ratio="1/1" sx={{ borderRadius: 1 }} />
                <Typography>{eve.description}</Typography>
                {/* <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
          {post.personLikes.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup> */}
                <Box sx={{ flexGrow: 1 }} />
            </Stack>

        </Card>
    )
}

export default ProfileEventCard