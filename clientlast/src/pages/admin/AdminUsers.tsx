import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Container, LinearProgress, ThemeProvider, useTheme } from '@mui/material';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 ,hide: true,valueGetter: (params: GridValueGetterParams) => params.row._id },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    minWidth: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    minWidth: 150,
    editable: false,
  },
  {
    field: 'events',
    headerName: 'Events Count',
    flex: 1,
    minWidth: 50,
    editable: false,
  },
  {
    field: 'comments',
    headerName: 'Comments Count',
    flex: 1,
    minWidth: 50,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 50,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Banned',
    flex: 1,
    minWidth: 50,
    editable: true,
    type: 'singleSelect',
      valueOptions: [
        { value: true, label: "True" },
        { value: false, label: "False" },
      ],
      valueGetter: (params: GridValueGetterParams) => params.row.status ? "True" : "False",
  },
];

const AdminUsers = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [users,setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        
        const response = await axios.get(`/api/v1/admin/users`);

        if (response.status === 200) {
          const userss = response.data.users.map((user:any) => {
            return {
              ...user,
              id: user._id,
              events: user.events.length,
              comments: user.comments.length,
            }
          }
          )
          setUsers(userss)
        } else {
          enqueueSnackbar('Error', { variant: 'error' });
        }
      } catch (error) {
        
      }
    })();
  }, [])

  const handleCellEditCommit = async (params: any) => {
    console.log(params)
    const response = await axios.put(`/api/v1/admin/user/${params.id}/${params.value}`);
    if (response.status === 200) {
      enqueueSnackbar('Success', { variant: 'success' });
    }
    else {
      enqueueSnackbar('Error', { variant: 'error' });
    } 
  }

  return (
    <ThemeProvider theme={theme}  >
      <Page title="Users">
        <Container maxWidth={theme ? false : 'lg'}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={users}
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

export default AdminUsers