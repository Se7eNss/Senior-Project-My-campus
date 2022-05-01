import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------


export default function RegisterForm() {
  const { register } = useAuth();
  const [image, setImage] = useState<string | ArrayBuffer | null>()
  const isMountedRef = useIsMountedRef();
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    avatar: Yup.string().required('Avatar is required'),
    faculty: Yup.string().required('Faculty is required'),
    facebook: Yup.string(),
    phone: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string()
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: "",
    faculty: "",
    facebook: "",
    instagram: "",
    twitter: ""
  };

  const methods = useForm<any>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      data.avatar = image
      await register(data)
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError(error.errMessage);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Box display={"flex"} flexDirection="row" gap={2}>
            <RHFUploadAvatar
              name="avatar"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />

            <Box display={"flex"} flexDirection="column" gap="10px">
              <Stack direction={{ sm: 'row' }} spacing={1}>
                <RHFTextField name="firstName" label="First name" size='small' />
                <RHFTextField name="lastName" label="Last name" size='small' />
              </Stack>
              <RHFTextField fullWidth name="email" label="Email" size='small' />
              <RHFTextField
                fullWidth
                size='small'
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box mt={1}>
            <Box display={"flex"} flexDirection="row" gap={2}>
              <RHFTextField name="phone" label="Phone" size='small' />
              <RHFSelect name="faculty" label="Faculty" size='small'  InputLabelProps={{shrink:true}}>
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
            <Box display={"flex"} flexDirection="row" gap={2}>
              <RHFTextField name="instagram" label="Instagram" size='small' />
              <RHFTextField name="facebook" label="Facebook" size='small' />
              <RHFTextField name="twitter" label="Twitter" size='small' />
            </Box>
          </Box>
        </Box>







        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
