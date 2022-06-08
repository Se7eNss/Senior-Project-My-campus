import React from 'react'
import { styled, Theme, SxProps } from '@mui/material/styles';
import { Card, CardContent, CardHeader,useTheme,alpha } from '@mui/material';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    zIndex: 99,
    position: 'absolute',
    right: theme.spacing(1.5),
    bottom: theme.spacing(3.5),
    boxShadow: theme.customShadows.z8,
    color: theme.palette.common.white,
}));

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 24;

const IconStyle = styled('svg')(({ theme }) => ({
    height: SIZE,
    width: SIZE,
    stroke: 'none',
}));

const BoxStyle = styled('div')(({ theme }) => ({
        background: alpha( theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,0.5),
        boxShadow: theme.customShadows.z8,
        padding: theme.spacing(1),
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        borderRadius: 4,
        border:`1px solid ${theme.palette.primary.main}`,
        display: 'flex',
        color:  theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
        flexDirection: 'column',
        gap: theme.spacing(1),
        
}));

const MapInfo = () => {
    const theme = useTheme();
    return (
        <RootStyle>
            <BoxStyle >
                <Box display={"flex"} gap="3px" >
                <IconStyle fill='green'>
                    <path d={ICON} />
                </IconStyle>
                Active
                </Box>
                <Box display={"flex"} gap="3px" >
                <IconStyle fill='yellow'>
                    <path d={ICON} />
                </IconStyle>
                Upcoming
                </Box>
                <Box display={"flex"} gap="3px">
                <IconStyle fill='red'>
                    <path d={ICON} />
                </IconStyle>
                Finished
                </Box>
                
            </BoxStyle>
        </RootStyle>
    )
}

export default MapInfo