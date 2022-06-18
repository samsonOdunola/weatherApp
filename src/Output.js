import { WiBarometer, WiHumidity,WiStrongWind,WiFlood,WiThermometer } from "react-icons/wi";
const Output = ({ props }) => {
    const{weather, main,name,wind,sys}=props
       
    return <div className="main-container">
        <div className="location-bar"><h2>{name},{sys.country}</h2></div>
        <div className="sections">
            <div className="section-1">
                <div>
                    <h1>{Math.round(main.temp)}<span>°C</span></h1>
                    <h2>{weather[0].description}</h2>
                    <h2>Feels like {main.feels_like }<span>°C</span></h2>
                </div>
                
            </div>
            <div className="section-2">
                <ul>
                    <li><div><WiHumidity className="icon" />Humidity </div><p>{main.humidity}%</p></li>
                    <li><div><WiBarometer className="icon" />Pressure </div><p>{main.pressure} hPa</p></li>
                    <li><div><WiFlood className="icon" />Sea Level </div><p>{main.sea_level} hPa</p></li>
                    <li><div><WiStrongWind className="icon" />Wind Speed </div><p>{wind.speed} m/s</p></li>
                    <li><div><WiThermometer className="icon" />High/low </div><p>{main.temp_max}/{main.temp_min}°C</p></li>
                </ul>
            </div>
        </div>

    </div>
}



export default Output;