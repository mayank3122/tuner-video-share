import React from 'react'
import Cards from '../Cards/Card'
import "./viewall.css"
import {context} from '../../Context/Context'
import { useContext } from 'react'
function Viewall({data,setData}) {

  const {arr,setArray} = useContext(context)

  return (
    <>
      <div className='viewall-container'>
            <img src='https://www.desktopbackground.org/download/o/2013/11/06/665679_godzilla-2014-movie-poster-wallpapers_1920x1080_h.jpg' style={{height:"150px",width:"100%",objectFit:"cover"}}/>
        </div>
        <div className='viewall-content'>
            <div >
            <div style={{marginBottom:"20px"}}>
                <h1 style={{color:"#FFFFFF",fontSize:"1.7em",position:"relative",top:"25px",width:"250px"}}>Godzilla Attack in the city</h1>
            </div>
            <div>
                <span style={{color:"#FFFFFF",fontSize:"0.7em",margin:'5px 0 12px',fontWeight:"lighter"}}>10 Jan 2020</span>
                <span style={{color:"#FFFFFF",fontSize:"0.7em",margin:'5px 12px',fontWeight:"lighter"}}>14 Mins</span>
                <span style={{color:"#FFFFFF",fontSize:"0.7em",margin:'5px 12px',fontWeight:"lighter"}}>200 Views</span>
            </div>
            </div>
            <div className='viewall-profile'>
                <span><img src='https://cdn.pulse2.com/cdn/2020/05/Mark-Zuckerberg.jpg' height="30px" style={{borderRadius:"999px",position:"relative",top:'9px'}}/></span>
                <span style={{color:"#FFFFFF",fontSize:"1em",fontWeight:"lighter"}}>Publisher Name</span>
            </div>
        </div>
       <div className='view'>
    <p>Recent</p>
    <p style={{color:"#C4B4F8", cursor:'pointer'}} onClick={()=>{
        setData(!data)
    }}>Viewless</p>
  </div>
<div className='lowerbody-container2'>
  
{
    arr.map(ele=>{
      return(
        <Cards obj={ele}/>
      )
    })
  }
 </div>
 </>
  )
}

export default Viewall
