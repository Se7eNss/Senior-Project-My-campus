import { IconButton, Divider, MenuItem, Dialog } from '@mui/material'
import React, { useState } from 'react'
import Iconify from '../Iconify'
import MenuPopover from '../MenuPopover'
import ChangePWDialog from './ChangePWDialog'

type Props = {
    editDialog: boolean,
    setEditDialog: Function,
  }

const MoreMenu = ({ setEditDialog, editDialog }:Props) => {
    const [open, setOpen] = useState<HTMLElement | null>(null);
    const [openPW, setOpenPW] = useState(false);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    console.log(openPW);
    const profile = () => {
        setEditDialog(true);
    }

    const ICON = {
        mr: 1,
        width: 20,
        height: 20,
      };
    

    const handleClose = () => {
        setOpen(null);
    };
    return (
        <>
            <IconButton color="warning" sx={{zIndex:99}} size="large" onClick={handleOpen}>
                <Iconify icon={'eva:more-vertical-fill'} width={24} height={24} />
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                arrow="right-top"
                sx={{
                    mt: -0.5,
                    width: 160,
                    '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                }}
            >
                <MenuItem onClick={profile}>
                    <Iconify  icon={'eva:edit-2-outline'} sx={{ ...ICON }} />
                    Update Profile
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={()=>setOpenPW(true)}>
                    <Iconify icon={'carbon:password'} sx={{ ...ICON }} />
                    Change PW
                </MenuItem>
                <ChangePWDialog open={openPW} setOpenDialog={setOpenPW}/>
            </MenuPopover>

        </>
    )
}

export default MoreMenu