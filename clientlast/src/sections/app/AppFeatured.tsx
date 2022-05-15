import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { m } from 'framer-motion';
import {useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link, Button } from '@mui/material';
// _mock_
import { _appFeatured } from 'src/_mock/_app';
// components
import Image from "src/components/Image";
import { MotionContainer, varFade } from 'src/components/animate';
import { CarouselDots, CarouselArrows } from 'src/components/carousel';
import { _ecommerceNewProducts } from 'src/_mock';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function AppFeatured() {
  const theme = useTheme();
  const [event, setEvent] = useState([]);
  console.log(event)
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (async () => {
      try {
        
        const response = await axios.get(`/api/v1/admin/events/mostcommented`);

        if (response.status === 200) {
          const eventss = response.data.events.map((event:any) => {
            return {
              ...event,
            }
          }
          )
          setEvent(eventss)
        } else {
          enqueueSnackbar('Error', { variant: 'error' });
        }
      } catch (error) {
        
      }
    })();
  }, [])

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  return (
    <Card sx={{ height: { xs: 210, xl: 275 } }} >
      <Slider {...settings}>
        {event.map((item:any) => (
          <CarouselItem key={item._id} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    eventImage: string;
    title: string;
  };
};

function CarouselItem({ item }: any) {
  const { eventImage, title,_id } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          Most Commented
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {title}
        </Typography>
        <Button to={`/event/detail/${_id}`} variant="contained" component={RouterLink}>
          See Detail
        </Button>
      </CardContent>
      <OverlayStyle />
      <Image alt={title} src={eventImage.url} sx={{ height: { xs: 210, xl: 275 } }} />
    </Box>
  );
}
