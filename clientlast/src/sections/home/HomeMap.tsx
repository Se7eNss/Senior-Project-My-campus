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
} from '../../components/map';
import { dispatch, useSelector } from 'src/redux/store';
import { getEvents } from 'src/redux/slices/event';
import { Avatar, AvatarGroup, Badge, Box, Chip, Tooltip, Typography } from '@mui/material';
import Image from 'src/components/Image';
import AddEventDialog from 'src/components/dialogs/AddEventDialog';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import AlertDialog from 'src/components/dialogs/AlertDialog';
import { Comment } from 'src/@types/auth';


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

type Tooltip = {
    location: {
        lat: number,
        long: number
    },
    title: string,
    description: string,
    status: string,
    comments: Comment[],
    eventDate: string
}

const HomeMap = () => {
    const { events } = useSelector(state => state.event)
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [location, setLocation] = useState(null);
    const [tooltip, setTooltip] = useState<Tooltip | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [alert, setAlert] = useState(false)
    const [viewport, setViewport] = useState({
        latitude: 41.215,
        longitude: 32.653,
        zoom: 16.41,
        maxZoom: 18,
        minZoom: 16,
        pitch: 55,
        bearing: 170,
    });

    useEffect(() => {
        if (viewport.longitude < 32.644340 || viewport.longitude > 32.663052 || viewport.latitude < 41.195887 || viewport.latitude > 41.217113) {
            setAlert(true)
        }
    }, [viewport])



    useEffect(() => {
        dispatch(getEvents())
    }, [openDialog])

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
                {events?.map((e: any, i: any) => (
                    <MapControlMarker
                        key={i}
                        latitude={e.location.lat}
                        longitude={e.location.long}
                        onClick={() => setTooltip(e)}
                    />
                ))}
                {tooltip && (
                    <MapControlPopup
                        longitude={tooltip?.location.long}
                        latitude={tooltip?.location.lat}
                        onClose={() => setTooltip(null)}
                        sx={{
                            '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
                            '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                            '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
                            zIndex: 4,
                        }}
                    >
                        <Box sx={{ position: 'relative', height: '100%' }}>
                            <Image src="https://minimal-assets-api.vercel.app/assets/images/members/member-2.jpg" ratio="1/1" sx={{ borderRadius: 1.5 }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ m: 0.5 }}>
                            {tooltip.title}
                        </Typography>
                        <Typography component="p" variant="caption" sx={{ m: 0.5 }}>
                            {tooltip.description}
                        </Typography>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                {tooltip.comments.map((comment) => (
                                    comment.userId && (
                                        <Avatar sizes='10px' key={comment._id} alt={comment.userId.avatar && comment.userId.avatar.public_id} src={comment.userId.avatar ? comment.userId.avatar.url : 'ss'} />
                                    )
                                ))}
                            </AvatarGroup>
                            <Tooltip title="Start Date"  placement='right'>
                            <Typography component="p" variant="caption" sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                                {tooltip.eventDate.substring(0, 10)} 
                            </Typography>
                            </Tooltip>
                        </Box>
                        <Box p={1} display={'flex'} justifyContent={'center'} >
                        <Chip label={tooltip.status} color={tooltip.status === "Active" ? 'success' : 'warning'} size="small" />
                        </Box>            
                        
                    </MapControlPopup>
                )}
            </MapGL>
        </RootStyle>
    )
}


export default HomeMap