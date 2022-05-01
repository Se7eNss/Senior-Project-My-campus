import { Popup, PopupProps } from 'react-map-gl';
// @mui
import { Theme, styled, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

const PopupStyle = styled(Popup)(({ theme }) => {
  const isRTL = theme.direction === 'rtl';

  return {
    '& .mapboxgl-popup-content': {
      maxWidth: 200,
      width:190,
      padding:0,
      color: theme.palette.text.secondary,
      boxShadow: theme.customShadows.z20,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
    },
    '& .mapboxgl-popup-close-button': {
      width: 24,
      height: 24,
      fontSize: 16,
      opacity: 0.6,
      color:"white",
      right: isRTL && '0',
      left: isRTL && 'auto',
      zIndex:99,
      '&:hover': {
        opacity: 1,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
      marginBottom: -1,
      borderBottomColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-right .mapboxgl-popup-tip': {
      marginLeft: -1,
      borderLeftColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
      marginTop: -1,
      borderTopColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-left .mapboxgl-popup-tip': {
      marginRight: -1,
      borderRightColor: theme.palette.grey[800],
    },
  };
});

interface MapControlPopupProps extends PopupProps {
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export default function MapControlPopup({ onClose, sx, children, ...other }: MapControlPopupProps) {
  return (
    <PopupStyle
      tipSize={8}
      anchor="bottom"
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      sx={sx}
      {...other}
    >
      {children}
    </PopupStyle>
  );
}
