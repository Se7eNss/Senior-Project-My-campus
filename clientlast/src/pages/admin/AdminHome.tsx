import { Container, Grid, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import Page from 'src/components/Page'
import useAuth from 'src/hooks/useAuth'
import useSettings from 'src/hooks/useSettings'
import user from 'src/redux/slices/user'
import { AppWelcome, AppFeatured, AppWidgetSummary } from 'src/sections/app'
import theme from 'src/theme'
import axios from 'src/utils/axios'

const AdminHome = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  const { themeStretch } = useSettings();
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [comments, setComments] = useState([])
  console.log(comments)
  const totalEvents = events.reduce((acc, cur:any) => acc + cur.count, 0)
  const totalComments = comments.reduce((acc, cur:any) => acc + cur.count, 0)
  const totalUsers = users.reduce((acc, cur:any) => acc + cur.count, 0)

  useEffect(() => {
    (async () => {
      try {

        const response = await axios.get(`/api/v1/admin/users/groupedbycreatedDates`);

        if (response.status === 200) {
          const eventss = response.data.events.map((event:any) => {
            return {
              ...event,
            }
          }
          )
          setEvents(eventss)
          const userss = response.data.users.map((user:any) => {
            return {
              ...user,
            }
          }
          )
          setUsers(userss)
          const commentss = response.data.comments.map((comment:any) => {
            return {
              ...comment,
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
    <Page title="General: App">
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome displayName={user?.lastName} />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppFeatured />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={2.6}
            total={totalUsers}
            chartColor={theme.palette.primary.main}
            chartData={users.map((user:any) => user.count)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Events"
            percent={0.2}
            total={totalEvents}
            chartColor={theme.palette.chart.blue[0]}
            chartData={events.map((event:any) => event.count)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Comments"
            percent={1.1}
            total={totalComments}
            chartColor={theme.palette.chart.red[0]}
            chartData={comments.map((comment:any) => comment.count)}
          />
        </Grid>
      </Grid>
    </Container>
  </Page>
  )
}

export default AdminHome