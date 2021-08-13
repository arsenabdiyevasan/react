import { useState } from "react"
import Header from "../header/Header"
import {asteroids} from '../Links'
import css from './AsteroidsNeoWsPage.module.css'
import {VscArrowSmallLeft} from 'react-icons/vsc'
import {VscArrowSmallRight} from 'react-icons/vsc'
const AsteroidsNeoWsPage=()=>{
    const [arr,setArr]=useState([])
    const [start,setStart]=useState('')
    const [self,setSelf]=useState()
    const [page,setPage]=useState(0)
    const [page1,setPage1]=useState(10)
    const [pages,setPages]=useState(1)
    const getAsteroids=(st,en)=>{
        asteroids.get(st,en)    
        .then(res => res.json())
        .then(res => setArr(res))
        
    }
    const getSelf=(link)=>{
        setArr([])
        asteroids.selfs(link)
        .then(res => res.json())
        .then(res => setSelf(res))
    }
    return(
        <div>
            <Header />
            <div className={css.inp}>
                <h2>Search Asteroids </h2>
                <div>
                    <input onChange={(e)=> setStart(e.target.value)} type='text' placeholder='start date' />
                    <button onClick={()=>{getAsteroids(start,start)}}>Search</button>
                </div>
            </div>
            <div className={css.blocks}>
                {
                    !arr.near_earth_objects?null:arr.near_earth_objects[`${start}`].map(item =>(
                        <div key={item.id} className={css.block}> 
                            <p>name:{item.name}</p>
                            <p>is potentially hazardous asteroid:{`${item.is_potentially_hazardous_asteroid}`}</p>
                            <p>date:{item.close_approach_data[0].close_approach_date_full}</p>
                            <p>magnitude:{item.absolute_magnitude_h}</p>
                            <p>meters:max{item.estimated_diameter.meters.estimated_diameter_max}</p>
                            <p>meters:min{item.estimated_diameter.meters.estimated_diameter_min}</p>
                            <button onClick={()=>getSelf(item.links.self)} className={css.btn} >More</button>
                        </div>
                        
                    ))
                }
            </div>
            <div>
            {
                !self?null:(
                    <div>
                        <div className={css.page}>
                        <h3>{self.name}</h3>
                        <p>absolute magnitude h:{`${self.absolute_magnitude_h}`}</p>
                        <h3>estimated_diameter</h3>
                        <div className={css.diametr}>
                            <div>
                            <p>kilometers</p>
                            <p>min:{self.estimated_diameter.kilometers.estimated_diameter_min}</p>
                            <p>max:{self.estimated_diameter.kilometers.estimated_diameter_max}</p>
                            </div>
                            <div>
                            <p>meters</p>
                            <p>min:{self.estimated_diameter.meters.estimated_diameter_min}</p>
                            <p>max:{self.estimated_diameter.meters.estimated_diameter_max}</p>
                            </div>
                            <div>
                            <p>miles</p>
                            <p>min:{self.estimated_diameter.miles.estimated_diameter_min}</p>
                            <p>max:{self.estimated_diameter.miles.estimated_diameter_max}</p>
                            </div>
                        </div>
                        <p>is potentially hazardous asteroid:{`${self.is_potentially_hazardous_asteroid}`}</p>
                        <h3>orbital data</h3>
                        <div className={css.orbit}>
                            <p>orbit determination date:{self.orbital_data.orbit_determination_date}</p>
                            <p>first observation date:{self.orbital_data.first_observation_date}</p>
                            <p>last observation date:{self.orbital_data.last_observation_date}</p>
                            <p>observations used:{self.orbital_data.observations_used}</p>
                        </div>
                        </div>
                            <div className={css.approach}>
                                    <div className={css.btns}>
                                        <button onClick={()=>{
                                            if(page === 0){
                                                return null
                                            }else{
                                                setPage(page - 10)
                                                setPage1(page1 - 10)
                                                setPages(pages - 1)
                                            }
                                        }}><VscArrowSmallLeft /></button>
                                        <p>{pages}</p>
                                        <button onClick={()=>{
                                            if(self.close_approach_data.length  <= page1){
                                                return null
                                            }else{
                                                setPage(page + 10)
                                                setPage1(page1 + 10)
                                                setPages(pages + 1)
                                            }
                                        }}><VscArrowSmallRight /></button>
                                    </div>
                                    <div className={css.cards}>
                                        {
                                            self.close_approach_data.slice(page,page1).map(item =>(
                                                <div key={item.close_approach_date} className={css.card}>
                                                    <p>close_ approach date:{item.close_approach_date}</p>
                                                    <p>close approach date full:{item.close_approach_date_full}</p>
                                                    <p>epoch date close approach:{item.epoch_date_close_approach}</p>
                                                    <div>
                                                        <h3>relative velocity</h3>
                                                        <p>kilometers per second:{item.relative_velocity.kilometers_per_second}</p>
                                                        <p>kilometers per hour:{item.relative_velocity.kilometers_per_hour}</p>
                                                        <p>miles per hour:{item.relative_velocity.miles_per_hour}</p>
                                                    </div>
                                                    <div>
                                                        <h3>miss distance</h3>
                                                        <p>astronomical:{item.miss_distance.astronomical}</p>
                                                        <p>lunar:{item.miss_distance.lunar}</p>
                                                        <p>kilometers:{item.miss_distance.kilometers}</p>
                                                        <p>miles:{item.miss_distance.miles}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
export default AsteroidsNeoWsPage