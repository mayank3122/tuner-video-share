import React, { useEffect } from 'react'
import './upload.css'
import {BsCloudUpload} from "react-icons/bs"
import { useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import {useNavigate}  from 'react-router-dom'

const Upload = ({ setOpen }) => {
  const Navigate = useNavigate()
    
    const [loader,setLoader]=useState(false)
    const [loaded,setLoaded]=useState(false)
    const [upload,setUpload]=useState({
        title:"",
        desc:"",
        imgUrl:"",
        videoUrl:"",
        views:"",
        category:"",
        visibility:""
    })
    const [image,setImage]=useState('')
    const [video,setVideo]=useState('')
   

    useEffect(()=>{
        console.log(upload)
       
        if(image && video){
            fetch("https://tuner-backend-azda.onrender.com/upload",{
                method:"POST",
                headers:{
                   "Content-Type":"application/json",
                   "Authorization": localStorage.getItem('token')
                },
                body:JSON.stringify({
                    ...upload,
                    imgUrl:image,
                    videoUrl:video

                })
            })
            .then(res=>res.json())
            .then(result=>{
                setLoader(false)
                setLoaded(true)
                console.log(result)              
            })
        }
        
    },[video,image])

    
       
    
    
   
    const handleChange = (e) => {
        setUpload((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const fileChange=(e)=>{
        setUpload((prev)=>{
            return {...prev,[e.target.name]:e.target.files[0]}
        })
    }

    const newpost = () => {
        setLoader(true)
        console.log(upload)
        const videofile=new FormData()
        videofile.append("file", upload.videoUrl)
        videofile.append("upload_preset", "tuner-app")
        videofile.append("cloude_name", "denqqxn5l")
        fetch("https://api.cloudinary.com/v1_1/denqqxn5l/video/upload", {
          method: "POST",
          body: videofile
        }).then(resp =>
          resp.json()
        ).then(res => {
          console.log(res)
          setVideo(res.url)

          const data = new FormData()
          data.append("file", upload.imgUrl)
          data.append("upload_preset", "tuner-app")
          data.append("cloude_name", "denqqxn5l")
          fetch("https://api.cloudinary.com/v1_1/denqqxn5l/image/upload", {
            method: "POST",
            body: data
          }).then(resp =>
            resp.json()
          ).then(res => {
              console.log(res)
            setImage(res.url)
            // fetchdata()
          
           
          })
            .catch(err =>
              console.log(err)
            )
           
        })
          .catch(err =>
            console.log(err)
          )
       
      
      }
    
    return (
        <div className='Container'>
           { loader && <Toast
          className="d-inline-block m-1"
          // bg={variant.toLowerCase()}
          // key={idx}
          style={{backgroundColor:'green', color: 'white', width: '300px', position: 'relative', left:'30px'}}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
          </Toast.Header>
          <Toast.Body >
            video uploading...
          </Toast.Body>
        </Toast>}
        { loaded && <Toast
          className="d-inline-block m-1"
          // bg={variant.toLowerCase()}
          // key={idx}
          style={{backgroundColor:'green', color: 'white', width: '300px', position: 'relative', left:'30px'}}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
          </Toast.Header>
          <Toast.Body >
            video uploaded successfully
          </Toast.Body>
         {loaded?
          (setOpen(false),
           Navigate('/myvideos')): setOpen(true)}
        </Toast>}
            <div className='Wrapper'>
                <div className='heading-div'>

                <div className='Title'>Upload a New Video</div>
                <div className='Close' style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>X</div>
                </div>
            
            <div  className="file-input">
                <input
                name='videoUrl'
                type='file'
                accept='video/*'
                onChange={fileChange}
              
            />
            <BsCloudUpload style={{fontSize:"3.5em"}}/>
            <h2>Drag And Drop To Upload</h2>
            <h3>or browse to chose the file</h3>
            </div>
            <div className='name'>
                <input placeholder='Name'
                    type='text'
                    onChange={handleChange}
                    name='title'
                /> </div>
            <div className='description'> 
                <textarea onChange={handleChange} placeholder='Description' name='desc'></textarea></div>
            
        <div className='bottom-select'>
            <div className='category'>
               
                <select name="category" id="Catergory" onChange={handleChange}>
                    <option >Category</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Movie">Movie</option>
                </select>
            </div>
            <div className='visibility'>
               
                <select name="visibility" id="Public" onChange={handleChange}>
                    <option selected='selected' value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
            </div>
            <div className='upload-thumbnail'>
                <p>upload thumbnail</p>
                <input type='file' 
                onChange={fileChange}
                accept='image/*'
                name='imgUrl'
                />
            </div>
            </div>
            <button onClick={()=>newpost()} className='submit'>SUBMIT</button>
            </div>
        </div>
    )

}

export default Upload