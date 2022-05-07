import { Avatar, AvatarGroup, Box, Chip, Dialog, DialogContent, DialogTitle, Rating, Tooltip, Typography, useTheme } from '@mui/material'
import MapGL from 'react-map-gl';
import React, { useState } from 'react'
import { MAPBOX_API } from '../../config';
import { MapControlMarker, MapControlPopup } from '../map';
import theme from 'src/theme';
import Image from 'src/components/Image';
import { height } from '@mui/system';


const ShowOnMapDialog = ({ open, setOpenDialog,event }: any) => {
    const theme = useTheme()
    console.log(event)
    const [viewport, setViewport] = useState({
        latitude:event.location.lat,
        longitude: event.location.long,
        zoom: 15.41,
        maxZoom: 18,
        minZoom: 14,
        pitch: 55,
        bearing: 170,
    });
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '70%', maxHeight: 495 } }}
            maxWidth="md"
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <MapGL
                    {...viewport}
                    mapStyle={`mapbox://styles/se7ens/cl0zepcpz00sv14qihkjuek5u?optimize=true`}
                    mapboxApiAccessToken={MAPBOX_API}
                    width="100%"
                    height="400px"
                    onViewportChange={setViewport}
                >
                    <MapControlMarker
                        e={event.title}
                        latitude={event.location.lat}
                        longitude={event.location.long}
                        status={event.status}
                    />
                     <MapControlPopup
                        longitude={event?.location.long}
                        latitude={event?.location.lat}
                        sx={{
                            '& .mapboxgl-popup-content': { bgcolor: theme.palette.background.default },
                            '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
                            '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
                            zIndex: 99,
                            cursor: 'pointer',
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Image src={event.eventImage.url} ratio="4/3" sx={{ borderRadius: 1.5 }} />
                        </Box>
                        <Typography variant="subtitle2" sx={{ m: 0.5 }}>
                            {event.title}
                        </Typography>
                        <Typography component="p" variant="caption" sx={{ m: 0.5 }}>
                            {event.description}
                        </Typography>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Tooltip title="Start Date" placement='right'>
                                <Typography component="p" variant="caption" sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
                                    {event.eventDate.substring(0, 10)+"--"+event.eventEndDate?.substring(0, 10)}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box p={1} display={'flex'} flexDirection="column" justifyContent={"center"} alignItems="center" gap={1}>
                            <Chip sx={{ cursor: "pointer" }} label={event.status} color={event.status === "Active" ? 'success' : 'warning'} size="small" />
                        </Box>
                    </MapControlPopup>
                </MapGL>
            </DialogContent>

        </Dialog>
    )
}

export default ShowOnMapDialog