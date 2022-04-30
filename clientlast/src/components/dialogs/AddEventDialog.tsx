import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { createEvent, resetError } from 'src/redux/slices/event';
import { dispatch, useSelector } from 'src/redux/store';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../hook-form'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

type Props = {
    e: any,
    open: boolean,
    setOpenDialog: Function
}


const AddEventDialog = ({ e, setOpenDialog, open }: Props) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const { enqueueSnackbar } = useSnackbar();
    const { error } = useSelector(state => state.event)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const DialogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        eventImage: Yup.string().required('Image is required'),
        eventDate: Yup.date().required('Date is required')
    });

    const defaultValues = {
        title: "",
        description: "",
        eventImage: "",
        eventDate: ""
    };

    const methods = useForm({
        resolver: yupResolver(DialogSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = methods;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                if (file) {
                    setValue(
                        "eventImage",
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                    setImage(reader.result)
                }
            };
            reader.readAsDataURL(file);
        },
        [setValue]
    );

    const onSubmit = async (data: any) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            data.eventImage = image
            const newData = {
                ...data,
                location: {
                    lat: e.lngLat[1],
                    long: e.lngLat[0]
                }
            }
            await dispatch(createEvent(newData))
                if (error) {
                    enqueueSnackbar('Something went wrong!', { variant: 'error' });
                    dispatch(resetError()) 
                }
                else {
                    enqueueSnackbar('Your Request Sended, Admin will review it!', { variant: 'success' });
                    reset();
                    setOpenDialog(false);
                }

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 600 } }}
            maxWidth="md"
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Yeni Etkinlik Ekle</DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ paddingBottom: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <RHFTextField name="title" label="Title" sx={{ mb: 2 }} />
                            <RHFTextField name="description" label="Description" sx={{ mb: 2 }} />
                            <RHFUploadSingleFile
                                name="eventImage"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                            />

                            <RHFTextField type="date" name="eventDate" sx={{ mb: 2 }} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ width: '50%' }} size="small" variant="contained" color='error' onClick={handleCloseDialog}>İPTAL</Button>
                    <LoadingButton variant="contained" size="small" sx={{ width: '50%', bgcolor: '#00AB55', '&:hover': { background: "#00AB55", }, }} type='submit' loading={isSubmitting} autoFocus>
                        KAYDET
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

export default AddEventDialog