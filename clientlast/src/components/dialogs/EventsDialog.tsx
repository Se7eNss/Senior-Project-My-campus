import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button, Box, Typography, useTheme, AvatarGroup, Avatar, Rating } from '@mui/material'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { getEventDetail, setOpenEvents } from 'src/redux/slices/event'
import { dispatch, useSelector } from 'src/redux/store'
import { RHFTextField, RHFUploadSingleFile } from '../hook-form'
import Image from 'src/components/Image'
import Iconify from '../Iconify'
import { FlyToInterpolator } from 'react-map-gl'
import * as d3 from 'd3-ease';
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { randomNumberRange } from 'src/_mock/funcs'

const EventsDialog = ({ viewport, setViewport,tooltip,setTooltip,type }: any) => {
    const theme = useTheme()
    const navigate = useNavigate() 
    const {enqueueSnackbar} = useSnackbar()
    const { open, events } = useSelector(state => state.event)
    const handleCloseDialog = () => {
        dispatch(setOpenEvents(false))
    };
    const active = events.filter(event => event.status === type)
    
    const eventDetail = async(event: any) => {
        await dispatch(getEventDetail(event))
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate(`/event/detail/${event}`)
        handleCloseDialog();
    }

    const flyToLocation = (event: any) => {
        setViewport({
            ...viewport,
            latitude: event.location.lat,
            longitude: event.location.long,
            zoom: 17.41,
            maxZoom: 18.41,
            minZoom: 16,
            pitch: 55,
            bearing: randomNumberRange(160,190),
            transitionDuration: 3500,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: d3.easeCubic
        })
        setTooltip(event);
        handleCloseDialog();
    }

    return (
                <Grid container >
                    {active.length > 0 ? active.map((event: any) => (
                        <Box key={event._id} width={"100%"} display="flex" boxShadow={theme.shadows[8]}>
                            <Box width={1 / 3} p={2}>
                                <Image ratio="6/4" src={event.eventImage.url} />
                            </Box>
                            <Box display={"flex"} flexDirection="column" justifyContent="space-between" width={2 / 3} p={2}>
                                <Box display={"flex"} flexDirection="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{event.title}</Typography>
                                <Rating   value={event.rate} readOnly size="small" />
                                </Box>
                                <Typography variant="body1">{event.description}</Typography>
                                <Box alignSelf={"flex-end"} display="flex" gap="10px">
                                    <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                        {event?.comments.map((comment: any) => (
                                            comment.userId && (
                                                <Avatar sizes='10px' key={comment._id} alt={comment.userId.avatar && comment.userId.avatar.public_id} src={comment.userId.avatar ? comment.userId.avatar.url : 'ss'} />
                                            )
                                        ))}
                                    </AvatarGroup>
                                    <Button onClick={() => flyToLocation(event)} endIcon={<Iconify icon={"akar-icons:location"} />} variant="contained" color="primary">
                                        Show on Map
                                    </Button>
                                    <Button onClick={()=> eventDetail(event._id)} endIcon={<Iconify icon={"ic:baseline-details"} />} variant="contained" color="secondary">
                                        See Detail
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )):(
                        <Box p={2}>
                            <Typography variant="h6">No {type} Event</Typography>
                        </Box>
                    )}
                </Grid>
    )
}

export default EventsDialog