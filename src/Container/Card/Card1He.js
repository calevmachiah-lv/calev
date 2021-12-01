
import React from 'react';
import './Card1He.css';
import Sources from '../Sources/Sources';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export default function Card1He() {

 const navigate= useNavigate();   

const location = useLocation()
console.log(location);
console.log(location.state);
const dataComponent = [...(Object.values(location.state))];
console.log(dataComponent);




const day = Object.values(dataComponent[0]);
const weatherName= Object.values(dataComponent[1]);
const imageWeather= Object.values(dataComponent[2]); 
const min= Object.values(dataComponent[3]);
const max= Object.values(dataComponent[4]);
const arrow = Object.values(dataComponent[5]);
const windSpeed= Object.values(dataComponent[6]);
const humidity= Object.values(dataComponent[7]);
const visibility= Object.values(dataComponent[8]);
const pressure= Object.values(dataComponent[9]);
const confidence= Object.values(dataComponent[10]);
const city= Object.values(dataComponent[11]);



    return (
<div className='allThePage'>
        <div className='container-cards1'>
        <div className="card1he">
         <button id='couache' onClick={() =>navigate('/he')}>&#x2190;</button> 

         <h1 className='home-title1'>{city}</h1>
          
         <h4>{day}</h4>

             <img src={imageWeather} />{weatherName}
             <br/><br/>

             <p> {min}°C :מינימום</p>
             <p> {max}°C :מקסימום</p>
            
            
             <p> <img style={{   width: '10px', transform: 'rotate(27deg)'}} src={arrow}/> {windSpeed}mph
               </p>
              <br/>

              <p><strong>לחות</strong></p>
              <p>{humidity}%</p>
           
              <p><strong>ראות</strong></p>
              <p>{visibility} miles</p>
           
              <p><strong>לחץ</strong></p>
              <p>{pressure}mb</p>
              <br/>

              <p><strong>אמון</strong></p>
              <p>{confidence}%</p>
              <br/>
       
              </div>

<div className='elementSourceshe'>
 <Sources/>    

</div>
</div>
</div>

        


    )
}
