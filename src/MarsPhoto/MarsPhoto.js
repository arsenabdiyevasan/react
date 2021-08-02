import css from './MarsPhoto.module.css'
import mars from '../img/mars.jpg'
const MarsPhoto=()=>{
    return(
        <div className={css.div}>
            <h1>Mars Rover Photos</h1>
            <p>Photos taken by masokhod Curiosity, Opportunity and Spirit</p>
            <img src={mars} alt='mars' />
            <br/>
            <button className={css.btn}><a href='/MarsPhotos' alt='ad'>More</a></button>
        </div>
    )
}
export default MarsPhoto