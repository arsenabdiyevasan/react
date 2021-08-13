import css from './Header.module.css'
import logo from '../img/nasa.png'
const Header=()=>{
    return(
        <div className={css.div}>
            <a href='/'><img className={css.img} src={logo} alt='logo' /></a>
            <h1 className={css.h1}>Nasa api</h1>
        </div>
    )
}
export default Header