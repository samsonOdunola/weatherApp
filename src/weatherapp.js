import { useState,useEffect } from "react";
import Output from "./Output";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const Weatherapp = () => {
    
    const [Data, setData] = useState(null)
    const [location, setLocation] = useState("")
    const [lat, setLat]=useState("")
    const [long, setLong]=useState("")
    const [loading, setLoading]=useState("Loading")
    
    
    useEffect(()=>{
        console.log(lat, long)
        getCurrentLocation()
        
        
    },[lat])
    const getCurrentLocation=()=>{
        
            navigator.geolocation.getCurrentPosition((res) => {        
            setLat(res.coords.latitude)
            setLong(res.coords.longitude)
            
        })
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b2545afba199684407d88773f4e5782c&units=metric`
        axios.get(url).then((res)=>{
                setData(res.data)
                console.log(res)
            }).catch((err)=>{setLoading(err.code)})

        
        
    }
    


   
    const searchLocation =(event)=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b2545afba199684407d88773f4e5782c&units=metric`
        if(event.key==="Enter"&& location!==""){
            axios.get(url).then((res)=>{
                setData(res.data)
                console.log(res)
            }).catch((err)=>{setLoading(err)})

            setLocation("")

        }

    }

    return <header>
        <nav><input type="text" value={location}onKeyDown={searchLocation} onChange={(e) => { setLocation(e.target.value) }} placeholder="Enter Location" /> <FaSearch onClick={(event)=>searchLocation()} className="search" /></nav>
        {Data?<Output props={Data}/>:<div className="loading">{loading}</div>}

    </header>
}



export default Weatherapp;