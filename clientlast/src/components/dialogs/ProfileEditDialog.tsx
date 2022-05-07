import { LoadingButton } from '@mui/lab'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button, Box, IconButton, InputAdornment, Stack } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar, RHFUploadSingleFile } from '../hook-form'
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createEvent, resetError } from 'src/redux/slices/event';
import { dispatch, useSelector } from 'src/redux/store';
import Iconify from '../Iconify';
import useAuth from 'src/hooks/useAuth';
import { updateProfile } from 'src/redux/slices/user';


type Props = {
    open: boolean,
    setOpenDialog: Function,
    profile: any,
}

const ProfileEditDialog = ({ setOpenDialog, open,profile }: Props) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const {error} = useSelector(state => state.profile)
    const {user} = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const DialogSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        avatar: Yup.string().required('Avatar is required'),
        faculty: Yup.string().required('Faculty is required'),
        facebook: Yup.string(),
        phone: Yup.string(),
        instagram: Yup.string(),
        twitter: Yup.string()
    });

    const defaultValues = {
        firstName:profile?.firstName || "",
        lastName:profile?.lastName || "",
        email:profile?.email || "",
        password: '' || "",
        phone:profile?.phone || "",
        avatar: profile?.avatar.url || "",
        faculty: profile?.faculty || "",
        facebook: profile?.facebook || "",
        instagram: profile?.instagram || "",
        twitter: profile?.twitter || ""
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
                        "avatar",
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
            data.id = user?._id;
            data.avatar = image;
            console.log(data)
            await dispatch(updateProfile(data));
            if (error === null) {
                enqueueSnackbar("Profile updated successfully", { variant: 'success' });
                handleCloseDialog();
            }
            else {
                enqueueSnackbar(error, { variant: 'error' });
                dispatch(resetError());
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
                    <Box>
                        <RHFUploadAvatar
                            sx={{ mb: 2 }}
                            name="avatar"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={handleDrop}
                        />
                        <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} gap={2}>
                            <Box width={1} display={"flex"} flexDirection={"column"} gap="10px">
                                <Stack direction={{ sm: 'row', xs: "column" }} spacing={1}>
                                    <RHFTextField name="firstName" label="First name" size='small' />
                                    <RHFTextField name="lastName" label="Last name" size='small' />
                                </Stack>
                                <RHFTextField fullWidth name="email" label="Email" size='small' />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} gap={2}>
                                <RHFTextField name="phone" label="Phone" size='small' />
                                <RHFSelect name="faculty" label="Faculty" size='small' InputLabelProps={{ shrink: true }}>
                                    <option value="">Select faculty</option>
                                    <option value="Faculty of Engineering">Faculty of Engineering</option>
                                    <option value="Faculty of Science">Faculty of Science</option>
                                    <option value="Faculty of Medicine">Faculty of Medicine</option>
                                    <option value="Faculty of Dentistry">Faculty of Dentistry</option>
                                    <option value="Faculty of Pharmacy">Faculty of Pharmacy</option>
                                    <option value="Faculty of Dentistry">Faculty of Dentistry</option>
                                    <option value="Faculty of Pharmacy">Faculty of Pharmacy</option>
                                </RHFSelect>
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} gap={2}>
                                <RHFTextField name="instagram" label="Instagram" size='small' />
                                <RHFTextField name="facebook" label="Facebook" size='small' />
                                <RHFTextField name="twitter" label="Twitter" size='small' />
                            </Box>
                        </Box>
                    </Box>

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

export default ProfileEditDialog