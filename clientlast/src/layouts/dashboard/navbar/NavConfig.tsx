// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  booking: getIcon('ic_booking'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  chat: getIcon('ic_chat'),
  report: getIcon('ic_report'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'My Campus',
    items: [
      { title: 'dashboard', path: '/admin/dashboard', icon: ICONS.dashboard },
      {
        title: 'Users',
        path: '/admin/users',
        icon: ICONS.user,
      },
      { title: 'Events', path: '/admin/events', icon: ICONS.booking },
      { title: 'Comments', path: '/admin/comments', icon: ICONS.chat },
      { title:"Reports",path:'/admin/reports',icon:ICONS.report},
    ],
  },
];

export default navConfig;
