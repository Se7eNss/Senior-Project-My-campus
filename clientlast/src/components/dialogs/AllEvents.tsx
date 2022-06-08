import { Dialog, Typography, Tabs, Tab, Box } from '@mui/material';
import { capitalCase } from 'change-case';
import React, { useState } from 'react'
import { setOpenEvents } from 'src/redux/slices/event';
import { dispatch, useSelector } from 'src/redux/store';
import Iconify from '../Iconify';
import EventsDialog from './EventsDialog';

const AllEvents = ({ viewport, setViewport,tooltip,setTooltip }: any) => {
    const { open, events } = useSelector(state => state.event)
    const [currentTab, setCurrentTab] = useState("Active");

    const handleCloseDialog = () => {
        dispatch(setOpenEvents(false))
    };
    
    const TABS = [
        {
            value:"Active",
            icon: <Iconify icon={'ic:baseline-view-agenda'} width={20} height={20} />,
            component: (
                <EventsDialog viewport={viewport} setViewport={setViewport}  tooltip={tooltip} setTooltip={setTooltip} type={"Active"} />
            ),
        },
        {
            value:"Upcoming",
            icon: <Iconify icon={'ic:baseline-view-agenda'} width={20} height={20} />,
            component: (
                <EventsDialog viewport={viewport} setViewport={setViewport}  tooltip={tooltip} setTooltip={setTooltip} type={"Upcoming"} />
            ),
        },
        {
            value:"Finished",
            icon: <Iconify icon={'ic:baseline-view-agenda'} width={20} height={20} />,
            component: (
                <EventsDialog viewport={viewport} setViewport={setViewport}  tooltip={tooltip} setTooltip={setTooltip} type={"Finished"} />
            ),
        },
    ];
  return (
    <Dialog
    sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 600 }, display: 'flex', justifyContent: 'center', padding: 10 }}
    maxWidth="md"
    open={open}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>   
    <Typography margin={'20px 0 0 20px'} variant={'h5'}>{'Events'}</Typography>
    <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
        sx={{ margin: '5px 20px 0px 20px'}}
    >

        {TABS.map((tab) => (
            <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.value)}
                icon={tab.icon}
                value={tab.value}
            />
        ))}
    </Tabs>
    {TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
    })}
    </Dialog>
  )
}

export default AllEvents