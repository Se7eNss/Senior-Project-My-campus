import { Container, LinearProgress, ThemeProvider, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import AdminMoreMenu from 'src/components/dialogs/AdminMoreMenu'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import theme from 'src/theme'
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
      return <img src={params.row.image.url} width="100%"  />
    }
  },
  {
    field: 'eventId',
    headerName: 'Event',
    flex:1,
    minWidth: 50,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.row.eventId.title,
  },
  {
    field: 'comment',
    headerName: 'Comment',
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
  {
    field: 'user',
    headerName: 'Crearted By',
    flex: 1,
    minWidth: 50,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.row.userId.firstName +" "+ params.row.userId.lastName,
  },
  {
    field: '',
    headerName: '',
    width: 50,
    minWidth: 20,
    editable: false,
    renderCell: (params: any) => {
      return (
        <AdminMoreMenu types="comment" params={params}/>
      )
  }
}
];

const AdminComments = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [comments,setComments] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        
        const response = await axios.get(`/api/v1/admin/comments`);

        if (response.status === 200) {
          const commentss = response.data.comments.map((comment:any) => {
            return {
              ...comment,
              id: comment._id,
            }
          }
          )
          setComments(commentss)
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
            rows={comments}
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

export default AdminComments