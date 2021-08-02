import { useState } from "react"
import {asteroids} from '../Links'
import css from './AsteroidsNeoWsPage.module.css'
const AsteroidsNeoWsPage=()=>{
    const [arr,setArr]=useState([])
    const [start,setStart]=useState('')
    const [self,setSelf]=useState()
    const [page,setPage]=useState(0)
    const [page1,setPage1]=useState(19)
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
            <div className={css.inp}>
                <input onChange={(e)=> setStart(e.target.value)} type='text' placeholder='start date' />
                <button onClick={()=>{getAsteroids(start,start)}}>Search</button>
            </div>
            <div>
                {
                    !arr.near_earth_objects?null:arr.near_earth_objects[`${start}`].map(item =>(
                        <div key={item.id} className={css.block}> 
                            <p>name:{item.name}</p>
                            <p>is potentially hazardous asteroid:{item.is_potentially_hazardous_asteroid}</p>
                            <p>date:{item.close_approach_data[0].close_approach_date_full}</p>
                            <p>magnitude:{item.absolute_magnitude_h}</p>
                            <p>meters:max{item.estimated_diameter.meters.estimated_diameter_max}, meters:min{item.estimated_diameter.meters.estimated_diameter_min}</p>
                            <button onClick={()=>getSelf(item.links.self)} className={css.btn} >More</button>
                        </div>
                        
                    ))
                }
            </div>
            {
                !self?null:(
                    <div>
                        <h3>{self.name}</h3>
                        <div className={css.page}>
                            <p>orbit determination date:{self.orbital_data.orbit_determination_date}</p>
                            <p>first observation date:{self.orbital_data.first_observation_date}</p>
                            <p>last observation date:{self.orbital_data.last_observation_date}</p>
                            <p>observations used:{self.orbital_data.observations_used}</p>
                            <p>absolute magnitude h:{self.absolute_magnitude_h}</p>
                            <p>estimated diameter:kilometers-min:{self.estimated_diameter.kilometers.estimated_diameter_min},kilometers-max:{self.estimated_diameter.kilometers.estimated_diameter_max}</p>
                            <p>estimated diameter:meters-min:{self.estimated_diameter.meters.estimated_diameter_min},meters-max:{self.estimated_diameter.meters.estimated_diameter_max}</p>
                            <p>estimated diameter:miles-min:{self.estimated_diameter.miles.estimated_diameter_min},miles-max:{self.estimated_diameter.miles.estimated_diameter_max}</p>
                            <p>estimated diameter:feet-min:{self.estimated_diameter.feet.estimated_diameter_min},feet-max:{self.estimated_diameter.feet.estimated_diameter_max}</p>
                            <p>is potentially hazardous asteroid:{`${self.is_potentially_hazardous_asteroid}`}</p>
                        </div>
                            <div className={css.approach}>
                                    <button onClick={()=>{
                                        setPage(page === 0?page:page - 20)
                                        setPage1(page1 === 0?page1:page1 - 20)
                                        setPages(pages === 1?pages:pages - 1)
                                    }}>left</button>
                                    <p>{pages}</p>
                                    <button onClick={()=>{
                                         setPage(Math.floor(self.close_approach_data.length - 1  )%20 * 20 === page1?page:page + 20)
                                        setPage1(Math.floor(self.close_approach_data.length - 1  )%20 * 20 === page1?page1:page1 + 20)
                                        setPages(Math.floor(self.close_approach_data.length - 1  )%20  === pages?pages:pages + 1)
                                        console.log(page1);
                                    }}>rigt</button>
                                    {
                                        self.close_approach_data.slice(page,page1).map(item =>(
                                            <p key={item.close_approach_date}>{item.close_approach_date}</p>
                                        ))
                                    }
                            </div>
                    </div>
                )
            }
        </div>
    )
}
export default AsteroidsNeoWsPage