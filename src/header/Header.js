import css from './Header.module.css'
import logo from '../img/nasa.png'
const Header=()=>{
    return(
        <div className={css.div}>
            <img className={css.img} src={logo} alt='logo' />
            <h1 className={css.h1}>Nasa api</h1>
        </div>
    )
}
export default Header