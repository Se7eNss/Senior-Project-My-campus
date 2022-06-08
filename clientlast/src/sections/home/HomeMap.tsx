import React, { useEffect } from 'react'

import MapGL from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
// config
import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/Iconify';
import {
    MapControlPopup,
    MapControlMarker,
    MapControlScale,
    MapControlNavigation,
    MapControlGeolocate,
    MapInfo,
} from '../../components/map';
import { dispatch, useSelector } from 'src/redux/store';
import { getEventDetail, getEvents } from 'src/redux/slices/event';
import { Avatar, AvatarGroup, Badge, Box, Chip, Rating, Tooltip, Typography } from '@mui/material';
import Image from 'src/components/Image';
import AddEventDialog from 'src/components/dialogs/AddEventDialog';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import AlertDialog from 'src/components/dialogs/AlertDialog';
import { Comment } from 'src/@types/auth';
import { useNavigate } from 'react-router';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    zIndex: 1,
    height: 720,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
        display: 'none',
    },
}));

export type Tooltip = {
    _id: string;
    location: {
        lat: number,
        long: number
    },
    title: string,
    description: string,
    status: string,
    comments: Comment[],
    eventDate: string,
    eventEndDate: string,
    eventImage: {
        url: string,
        public_id: string
    },
    rate: number,
}

type Props = {
    viewport: any,
    setViewport: any
    setTooltip: any,
    tooltip: Tooltip
}

const HomeMap = ({ viewport, setViewport, setTooltip, tooltip }: Props) => {
    const { events } = useSelector(state => state.event)
    const { user } = useAuth();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [location, setLocation] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [alert, setAlert] = useState(false)


    useEffect(() => {
        if (viewport.longitude < 32.644340 || viewport.longitude > 32.663052 || viewport.latitude < 41.195887 || viewport.latitude > 41.217113) {
            setAlert(true)
        }
    }, [viewport])

    const handleDetail = async (event: any) => {
        await dispatch(getEventDetail(event))
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate(`/event/detail/${event}`)
    }

    useEffect(() => {
        dispatch(getEvents())
    }, [openDialog,dispatch])

    const handleDblClick = (e: any) => {
        if (user) {
            setLocation(e)
            setOpenDialog(true)
        } else {
            enqueueSnackbar('You have to logged in for add event!', { variant: 'error' });
        }
    }

    return (
        <RootStyle>
            <AddEventDialog e={location} setOpenDialog={setOpenDialog} open={openDialog} />
            <AlertDialog open={alert} setViewport={setViewport} setOpen={setAlert} />
            <MapGL
                {...viewport}
                onViewportChange={setViewport}
                mapStyle={`mapbox://styles/se7ens/cl0zepcpz00sv14qihkjuek5u?optimize=true`}
                mapboxApiAccessToken={MAPBOX_API}
                width="100%"
                height="100%"
                doubleClickZoom={false}
                onDblClick={handleDblClick}
            >
                <MapControlScale />
                <MapInfo/>
                {events?.map((e: any, i: any) => (
                    <MapControlMarker
                        e={e.title}
                        key={i}
                        latitude={e.location.lat}
                        longitude={e.location.long}
                        onClick={() => setTooltip(e)}
                        status={e.status}
                    />
                ))}
                {tooltip && (
                    <MapControlPopup
                        longitude={tooltip?.location.long}
                        latitude={tooltip?.location.lat}
                        onClose={() => setTooltip(null)}
                        onDoubleClick={() => handleDetail(tooltip._id)}
                        sx={{
                            '& .mapboxgl-popup-content': { bgcolor: theme.palette.background.default },
                            '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                            '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
                            zIndex: 99,
                            cursor: 'pointer'
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Image src={tooltip.eventImage.url} ratio="4/3" sx={{ borderRadius: 1.5 }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ m: 0.5 }}>
                            {tooltip.title}
                        </Typography>
                        <Typography component="p" variant="caption" sx={{ m: 0.5 }}>
                            {tooltip.description.slice(0, 70)}...
                        </Typography>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                {tooltip.comments.map((comment) => (
                                    comment.userId && (
                                        <Avatar sizes='10px' key={comment._id} alt={comment.userId.avatar && comment.userId.avatar.public_id} src={comment.userId.avatar ? comment.userId.avatar.url : 'ss'} />
                                    )
                                ))}
                            </AvatarGroup>
                            <Tooltip title="Start Date" placement='right'>
                                <Typography component="p" variant="caption" sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                                    {tooltip.eventDate.substring(0, 10)} <br /> {tooltip.eventEndDate?.substring(0, 10)}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box p={1} display={'flex'} flexDirection="column" justifyContent={"center"} alignItems="center" gap={1}>
                            <Rating precision={0.5} value={tooltip.rate} readOnly size="small" />
                            <Chip sx={{ cursor: "pointer" }} label={tooltip.status} color={tooltip.status === "Active" ? 'success' : tooltip.status === "Upcoming" ? 'warning' : "error"} size="small" />
                        </Box>
                    </MapControlPopup>
                )}
            </MapGL>
        </RootStyle>
    )
}


export default HomeMap