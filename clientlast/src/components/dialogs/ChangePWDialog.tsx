import { Dialog, DialogTitle, DialogContent, InputAdornment, IconButton, DialogActions, Button } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, RHFTextField } from '../hook-form'
import Iconify from '../Iconify'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';

type Props = {
    open: boolean;
    setOpenDialog: any;
  };

const ChangePWDialog = ({ open, setOpenDialog }: Props) => {
    const { enqueueSnackbar } = useSnackbar();


    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
    
    const DialogSchema = Yup.object().shape({
      oldPassword: Yup.string().required("Old Password is required"),
      password: Yup.string().required("New Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
  
    const defaultValues = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
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
      try {
        const response = await axios.put('/api/v1/password/update', data);
        if(response.status === 200){
          enqueueSnackbar('Update Success');
        }else{
        enqueueSnackbar(response.data.errMessage, { variant: 'error' });
        reset()
        }
    } catch (error) {
        enqueueSnackbar(error.errMessage, { variant: 'error' });
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
      <DialogTitle>Change Password</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <RHFTextField
            sx={{ marginBottom: '20px' }}
            name="oldPassword"
            label='Old Password'
            type={showOldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                    <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            sx={{ marginBottom: '20px' }}
            name="password"
            label='New Password'
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                    <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            sx={{ marginBottom: '20px' }}
            name="confirmPassword"
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{}}>
          <Button sx={{ width: '50%' }} variant="contained" color='error' onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" sx={{ width: '50%'}} type='submit' autoFocus>
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default ChangePWDialog