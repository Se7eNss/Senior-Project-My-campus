// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack } from '@mui/material'; // @types
import Iconify from 'src/components/Iconify';
// hooks
import useAuth from '../../../hooks/useAuth';
import { indexOf } from 'lodash';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------


export default function OProfileSocialInfo() {
  const {other} = useSelector(state => state.profile);

  const SOCIALS = [
    {
      name: 'Twitter',
      icon: <IconStyle icon={'eva:twitter-fill'} color="#1C9CEA" />,
      href: other?.twitter,
    },
    {
      name: 'Instagram',
      icon: <IconStyle icon={'ant-design:instagram-filled'} color="#D7336D" />,
      href: other?.instagram,
    },
    {
      name: 'Facebook',
      icon: <IconStyle icon={'eva:facebook-fill'} color="#1877F2" />,
      href: other?.facebook,
    },
  ];
  const social = SOCIALS.map(s => s.href != null).filter(Boolean).length > 0 ? true : false;
  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {social ? (SOCIALS.map((link) => (
          link.href &&(
            <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link href={`https://www.${link.name}.com/${link.href}`} target="_blank" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
          )
        ))):
        (
          <Stack spacing={2} sx={{ p: 3 }}>
            No Social Media
          </Stack>
        )
            
      }
      </Stack>
    </Card>
  );
}
