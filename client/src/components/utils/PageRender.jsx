import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'

const genearatePage = (pageName) =>{
    let slug = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    const component = () => require (`../auth/${slug}`).default
    
    try{
        return React.createElement(component())
    }catch (err){
        return <NotFound/>
    }
}

const PageRender = () => {
    const {page,id} = useParams()
    let pageName = "";
    if(id){
        pageName =`${page}/[id]`
    }else{
        pageName= `${page}`
    }
    return genearatePage(pageName)
}

export default PageRender
