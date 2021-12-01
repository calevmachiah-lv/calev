import {useState, useEffect} from 'react'
import React from "react"
import './Home.css'
import CardHe from '../Card/CardHe'
import Card1He from '../Card/Card1He'
import { Link } from 'react-router-dom'

export default function Home() {
    

    
    //let city = 610264;
  /*let villeMarseille = 610264;
    let villeBarcelona = 753692;
    let villeRome = 721943;
    let villeNewYork = 2459115;
    let villeLosAngeles = 2442047;
    let villeDublin = 560743;*/

    
 
      
      

       

      
 
    

    
    const options1 = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateTimeFormat1 = new Intl.DateTimeFormat('he-EN', options1);
 
    
  
    const date1 = new Date();
    const date2 = new Date(date1);
    const date3 = new Date(date2);
    const date4 = new Date(date3);
    const date5 = new Date(date4);
    date2.setDate(date2.getDate() + 1);
    date3.setDate(date3.getDate() + 2);
    date4.setDate(date4.getDate() + 3);
    date5.setDate(date5.getDate() + 4);
    

const [dataComponentTimeZone0, setDataComponentTimeZone0] = useState();
const [dataComponentTime0, setDataComponentTime0] = useState();
const [dataComponentSunrise0, setDataComponentSunrise0] = useState(); 
const [dataComponentSunset0, setDataComponentSunset0] = useState();   
const [dataComponentCity0, setDataComponentCity0] = useState();    
const [dataComponentArrow0, setDataComponentArrow0] = useState();
const [dataComponentDate0, setDataComponentDate0] = useState();
const [dataComponentAbbr0, setDataComponentAbbr0] = useState();
const [dataComponentImg0, setDataComponentImg0] = useState();
const [dataComponentStateName0, setDataComponentStateName0] = useState();
const [dataComponentMax0, setDataComponentMax0] = useState();
const [dataComponentMin0, setDataComponentMin0] = useState();
const [dataComponentWindSpeed0, setDataComponentWindSpeed0] = useState();
const [dataComponentHumidity0, setDataComponentHumidity0] = useState();
const [dataComponentVisibility0, setDataComponentVisibility0] = useState();
const [dataComponentAirPressure0, setDataComponentAirPressure0] = useState();
const [dataComponentConfidence0, setDataComponentConfidence0] = useState();


const [dataComponentCity1, setDataComponentCity1] = useState();    
const [dataComponentDate1, setDataComponentDate1] = useState();
const [dataComponentAbbr1, setDataComponentAbbr1] = useState();
const [dataComponentImg1, setDataComponentImg1] = useState();
const [dataComponentArrow1, setDataComponentArrow1] = useState();
const [dataComponentStateName1, setDataComponentStateName1] = useState();
const [dataComponentMax1, setDataComponentMax1] = useState();
const [dataComponentMin1, setDataComponentMin1] = useState();
const [dataComponentWindSpeed1, setDataComponentWindSpeed1] = useState();
const [dataComponentHumidity1, setDataComponentHumidity1] = useState();
const [dataComponentVisibility1, setDataComponentVisibility1] = useState();
const [dataComponentAirPressure1, setDataComponentAirPressure1] = useState();
const [dataComponentConfidence1, setDataComponentConfidence1] = useState();

const [dataComponentCity2, setDataComponentCity2] = useState();    
const [dataComponentDate2, setDataComponentDate2] = useState();
const [dataComponentAbbr2, setDataComponentAbbr2] = useState();
const [dataComponentImg2, setDataComponentImg2] = useState();
const [dataComponentArrow2, setDataComponentArrow2] = useState();
const [dataComponentStateName2, setDataComponentStateName2] = useState();
const [dataComponentMax2, setDataComponentMax2] = useState();
const [dataComponentMin2, setDataComponentMin2] = useState();
const [dataComponentWindSpeed2, setDataComponentWindSpeed2] = useState();
const [dataComponentHumidity2, setDataComponentHumidity2] = useState();
const [dataComponentVisibility2, setDataComponentVisibility2] = useState();
const [dataComponentAirPressure2, setDataComponentAirPressure2] = useState();
const [dataComponentConfidence2, setDataComponentConfidence2] = useState();

const [dataComponentCity3, setDataComponentCity3] = useState();    
const [dataComponentDate3, setDataComponentDate3] = useState();
const [dataComponentAbbr3, setDataComponentAbbr3] = useState();
const [dataComponentImg3, setDataComponentImg3] = useState();
const [dataComponentArrow3, setDataComponentArrow3] = useState();
const [dataComponentStateName3, setDataComponentStateName3] = useState();
const [dataComponentMax3, setDataComponentMax3] = useState();
const [dataComponentMin3, setDataComponentMin3] = useState();
const [dataComponentWindSpeed3, setDataComponentWindSpeed3] = useState();
const [dataComponentHumidity3, setDataComponentHumidity3] = useState();
const [dataComponentVisibility3, setDataComponentVisibility3] = useState();
const [dataComponentAirPressure3, setDataComponentAirPressure3] = useState();
const [dataComponentConfidence3, setDataComponentConfidence3] = useState();

const [dataComponentCity4, setDataComponentCity4] = useState();    
const [dataComponentDate4, setDataComponentDate4] = useState();
const [dataComponentAbbr4, setDataComponentAbbr4] = useState();
const [dataComponentImg4, setDataComponentImg4] = useState();
const [dataComponentArrow4, setDataComponentArrow4] = useState();
const [dataComponentStateName4, setDataComponentStateName4] = useState();
const [dataComponentMax4, setDataComponentMax4] = useState();
const [dataComponentMin4, setDataComponentMin4] = useState();
const [dataComponentWindSpeed4, setDataComponentWindSpeed4] = useState();
const [dataComponentHumidity4, setDataComponentHumidity4] = useState();
const [dataComponentVisibility4, setDataComponentVisibility4] = useState();
const [dataComponentAirPressure4, setDataComponentAirPressure4] = useState();
const [dataComponentConfidence4, setDataComponentConfidence4] = useState();



const [monState, setMonState] = useState(610264);

const ville = monState;

const url = 'https://www.metaweather.com/api/location/' + ville;
console.log(url);

useEffect(() => {
fetch(url)

.then(response => {
  console.log(response);
  return response.json();
})
.then(data => {
    console.log(data)
  setDataComponentTimeZone0(data.timezone);
  setDataComponentTime0(data.time);
  setDataComponentSunrise0(data.sun_rise);
  setDataComponentSunset0(data.sun_set);
  setDataComponentCity0(data.title);
  setDataComponentDate0('היום');
  setDataComponentAbbr0(data.consolidated_weather[0].weather_state_abbr);
  setDataComponentImg0('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[0].weather_state_abbr + '.png');
  setDataComponentArrow0('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setDataComponentStateName0(data.consolidated_weather[0].weather_state_name);
  setDataComponentMax0(Math.trunc(data.consolidated_weather[0].max_temp));  
  setDataComponentWindSpeed0(Math.trunc(data.consolidated_weather[0].wind_speed));
  setDataComponentHumidity0(Math.trunc(data.consolidated_weather[0].humidity));
  setDataComponentVisibility0(Math.round((data.consolidated_weather[0].visibility)*10)/10);
  setDataComponentAirPressure0(Math.trunc(data.consolidated_weather[0].air_pressure));
  setDataComponentConfidence0(Math.trunc(data.consolidated_weather[0].predictability));
  setDataComponentMin0(Math.trunc(data.consolidated_weather[0].min_temp));

  setDataComponentCity1(data.title);
  setDataComponentDate1('מחר');
  setDataComponentAbbr1(data.consolidated_weather[1].weather_state_abbr);
  setDataComponentImg1('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[1].weather_state_abbr + '.png');
  setDataComponentArrow1('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setDataComponentStateName1(data.consolidated_weather[1].weather_state_name);
  setDataComponentMax1(Math.trunc(data.consolidated_weather[1].max_temp));  
  setDataComponentWindSpeed1(Math.trunc(data.consolidated_weather[1].wind_speed));
  setDataComponentHumidity1(Math.trunc(data.consolidated_weather[1].humidity));
  setDataComponentVisibility1(Math.round((data.consolidated_weather[1].visibility)*10)/10);
  setDataComponentAirPressure1(Math.trunc(data.consolidated_weather[1].air_pressure));
  setDataComponentConfidence1(Math.trunc(data.consolidated_weather[1].predictability));
  setDataComponentMin1(Math.trunc(data.consolidated_weather[1].min_temp));

  setDataComponentCity2(data.title);
  setDataComponentDate2(dateTimeFormat1.format(date3));
  setDataComponentAbbr2(data.consolidated_weather[2].weather_state_abbr);
  setDataComponentImg2('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[2].weather_state_abbr + '.png');
  setDataComponentArrow2('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setDataComponentStateName2(data.consolidated_weather[2].weather_state_name);
  setDataComponentMax2(Math.trunc(data.consolidated_weather[2].max_temp));  
  setDataComponentWindSpeed2(Math.trunc(data.consolidated_weather[2].wind_speed));
  setDataComponentHumidity2(Math.trunc(data.consolidated_weather[2].humidity));
  setDataComponentVisibility2(Math.round((data.consolidated_weather[2].visibility)*10)/10);
  setDataComponentAirPressure2(Math.trunc(data.consolidated_weather[2].air_pressure));
  setDataComponentConfidence2(Math.trunc(data.consolidated_weather[2].predictability));
  setDataComponentMin2(Math.trunc(data.consolidated_weather[2].min_temp));

  setDataComponentCity3(data.title);
  setDataComponentDate3(dateTimeFormat1.format(date4));
  setDataComponentAbbr3(data.consolidated_weather[3].weather_state_abbr);
  setDataComponentImg3('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[3].weather_state_abbr + '.png');
  setDataComponentArrow3('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setDataComponentStateName3(data.consolidated_weather[3].weather_state_name);
  setDataComponentMax3(Math.trunc(data.consolidated_weather[3].max_temp));  
  setDataComponentWindSpeed3(Math.trunc(data.consolidated_weather[3].wind_speed));
  setDataComponentHumidity3(Math.trunc(data.consolidated_weather[3].humidity));
  setDataComponentVisibility3(Math.round((data.consolidated_weather[3].visibility)*10)/10);
  setDataComponentAirPressure3(Math.trunc(data.consolidated_weather[3].air_pressure));
  setDataComponentConfidence3(Math.trunc(data.consolidated_weather[3].predictability));
  setDataComponentMin3(Math.trunc(data.consolidated_weather[3].min_temp));

  setDataComponentCity4(data.title);
  setDataComponentDate4(dateTimeFormat1.format(date5));
  setDataComponentAbbr4(data.consolidated_weather[4].weather_state_abbr);
  setDataComponentImg4('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[4].weather_state_abbr + '.png');
  setDataComponentArrow4('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setDataComponentStateName4(data.consolidated_weather[4].weather_state_name);
  setDataComponentMax4(Math.trunc(data.consolidated_weather[4].max_temp));  
  setDataComponentWindSpeed4(Math.trunc(data.consolidated_weather[4].wind_speed));
  setDataComponentHumidity4(Math.trunc(data.consolidated_weather[4].humidity));
  setDataComponentVisibility4(Math.round((data.consolidated_weather[4].visibility)*10)/10);
  setDataComponentAirPressure4(Math.trunc(data.consolidated_weather[4].air_pressure));
  setDataComponentConfidence4(Math.trunc(data.consolidated_weather[4].predictability));
  setDataComponentMin4(Math.trunc(data.consolidated_weather[4].min_temp));

})
},[url]);




const options2 = { hour: 'numeric', minute: 'numeric', timeZone: dataComponentTimeZone0 };
const time = new Date(dataComponentTime0).toLocaleString('he-EN', options2);
const sunrise = new Date(dataComponentSunrise0).toLocaleString('he-EN', options2);
const sunset = new Date(dataComponentSunset0).toLocaleString('he-EN', options2);

    return (
        <>
       <div className='languages'>
       <Link to='/he'> <img src='https://www.torahmitsion.fr/wp-content/uploads/2021/11/197577-1-1.png'/></Link> &nbsp; <Link to='/'><img src='https://www.torahmitsion.fr/wp-content/uploads/2021/11/american-us-flag-icon-8327.png'/> </Link>    
    </div>
       <div>
            <form style={{textAlign: 'right', margin: '30px'}} >
        
               
        <p>
               
                <select  onChange={(e) => {setMonState(e.target.value)}} name="city" id="city-select">
                <option value="">תבחר עיר</option>
                        <optgroup label="Europe">
                                
                                <option  value="610264">מרסיי</option>
                                <option  value="753692">ברצלונה</option>
                                <option  value="721943">רומא</option>
                        </optgroup>
                        
                        <optgroup label="North America">
                                <option  value="2459115">ניו יורק</option>
                                <option   value="2442047">לוס אנג'לס</option>
                        </optgroup>
                        <optgroup label="Asia">
                                <option value="560743">דבלין</option>
                        </optgroup>
                        <optgroup label="Africa">
                                <option value="1532755">קזבלנקה הכי טוב</option>
                        </optgroup>
                        
                </select>
        </p>

       
</form>
        </div>
        <div>
      
        <div className='hour'>
        <p><strong>זמן</strong> &nbsp; {time}</p>
        <p><strong>זריחה</strong> &nbsp; {sunrise}</p>
        <p><strong>שקיעת החמה</strong> &nbsp; {sunset}</p>
        </div>
        <h1 className='home-title'>{dataComponentCity0},<span style={{fontSize: '16px', fontWeight: '500'}}>  {dataComponentCity0} </span></h1>

        
        <div className="container-cards">

        <Link style={{textDecoration : 'none', color: 'black'}}
            to= 'card1he/day'
            state={[{dataComponentDate0}, {dataComponentStateName0}, {dataComponentImg0}, {dataComponentMin0}, {dataComponentMax0},{dataComponentArrow0}, {dataComponentWindSpeed0}, {dataComponentHumidity0}, {dataComponentVisibility0}, {dataComponentAirPressure0}, {dataComponentConfidence0}, {dataComponentCity0}]
         }> 
            

        <CardHe
        
        day={dataComponentDate0} 
        imageWeather={dataComponentImg0} 
        weatherName={dataComponentStateName0} 
        min={dataComponentMin0}
        max={dataComponentMax0}
        arrow ={dataComponentArrow0} 
        windSpeed={dataComponentWindSpeed0}
        humidity={dataComponentHumidity0}
        visibility={dataComponentVisibility0}
        pressure={dataComponentAirPressure0}
        confidence={dataComponentConfidence0}
        
            />
            </Link>



<Link style={{textDecoration : 'none', color: 'black'}}
            to= 'card1he/tomorrow'
            state={[{dataComponentDate1}, {dataComponentStateName1}, {dataComponentImg1}, {dataComponentMin1}, {dataComponentMax1},{dataComponentArrow1}, {dataComponentWindSpeed1}, {dataComponentHumidity1}, {dataComponentVisibility1}, {dataComponentAirPressure1}, {dataComponentConfidence1}, {dataComponentCity1}]
         }> 

<CardHe
        
        day={dataComponentDate1} 
        imageWeather={dataComponentImg1} 
        weatherName={dataComponentStateName1} 
        min={dataComponentMin1}
        max={dataComponentMax1}
        arrow ={dataComponentArrow1}
        windSpeed={dataComponentWindSpeed1}
        humidity={dataComponentHumidity1}
        visibility={dataComponentVisibility1}
        pressure={dataComponentAirPressure1}
        confidence={dataComponentConfidence1}
            />

</Link>

<Link style={{textDecoration : 'none', color: 'black'}}
            to= 'card1he/two-days-later'
            state={[{dataComponentDate2}, {dataComponentStateName2}, {dataComponentImg2}, {dataComponentMin2}, {dataComponentMax2},{dataComponentArrow2}, {dataComponentWindSpeed2}, {dataComponentHumidity2}, {dataComponentVisibility2}, {dataComponentAirPressure2}, {dataComponentConfidence2}, {dataComponentCity2}]
         }> 

<CardHe
         
         day={dataComponentDate2} 
         imageWeather={dataComponentImg2} 
         weatherName={dataComponentStateName2} 
         min={dataComponentMin2}
         max={dataComponentMax2}
         arrow ={dataComponentArrow2} 
         windSpeed={dataComponentWindSpeed2}
         humidity={dataComponentHumidity2}
         visibility={dataComponentVisibility2}
         pressure={dataComponentAirPressure2}
         confidence={dataComponentConfidence2}
             />
</Link>

<Link style={{textDecoration : 'none', color: 'black'}}
            to= 'card1he/three-days-later'
            state={[{dataComponentDate3}, {dataComponentStateName3}, {dataComponentImg3}, {dataComponentMin3}, {dataComponentMax3},{dataComponentArrow3}, {dataComponentWindSpeed3}, {dataComponentHumidity3}, {dataComponentVisibility3}, {dataComponentAirPressure3}, {dataComponentConfidence3}, {dataComponentCity3}]
         }> 

<CardHe
         
         day={dataComponentDate3} 
         imageWeather={dataComponentImg3} 
         weatherName={dataComponentStateName3} 
         min={dataComponentMin3}
         max={dataComponentMax3}
         arrow ={dataComponentArrow3}
         windSpeed={dataComponentWindSpeed3}
         humidity={dataComponentHumidity3}
         visibility={dataComponentVisibility3}
         pressure={dataComponentAirPressure3}
         confidence={dataComponentConfidence3}
             />
</Link>


<Link style={{textDecoration : 'none', color: 'black'}}
            to= 'card1he/four-days-later'
            state={[{dataComponentDate4}, {dataComponentStateName4}, {dataComponentImg4}, {dataComponentMin4}, {dataComponentMax4},{dataComponentArrow4}, {dataComponentWindSpeed4}, {dataComponentHumidity4}, {dataComponentVisibility4}, {dataComponentAirPressure4}, {dataComponentConfidence4}, {dataComponentCity4}]
         }> 

 <CardHe 
         
         day={dataComponentDate4} 
         imageWeather={dataComponentImg4} 
         weatherName={dataComponentStateName4} 
         min={dataComponentMin4}
         max={dataComponentMax4}
         arrow ={dataComponentArrow4}
         windSpeed={dataComponentWindSpeed4}
         humidity={dataComponentHumidity4}
         visibility={dataComponentVisibility4}
         pressure={dataComponentAirPressure4}
         confidence={dataComponentConfidence4}
             />  
             </Link> 
              

            </div>
        </div>
        </>
    )
}