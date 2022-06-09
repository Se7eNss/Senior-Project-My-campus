import { Dialog, DialogTitle, DialogContent, InputAdornment, IconButton, DialogActions, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import React from 'react'
import { FormProvider, RHFTextField } from '../hook-form'
import Iconify from '../Iconify'

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'
import axios from 'src/utils/axios'
import useAuth from 'src/hooks/useAuth'

type Props = {
    open: boolean;
    setOpenDialog: any;
    id: string;
    type: string;
};

const ReportDialog = ({ open, setOpenDialog, id, type }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const DialogSchema = Yup.object().shape({
        note: Yup.string().required("Note is required"),
    });

    const defaultValues = {
        note: '',
    }


    const methods = useForm<any>({
        resolver: yupResolver(DialogSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;



    const onSubmit = async (data: any) => {
        data.userId = user?._id;
        try {
            if (type === "event") {
                const response = await axios.post(`/api/v1/report/event/${id}`, data);
                if (response.status === 200) {
                    enqueueSnackbar('Reported Comment,Admin will review it', { variant: 'success' });
                }
            } else {
                const response = await axios.post(`/api/v1/report/comment/${id}`, data);
                if (response.status === 200) {
                    enqueueSnackbar('Reported Comment,Admin will review it', { variant: 'success' });
                }
            }
            reset()
        } catch (error) {
            enqueueSnackbar(error, { variant: 'error' });
            reset()
        }
        setOpenDialog(false);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '70%', maxHeight: 495 } }}
            maxWidth="sm"
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Report Event</DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <RHFTextField
                        sx={{ marginBottom: '20px' }}
                        multiline
                        rows={4}
                        name="note"
                        label='Note'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Iconify icon={"arcticons:note-it"} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{}}>
                    <Button sx={{ width: '50%' }} variant="contained" color='error' onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" sx={{ width: '50%' }} type='submit' autoFocus>
                        Report
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

export default ReportDialog