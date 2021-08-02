import Header from './header/Header'
import MarsPhoto from './MarsPhoto/MarsPhoto'
import PictureDay from './PictureDay/PictureDay'
import {Route, Switch,Redirect} from 'react-router-dom'
import MarsPhotoPage from './MarsPhoto/MarsPhotoPage'
import AsteroidsNeoWs from './AsteroidsNeoWs/AsteroidsNeoWs'
import AsteroidsNeoWsPage from './AsteroidsNeoWs/AsteroidsNeoWsPage'
const App=()=>{
    return(
        <Switch>
            <Route path='/' exact>  
                    <Header />
                    <PictureDay />
                    <MarsPhoto />
                    <AsteroidsNeoWs />
            </Route>
            <Route path='/MarsPhotos'>
                <MarsPhotoPage />
            </Route>
            <Route path='/AsteroidsNeoWsPage'>
                <AsteroidsNeoWsPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}
export default App