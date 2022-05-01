// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ types , ...other }: AvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      types={types}
      src={types==="me"? user?.avatar.url : types }
      alt={user?.avatar.public_id}
      color={user?.avatar.url ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
