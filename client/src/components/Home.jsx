import mapboxgl from 'mapbox-gl'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'
import Navbar from './utils/Navbar'
import { useAlert } from 'react-alert'
import Loading from './notify/Loading'

const Home = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const dispatch = useDispatch()
    const alert = useAlert()
    const { auth ,notify} = useSelector(state => state)
    useEffect(() => {
        if(notify.error){
            if(notify.error != 'jwt malformed'){
                alert.error(notify.error)
            }
        }
        if(auth.success && !auth.user){
            alert.success(auth.message)
        }
    }, [notify,auth])
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2U3ZW5zIiwiYSI6ImNrcmpmbGF0czEydGEyb3BndXpnemZnYnUifQ.QRQXLCToGvOHwrrYxR29Ew';
    const bounds = [
        [32.644340, 41.195887],
        [32.663052, 41.217113]
    ];
    useEffect(async() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/se7ens/ckudx9axo0v5h17qlho8y6m0m?optimize=true?optimize=true',
            center: [32.653, 41.215],
            zoom: 16.41,
            maxZoom: 18,
            minZoom: 16,
            pitch: 55,
            bearing: 170,
            maxBounds: bounds
        });
        await map.once('load')
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
        
    })

    return (
        <div >
            <Navbar/>
            
            <div style={{ height: '100vh' }} ref={mapContainer} className="map-container" />

        </div>
    )
}

export default Home
