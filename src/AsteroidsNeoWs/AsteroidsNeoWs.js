import css from './AsteroidsNeoWs.module.css'
import comet from '../img/comet.jpg'
const AsteroidsNeoWs=()=>{
    return(
        <div className={css.block}>
            <h1>Asteroids-NeoWs</h1>
            <p>NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid information. With NeoWs a user can: search for Asteroids based on their closest approach date to Earth, lookup a specific Asteroid with its NASA JPL small body id, as well as browse the overall data-set.</p>
            <img src={comet} alt={comet} />
            <br/>
            <button><a href='/AsteroidsNeoWsPage' alt='ad'>More</a></button>
        </div>
    )
}
export default AsteroidsNeoWs