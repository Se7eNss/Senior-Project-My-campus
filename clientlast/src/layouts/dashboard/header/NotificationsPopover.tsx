import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState<any>([]);
  const [notificationsReport, setNotificationsReport] = useState<any>([]);
  const totalUnRead = notifications?.filter((item:any) => item.seenByAdmin === false).length + notificationsReport?.filter((item:any) => item.seenByAdmin === false).length;

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        
        const response = await axios.get(`/api/v1/admin/events/unseen`);
        const responseReports = await axios.get(`/api/v1/admin/reports/unseen`);
        if (response.status === 200) {
          const eventss = response.data.events.map((event:any) => {
            return {
              ...event,
            }
          }
          )
          setNotifications(eventss)
        } else {
          enqueueSnackbar('Error', { variant: 'error' });
        }
        if (responseReports.status === 200) {
          const reportss = responseReports.data.reports.map((report:any) => {
            return {
              ...report,
            }
          }
          )
          setNotificationsReport(reportss)
        } else {
          enqueueSnackbar('Error', { variant: 'error' });
        }
      } catch (error) {
        
      }
    })();
  }, [open, ])

  const handleOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
      {
        notifications.length > 0 ?
        <>
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New Events
              </ListSubheader>
            }
          >
            {notifications.map((notification:any,i:any) => (
              <NotificationItem key={i} notification={notification} />
            ))}

          
          </List>

        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
        </> :
        <Box sx={{ p: 2.5, textAlign: 'center' }}>
          <Typography variant="body2">No new events</Typography>
        </Box>
      }
        {
        notificationsReport.length > 0 ?
        <>
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New Reports
              </ListSubheader>
            }
          >
            {notificationsReport.map((notification:any,i:any) => (
              <NotificationItem type={"report"} key={i} notification={notification} />
            ))}

          
          </List>

        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
        </> :
        <Box sx={{ p: 2.5, textAlign: 'center' }}>
          <Typography variant="body2">No new Report</Typography>
        </Box>
      }
 

      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  seenByAdmin: boolean;
};

function NotificationItem({ notification,type }:any) {
  return (
    <ListItemButton
      component={RouterLink}
      to={type === "report" ? `/admin/reports` : `/admin/events`}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.seenByAdmin && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {type === 'report' ?
        <Avatar src={ notification.userId?.avatar?.url} sx={{ bgcolor: 'background.neutral' }}></Avatar>
        :
        <Avatar src={ notification.user?.avatar?.url} sx={{ bgcolor: 'background.neutral' }}></Avatar>
        }
        
      </ListItemAvatar>
      <ListItemText
        primary={notification.note}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: NotificationItemProps) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
