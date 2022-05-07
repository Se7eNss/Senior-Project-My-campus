import { IconButton, MenuItem, Divider } from '@mui/material'
import React, { useState } from 'react'
import { ICON } from 'src/config'
import Iconify from '../Iconify'
import MenuPopover from '../MenuPopover'
import AdminDeleteDialog from './AdminDeleteDialog'
import ChangePWDialog from './ChangePWDialog'
import ShowOnMapDialog from './ShowOnMapDialog'

const AdminMoreMenu = ({ params, types }: any) => {
    const [open, setOpen] = useState<HTMLElement | null>(null);
    const [openMap, setOpenMap] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };
    console.log(types)

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
            <AdminDeleteDialog open={openDelete} post={params.row} setOpen={setOpenDelete} types={types} />
            <IconButton color="warning" sx={{ zIndex: 99 }} size="large" onClick={handleOpen}>
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

                <MenuItem onClick={() => setOpenDelete(true)} >
                    <Iconify color={"red"} icon={'fluent:delete-16-regular'} sx={{ ...ICON }} />
                    Delete {types === "event" ? "event" : "comment"}

                </MenuItem>

                {types === "event" &&
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <MenuItem onClick={() => setOpenMap(true)}>
                            <Iconify icon={'bxs:map-pin'} sx={{ ...ICON }} />
                            Show Location
                        </MenuItem>
                        <ShowOnMapDialog open={openMap} setOpenDialog={setOpenMap} event={params.row} />
                    </>
                }

            </MenuPopover>

        </>
    )
}

export default AdminMoreMenu