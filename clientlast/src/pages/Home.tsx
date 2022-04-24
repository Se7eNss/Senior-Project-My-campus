// @mui
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import EventsDialog from 'src/components/dialogs/EventsDialog';
import { getEvents } from 'src/redux/slices/event';
import { dispatch } from 'src/redux/store';
import { ContactMap } from 'src/sections/contact';
import HomeMap, { Tooltip } from 'src/sections/home/HomeMap';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const [openDialog, setOpenDialog] = useState(false)
  useEffect(() => {
    dispatch(getEvents())
  }, [])
  const [tooltip, setTooltip] = useState<any | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 41.215,
    longitude: 32.653,
    zoom: 16.41,
    maxZoom: 18,
    minZoom: 16,
    pitch: 55,
    bearing: 170,
});
  return (
    <Page title="Home">
      <RootStyle>
        <ContentStyle>
          <EventsDialog viewport={viewport} setViewport={setViewport}  tooltip={tooltip} setTooltip={setTooltip}/>
          <HomeMap viewport={viewport} setViewport={setViewport} tooltip={tooltip} setTooltip={setTooltip} />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
