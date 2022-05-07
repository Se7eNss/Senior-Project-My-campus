import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbar } from '@mui/x-data-grid';
import { Container, IconButton, LinearProgress, ThemeProvider, useTheme } from '@mui/material';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import MoreMenu from 'src/components/dialogs/MoreMenu';
import AdminMoreMenu from 'src/components/dialogs/AdminMoreMenu';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 ,hide: true,valueGetter: (params: GridValueGetterParams) => params.row._id },
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    minWidth: 150,
    editable: false,
  },
  {
    field: 'eventDate',
    headerName: 'Date',
    flex: 1,
    minWidth: 150,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.row.eventDate.split('T')[0],
  },
  {
    field: 'comments',
    headerName: 'Comments Count',
    flex:0.5,
    minWidth: 50,
    editable: false,
  },
  {
    field: 'note',
    headerName: 'Note From User',
    flex: 1.5,
    minWidth: 150,
    editable: false,
  },
  {
    field: 'user',
    headerName: 'Crearted By',
    flex: 1,
    minWidth: 50,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.row.user.firstName +" "+ params.row.user.lastName,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 50,
    editable: true,
    type: 'singleSelect',
      valueOptions: [
        { value: "Pending", label: "Pending" },
        { value: "Active", label: "Active" },
        { value: "Upcoming", label: "Upcoming" },
        { value: "Finished", label: "Finished" },
      ],
  },
  {
    field: '',
    headerName: '',
    width: 50,
    minWidth: 20,
    editable: false,
    renderCell: (params: any) => {
      return (
        <AdminMoreMenu types="event" params={params}/>
      )
  }
}
];

const AdminEvents = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [events,setEvents] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        
        const response = await axios.get(`/api/v1/admin/events`);

        if (response.status === 200) {
          const eventss = response.data.events.map((event:any) => {
            return {
              ...event,
              id: event._id,
              comments: event.comments.length,
            }
          }
          )
          setEvents(eventss)
        } else {
          enqueueSnackbar('Error', { variant: 'error' });
        }
      } catch (error) {
        
      }
    })();
  }, [])

  const handleCellEditCommit = async (params: any) => {
    console.log(params)
    const response = await axios.put(`/api/v1/admin/event/${params.id}/${params.value}`);
    if (response.status === 200) {
      enqueueSnackbar('Success', { variant: 'success' });
    }
    else {
      enqueueSnackbar('Error', { variant: 'error' });
    } 
  }

  return (
    <ThemeProvider theme={theme}  >
    <Page title="Events">
      <Container maxWidth={theme ? false : 'lg'}>
      <HeaderBreadcrumbs
            sx={{ flexDirection: { xs: 'colunm', sm: 'row' } }}
            heading=""
            links={[
              {name: 'Dashboard',href: '/admin'},
              { name:  "Events"},
            ]}
          />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={events}
            columns={columns}
            onCellEditCommit={handleCellEditCommit}
            pageSize={5}
            rowsPerPageOptions={[5]}

            disableSelectionOnClick
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: () => <GridToolbar />,
            }}
          />
        </div>
      </Container>
    </Page>
  </ThemeProvider>
  )
}

export default AdminEvents