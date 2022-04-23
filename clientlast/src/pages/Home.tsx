// @mui
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import EventsDialog from 'src/components/dialogs/EventsDialog';
import { getEvents } from 'src/redux/slices/event';
import { dispatch } from 'src/redux/store';
import { ContactMap } from 'src/sections/contact';
import HomeMap from 'src/sections/home/HomeMap';
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
  return (
    <Page title="Home">
      <RootStyle>
        <ContentStyle>
          <EventsDialog/>
          <HomeMap/>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
