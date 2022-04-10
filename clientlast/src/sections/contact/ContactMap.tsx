import MapGL from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// _mock
import { _mapContact } from '../../_mock';
// config
import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/Iconify';
import {
  MapControlPopup,
  MapControlMarker,
  MapControlScale,
  MapControlNavigation,
} from '../../components/map';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: -1,
  height: 720,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

type CountryData = {
  latlng: number[];
  address: string;
  phoneNumber: string;
};

export default function ContactMap() {
  const { events } = useSelector(state => state.event)
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [tooltip, setTooltip] = useState<object>({});
  const [location, setLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 41.215,
    longitude: 32.653,
    zoom: 16.41,
    maxZoom: 18,
    minZoom: 16, 
    pitch: 55,
    bearing: 170,
  });

  const handleDblClick = (e:any) =>{
    setLocation(e)
    setOpenDialog(true)
  }

  return (
    <RootStyle>
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
        <MapControlNavigation />

        {events?.map(({e, i}:any) => (
          <MapControlMarker
            key={i}
            latitude={e.location.lat}
            longitude={e.location.long}
            onClick={() => setTooltip(e)}
          />
        ))}

        {/* {tooltip && (
         <MapControlPopup
         longitude={tooltip.location.long}
         latitude={tooltip.location.lat}
         onClose={() => setTooltip(null)}
         sx={{
           '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
           '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
           '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
           zIndex:4,
         }}
       >
         <Box sx={{ position: 'relative',height:'100%'}}>
           <Image src="https://minimal-assets-api.vercel.app/assets/images/members/member-2.jpg" ratio="1/1" sx={{ borderRadius: 1.5 }} />
         </Box>
         <Typography variant="subtitle2" sx={{ m: 0.5 }}>
           {tooltip.title}
         </Typography>
         <Typography component="p" variant="caption" sx={{ m: 0.5 }}>
           {tooltip.description}
         </Typography>

         <Typography component="p" variant="caption" sx={{ m: 1, display: 'flex', alignItems: 'center' }}>
           {tooltip.desc}
         </Typography>
       </MapControlPopup>
        )} */}
      </MapGL>
    </RootStyle>
  );
}
