export const Key='?api_key=RqEsGRDucQiMeSgEHbwHUzWkhYjZH6tBJU62o8vP';
export const GettingPicture=()=>{
    return fetch(`https://api.nasa.gov/planetary/apod${Key}`)
}
export const MP={
    rovers:()=>{
        return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers${Key}`)
    },
    photos:(name,sol,page=0,Cname)=>{
        return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos${Key}&page=${page}&earth_date=${sol}&camera=${Cname}`)
    },
    getrover:(name)=>{
        return fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${name}${Key}`)
    }
}
export const asteroids={
    get:(start,end)=>{
        return fetch(`https://api.nasa.gov/neo/rest/v1/feed${Key}&start_date=${start}&end_date=${end}`)
    },
    selfs:(item)=>{
        return fetch(item)
    }
}