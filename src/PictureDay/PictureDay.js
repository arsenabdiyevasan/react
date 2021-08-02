import { GettingPicture } from "../Links"
import React, { useState,useEffect } from "react";
import css from './PictureDay.module.css'

const PictureDay=()=>{
    const [arr,setArr]=useState([])
    useEffect(()=>{
        GettingPicture()
        .then(res =>res.json())
        .then(res =>{
            setArr(res)
        })
    }, [])
    return(
        <div className={css.div}>
            <h1>Pictrue of the day</h1>
            <h2>{arr.title}</h2>
            <p>{arr.copyright}</p>
            <p>{arr.date}</p>
            {
                arr.media_type === "video"?(<iframe className={css.mediavidio} title='media' src={arr.url}></iframe>):<img className={css.media} src={arr.url} alt='img' />
            }
            <p>{arr.explanation}</p>
        </div>
    )
}
export default PictureDay