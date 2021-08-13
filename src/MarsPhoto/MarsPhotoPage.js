import css from './MarsPhotoPage.module.css'
import React, { useState,useEffect } from "react";
import {MP} from '../Links'
import {VscArrowSmallLeft} from 'react-icons/vsc'
import {VscArrowSmallRight} from 'react-icons/vsc'
import Header from '../header/Header';

const MarsPhotoPage=()=>{
    const [page,setPage]=useState(1)
    const [arr,setArr]=useState([])
    const [roverInfo,setroverInfo]=useState([])
    const [date,setDate]=useState([])
    const [img,setImg]=useState([])
    const [input,setInput]=useState('')
    const [camera,setCamera]=useState(date.cameras === undefined?null: date.cameras[0])
    const [tf,setTf]=useState(false)
    const [im,setIm]=useState(null)
  
    const getImg=(ame,sol,page,Cname)=>{
        MP.photos(ame,sol,page,Cname)
        .then(res => res.json())
        .then(res =>{
            if(page < 1){
                setPage(page + 1)
                return img
            }else if(!res.photos[0]){
                setPage(page - 1)
                return img
            }else{
                return res
            }
        })
        .then(res =>{
            setImg(res)
        })
    }
    const manifestsRover=(name)=>{
        MP.getrover(name)
            .then(res =>res.json())
            .then(res=>{
                return res.photo_manifest
            })
            .then(res =>{
                setroverInfo(res)
                setDate(res.photos[res.photos.length - 1])
                getImg(res.name,res.max_date,1,res.photos[res.photos.length - 1].cameras[0])
            })
    }
    const inputget=()=>{
        roverInfo.photos.forEach(item => {
            if(item.earth_date === input){
                setDate(item)
                setImg([])
                getImg(roverInfo.name,date.earth_date,1,camera)
                setPage(1)
                
                
            }else{
                return null
            }
        })
    }
    useEffect(()=>{
            // other code
        MP.rovers()
        .then(res =>res.json())
        .then(res =>{
            setArr(res.rovers)
            manifestsRover(res.rovers[0].name)
        })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <div className={css.block}>
            <Header />
            <div onClick={()=>setTf(false)} className={`${css.imgBlock} ${tf?css.tf:null}`}>
                <div className={css.blockimg}>
                    <img src={im} alt={im} />
                </div>
            </div>
            <div className={css.info}>
                <h1>{roverInfo.name}</h1>
                <p>launch date: {roverInfo.launch_date}</p>
                <p>landing date: {roverInfo.landing_date}</p>
                <p>status:{roverInfo.status}</p>
                <p>total photos: {roverInfo.total_photos}</p>
                <div className={css.rovers}>
                    <p>Rovers:</p>
                    <div >
                        {
                        !arr?null:arr.map(item =>(
                            <button className={css.btn} key={item.id} onClick={()=>{
                                manifestsRover(item.name)
                            }}>{item.name}</button>
                        ))
                        }  
                    </div> 
                </div>
            </div>
            <div className={css.inpBox}> 
                <div className={css.box}>
                    <input className={css.inp} onChange={(e)=>{
                        setInput(e.target.value)
                    }} type='text' placeholder={`${date.earth_date}—${roverInfo.landing_date}`} />
                    <button className={css.inpbtn} onClick={inputget}>search</button>
                </div>
                <div>
                    {
                        date.cameras === undefined?null: date.cameras.map(item =>(
                            <button className={`${css.btn} ${camera === item?css.btncolor:null}`} key={item} onClick={()=>{
                                getImg(roverInfo.name,date.earth_date,1,item)
                                setCamera(item)
                                setPage(1)
                            }}>{item}</button>
                        ))
                    }
                </div>
            </div>
            <div className={css.arrows}>
                <button onClick={()=>{
                    getImg(roverInfo.name,date.earth_date,page - 1,camera)
                    setPage(page <= 1?1:page - 1)
                }}><VscArrowSmallLeft/></button>
                <p>{page}</p>
                <button onClick={()=>{
                    getImg(roverInfo.name,date.earth_date,page + 1,camera)
                    setPage(page + 1)
                }}><VscArrowSmallRight/></button>
            </div>           
            <div className={css.imgs}>
                {
                    img.photos === undefined?null:img.photos.map(item =>(
                        <img onClick={(()=>{
                            setTf(true)
                            setIm(item.img_src)
                        })} key={item.id} className={`${css.img}`} src={item.img_src} alt={item.id} />
                    ))
                }
            </div>
            
        </div>
    )
}
export default MarsPhotoPage