import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import { useAlert } from 'react-alert'

const Notify = () => {
    const {notify} = useSelector(state => state)
    const alert = useAlert()
    console.log(notify)
    return (
        <div>
            {notify.loading && <Loading/>}
            
            
        </div>
    )
}

export default Notify
