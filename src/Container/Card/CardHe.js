import React from "react"
import './CardHe.css'


export default function Card(props) {



    return (
        <div className="card">
        
             <h4>{props.day}</h4>

             <img src={props.imageWeather} />{props.weatherName}
             <br/><br/>

             <p> {props.min}°C :מינימום</p>
             <p> {props.max}°C :מקסימום</p>
            
            
             <p> {props.windSpeed}mph<img style={{   width: '10px', transform: 'rotate(0deg)'}} src={props.arrow}/> 
               </p>
              <br/>

              <p><strong>לחות</strong></p>
              <p>{props.humidity}%</p>
           
              <p><strong>ראות</strong></p>
              <p>{props.visibility} מיילס</p>
           
              <p><strong>לחץ</strong></p>
              <p>{props.pressure}mb</p>
              <br/>

              <p><strong>אמון</strong></p>
              <p>{props.confidence}%</p>
              <br/>
        </div>

    )
}
