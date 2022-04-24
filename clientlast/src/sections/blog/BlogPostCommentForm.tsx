import * as Yup from 'yup';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Rating, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
import { useCallback, useState } from 'react';
import { dispatch, useSelector } from 'src/redux/store';
import { createComment } from 'src/redux/slices/event';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------


export default function BlogPostCommentForm({id}:any) {
  const {error} = useSelector(state => state.event);
  const {enqueueSnackbar} = useSnackbar();
  const [image, setImage] = useState<string | ArrayBuffer | null>()
  const CommentSchema = Yup.object().shape({
    image: Yup.string().required('Image is required'),
    comment: Yup.string().required('Comment is required'),
    rate: Yup.number().required('Rate is required'),
  });

  const defaultValues = {
    image: "",
    comment: '',
    rate: "",
  };

  const methods = useForm<any>({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      data.eventId=id
      data.image=image
      console.log(data)
      await dispatch(createComment(data));
      if(error){
        enqueueSnackbar(error, {variant: 'error'})
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (file) {
          setValue(
            "image",
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

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-start">
        
        <RHFUploadSingleFile
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />

          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="subtitle2">Your review about this product:</Typography>

            <Controller
              name="rate"
              control={control}
              render={({ field }) => <Rating {...field} value={Number(field.value)} />}
            />
          </Stack>
        <RHFTextField name="comment" label="Comment *" multiline rows={3} />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Post comment
        </LoadingButton>
      </Stack>
    </FormProvider>
    </RootStyles >
  );
}
