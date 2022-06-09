import { ThemeProvider, useTheme } from '@emotion/react'
import { Container, LinearProgress } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import AdminMoreMenu from 'src/components/dialogs/AdminMoreMenu'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import axios from 'src/utils/axios'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 ,hide: true,valueGetter: (params: GridValueGetterParams) => params.row._id },
    
    {
        field: 'image',
        headerName: 'Image',
        flex: 1,
        minWidth: 150,
        editable: false,
        renderCell: (params: GridValueGetterParams) => {
            if(params.row.commentId){
                return <img src={params.row.commentId.image.url}
                width="100%"  />
            }else{
                return <img src={params.row.eventId.eventImage.url}
                width="100%"  />
            }
        }
      },
    {
      field: 'userId',
      headerName: 'User',
      flex: 1,
      minWidth: 150,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.userId.firstName +" "+ params.row.userId.lastName,
    },
    
    {
      field: `eventId'` || `commentId`,
      headerName: 'Event || Comment',
      flex:2,
      minWidth: 50,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
          if(params.row.eventId){
            return params.row.eventId.title
          }
          else{
            return params.row.commentId.comment
          }
      },
    },
    {
      field: 'note',
      headerName: 'Note',
      flex:2.0,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.createdAt.split('T')[0],
    },
  ];

const AdminReports = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [reports,setReports] = useState([]);
    useEffect(() => {
      (async () => {
        try {
          
          const response = await axios.get(`/api/v1/admin/reports`);
          const res = await axios.put("/api/v1/admin/reports/seen");
          if (response.status === 200) {
            const reportss = response.data.reports.map((report:any) => {
              return {
                ...report,
                id: report._id,
              }
            }
            )
            setReports(reportss)
          } else {
            enqueueSnackbar('Error', { variant: 'error' });
          }
        } catch (error) {
          
        }
      })();
    }, [])
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
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={reports}
            columns={columns}
            rowHeight={100} 
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

export default AdminReports