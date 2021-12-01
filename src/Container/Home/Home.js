import {useState, useEffect} from 'react'
import React from "react"
import './Home.css'
import Card from '../Card/Card'
import Card1 from '../Card/Card1'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useTranslation } from "react-i18next";

export default function Home() {
    
        const { t, i18n } = useTranslation();



    
    //let city = 610264;
  /*let villeMarseille = 610264;
    let villeBarcelona = 753692;
    let villeRome = 721943;
    let villeNewYork = 2459115;
    let villeLosAngeles = 2442047;
    let villeDublin = 560743;*/

    
 
      
      

       

      

    

    
    const options1 = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateTimeFormat1 = new Intl.DateTimeFormat('en-EN', options1);
 
    
  
    const dateA = new Date();
    const dateB = new Date(dateA);
    const dateC = new Date(dateB);
    const dateD = new Date(dateC);
    const dateE = new Date(dateD);
    dateB.setDate(dateB.getDate() + 1);
    dateC.setDate(dateC.getDate() + 2);
    dateD.setDate(dateD.getDate() + 3);
    dateE.setDate(dateE.getDate() + 4);
    

    const [timeZone0, setTimeZone0] = useState();
    const [time0, setTime0] = useState();
    const [sunrise0, setSunrise0] = useState(); 
    const [sunset0, setSunset0] = useState();   
    const [city0, setCity0] = useState();    
    const [arrow0, setArrow0] = useState();
    const [date0, setDate0] = useState();
    const [abbr0, setAbbr0] = useState();
    const [img0, setImg0] = useState();
    const [stateName0, setStateName0] = useState();
    const [max0, setMax0] = useState();
    const [min0, setMin0] = useState();
    const [windSpeed0, setWindSpeed0] = useState();
    const [humidity0, setHumidity0] = useState();
    const [visibility0, setVisibility0] = useState();
    const [airPressure0, setAirPressure0] = useState();
    const [confidence0, setConfidence0] = useState();
    
    
    const [timeZone1, setTimeZone1] = useState();
    const [time1, setTime1] = useState(); 
    const [city1, setCity1] = useState();    
    const [arrow1, setArrow1] = useState();
    const [date1, setDate1] = useState();
    const [abbr1, setAbbr1] = useState();
    const [img1, setImg1] = useState();
    const [stateName1, setStateName1] = useState();
    const [max1, setMax1] = useState();
    const [min1, setMin1] = useState();
    const [windSpeed1, setWindSpeed1] = useState();
    const [humidity1, setHumidity1] = useState();
    const [visibility1, setVisibility1] = useState();
    const [airPressure1, setAirPressure1] = useState();
    const [confidence1, setConfidence1] = useState();
    
    const [timeZone2, setTimeZone2] = useState();
    const [time2, setTime2] = useState();  
    const [city2, setCity2] = useState();    
    const [arrow2, setArrow2] = useState();
    const [date2, setDate2] = useState();
    const [abbr2, setAbbr2] = useState();
    const [img2, setImg2] = useState();
    const [stateName2, setStateName2] = useState();
    const [max2, setMax2] = useState();
    const [min2, setMin2] = useState();
    const [windSpeed2, setWindSpeed2] = useState();
    const [humidity2, setHumidity2] = useState();
    const [visibility2, setVisibility2] = useState();
    const [airPressure2, setAirPressure2] = useState();
    const [confidence2, setConfidence2] = useState();
    
    const [timeZone3, setTimeZone3] = useState();
    const [time3, setTime3] = useState();   
    const [city3, setCity3] = useState();    
    const [arrow3, setArrow3] = useState();
    const [date3, setDate3] = useState();
    const [abbr3, setAbbr3] = useState();
    const [img3, setImg3] = useState();
    const [stateName3, setStateName3] = useState();
    const [max3, setMax3] = useState();
    const [min3, setMin3] = useState();
    const [windSpeed3, setWindSpeed3] = useState();
    const [humidity3, setHumidity3] = useState();
    const [visibility3, setVisibility3] = useState();
    const [airPressure3, setAirPressure3] = useState();
    const [confidence3, setConfidence3] = useState();
    
    const [timeZone4, setTimeZone4] = useState();
    const [time4, setTime4] = useState();  
    const [city4, setCity4] = useState();    
    const [arrow4, setArrow4] = useState();
    const [date4, setDate4] = useState();
    const [abbr4, setAbbr4] = useState();
    const [img4, setImg4] = useState();
    const [stateName4, setStateName4] = useState();
    const [max4, setMax4] = useState();
    const [min4, setMin4] = useState();
    const [windSpeed4, setWindSpeed4] = useState();
    const [humidity4, setHumidity4] = useState();
    const [visibility4, setVisibility4] = useState();
    const [airPressure4, setAirPressure4] = useState();
    const [confidence4, setConfidence4] = useState();
    



const [monState, setMonState] = useState(610264);

const ville = monState;

const url = 'https://www.metaweather.com/api/location/' + ville;
console.log(url);

useEffect(() => {
fetch(url)

.then(response => {
  
  return response.json();
})
.then(data => {
  
  setCity0(data.title);
  setTimeZone0(data.timezone);
  setTime0(data.time);
  setSunrise0(data.sun_rise);
  setSunset0(data.sun_set);
  setDate0('Today');
  setAbbr0(data.consolidated_weather[0].weather_state_abbr);
  setImg0('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[0].weather_state_abbr + '.png');
  setArrow0('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setStateName0(data.consolidated_weather[0].weather_state_name);
  setMax0(Math.trunc(data.consolidated_weather[0].max_temp));  
  setWindSpeed0(Math.trunc(data.consolidated_weather[0].wind_speed));
  setHumidity0(Math.trunc(data.consolidated_weather[0].humidity));
  setVisibility0(Math.round((data.consolidated_weather[0].visibility)*10)/10);
  setAirPressure0(Math.trunc(data.consolidated_weather[0].air_pressure));
  setConfidence0(Math.trunc(data.consolidated_weather[0].predictability));
  setMin0(Math.trunc(data.consolidated_weather[0].min_temp)); 

  setCity1(data.title);
  setDate1('Tomorrow');
  setAbbr1(data.consolidated_weather[1].weather_state_abbr);
  setImg1('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[1].weather_state_abbr + '.png');
  setArrow1('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setStateName1(data.consolidated_weather[1].weather_state_name);
  setMax1(Math.trunc(data.consolidated_weather[1].max_temp));  
  setWindSpeed1(Math.trunc(data.consolidated_weather[1].wind_speed));
  setHumidity1(Math.trunc(data.consolidated_weather[1].humidity));
  setVisibility1(Math.round((data.consolidated_weather[1].visibility)*10)/10);
  setAirPressure1(Math.trunc(data.consolidated_weather[1].air_pressure));
  setConfidence1(Math.trunc(data.consolidated_weather[1].predictability));
  setMin1(Math.trunc(data.consolidated_weather[1].min_temp));

  setCity2(data.title);
  setDate2(dateTimeFormat1.format(dateC));
  setAbbr2(data.consolidated_weather[2].weather_state_abbr);
  setImg2('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[2].weather_state_abbr + '.png');
  setArrow2('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setStateName2(data.consolidated_weather[2].weather_state_name);
  setMax2(Math.trunc(data.consolidated_weather[2].max_temp));  
  setWindSpeed2(Math.trunc(data.consolidated_weather[2].wind_speed));
  setHumidity2(Math.trunc(data.consolidated_weather[2].humidity));
  setVisibility2(Math.round((data.consolidated_weather[2].visibility)*10)/10);
  setAirPressure2(Math.trunc(data.consolidated_weather[2].air_pressure));
  setConfidence2(Math.trunc(data.consolidated_weather[2].predictability));
  setMin2(Math.trunc(data.consolidated_weather[2].min_temp));

  setCity3(data.title);
  setDate3(dateTimeFormat1.format(dateD));
  setAbbr3(data.consolidated_weather[3].weather_state_abbr);
  setImg3('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[3].weather_state_abbr + '.png');
  setArrow3('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setStateName3(data.consolidated_weather[3].weather_state_name);
  setMax3(Math.trunc(data.consolidated_weather[3].max_temp));  
  setWindSpeed3(Math.trunc(data.consolidated_weather[3].wind_speed));
  setHumidity3(Math.trunc(data.consolidated_weather[3].humidity));
  setVisibility3(Math.round((data.consolidated_weather[3].visibility)*10)/10);
  setAirPressure3(Math.trunc(data.consolidated_weather[3].air_pressure));
  setConfidence3(Math.trunc(data.consolidated_weather[3].predictability));
  setMin3(Math.trunc(data.consolidated_weather[3].min_temp));

  setCity4(data.title);
  setDate4(dateTimeFormat1.format(dateE));
  setAbbr4(data.consolidated_weather[4].weather_state_abbr);
  setImg4('https://www.metaweather.com/static/img/weather/png/64/' + data.consolidated_weather[4].weather_state_abbr + '.png');
  setArrow4('https://www.torahmitsion.fr/wp-content/uploads/2021/11/fd.png');
  setStateName4(data.consolidated_weather[4].weather_state_name);
  setMax4(Math.trunc(data.consolidated_weather[4].max_temp));  
  setWindSpeed4(Math.trunc(data.consolidated_weather[4].wind_speed));
  setHumidity4(Math.trunc(data.consolidated_weather[4].humidity));
  setVisibility4(Math.round((data.consolidated_weather[4].visibility)*10)/10);
  setAirPressure4(Math.trunc(data.consolidated_weather[4].air_pressure));
  setConfidence4(Math.trunc(data.consolidated_weather[4].predictability));
  setMin4(Math.trunc(data.consolidated_weather[4].min_temp));

})
},[url]);


const dayjs = require('dayjs');
const day = dayjs().format('ddd D MMM').toString('Today');
const day1 = dayjs().add(1, 'day').format('ddd D MMM');
 console.log(day);
 console.log(day1);
 


const options2 = { hour: 'numeric', minute: 'numeric', timeZone: timeZone0 };
const time = new Date(time0).toLocaleString('en-EN', options2);
const sunrise = new Date(sunrise0).toLocaleString('en-EN', options2);
const sunset = new Date(sunset0).toLocaleString('en-EN', options2);

    return (
        <>
    
    <div className='languages'>
       <Link to='/he'> <img src='https://www.torahmitsion.fr/wp-content/uploads/2021/11/197577-1-1.png'/></Link> &nbsp; <Link to='/'><img src='https://www.torahmitsion.fr/wp-content/uploads/2021/11/american-us-flag-icon-8327.png'/> </Link>    
    </div>
       <div>
            <form style={{textAlign: 'right', margin: '30px'}} >
        
               
        <p>
               
                <select  onChange={(e) => {setMonState(e.target.value)}} name="city" id="city-select">
                <option value="">{t('Select a city')}</option>
                        <optgroup label={t('Europe')}>
                                
                                <option  value="610264">{t('Marseille')}</option>
                                <option  value="753692">{t('Barcelona')}</option>
                                <option  value="721943">{t('Rome')}</option>
                        </optgroup>
                        
                        <optgroup label={t('North America')}>
                                <option  value="2459115">{t('New York')}</option>
                                <option   value="2442047">{t('Los Angeles')}</option>
                        </optgroup>
                        <optgroup label={t('Asia')}>
                                <option value="560743">{t('Dublin')}</option>
                        </optgroup>
                        <optgroup label={t('Africa')}>
                                <option value="1532755">{t('Casablanca The Best')}</option>
                        </optgroup>
                        
                </select>
        </p>

       
</form>
        </div>
        <div>
      
        <div className='hour'>
        <p><strong>{t('Time')}</strong> &nbsp; {time}.</p>
        <p><strong>{t('Sunrise')}</strong> &nbsp; {sunrise}.</p>
        <p><strong>{t('Sunset')}</strong> &nbsp; {sunset}.</p>
        </div>

        <h1 className='home-title'>{t(city0)},<span style={{fontSize: '16px', fontWeight: '500'}}> {t(city0)}  </span></h1>

        
<div className="container-cards">

<Link style={{textDecoration : 'none', color: 'black'}}
    to= 'card1/day'
    state={[{date0}, {stateName0}, {img0}, {min0}, {max0},{arrow0}, {windSpeed0}, {humidity0}, {visibility0}, {airPressure0}, {confidence0}, {city0}]
 }> 
    

<Card

day={date0} 
imageWeather={img0} 
weatherName={t(stateName0)} 
min={min0}
max={max0}
arrow ={arrow0} 
windSpeed={windSpeed0}
humidity={humidity0}
visibility={visibility0}
pressure={airPressure0}
confidence={confidence0}

    />
    </Link>



<Link style={{textDecoration : 'none', color: 'black'}}
    to= 'card1/tomorrow'
    state={[{date1}, {stateName1}, {img1}, {min1}, {max1},{arrow1}, {windSpeed1}, {humidity1}, {visibility1}, {airPressure1}, {confidence1}, {city1}]
 }> 

<Card 

day={date1} 
imageWeather={img1} 
weatherName={t(stateName1)} 
min={min1}
max={max1}
arrow ={arrow1} 
windSpeed={windSpeed1}
humidity={humidity1}
visibility={visibility1}
pressure={airPressure1}
confidence={confidence1}
    />

</Link>

<Link style={{textDecoration : 'none', color: 'black'}}
    to= 'card1/two-days-later'
    state={[{date2}, {stateName2}, {img2}, {min2}, {max2},{arrow2}, {windSpeed2}, {humidity2}, {visibility2}, {airPressure2}, {confidence2}, {city2}]
 }> 

<Card 
 
 day={date2} 
 imageWeather={img2} 
 weatherName={t(stateName2)}
 min={min2}
 max={max2}
 arrow ={arrow2} 
 windSpeed={windSpeed2}
 humidity={humidity2}
 visibility={visibility2}
 pressure={airPressure2}
 confidence={confidence2}
     />
</Link>

<Link style={{textDecoration : 'none', color: 'black'}}
    to= 'card1/three-days-later'
    state={[{date3}, {stateName3}, {img3}, {min3}, {max3},{arrow3}, {windSpeed3}, {humidity3}, {visibility3}, {airPressure3}, {confidence3}, {city3}]
 }> 

<Card 
 
 day={date3} 
 imageWeather={img3} 
 weatherName={t(stateName3)}
 min={min3}
 max={max3}
 arrow ={arrow3} 
 windSpeed={windSpeed3}
 humidity={humidity3}
 visibility={visibility3}
 pressure={airPressure3}
 confidence={confidence3}
     />
</Link>


<Link style={{textDecoration : 'none', color: 'black'}}
    to= 'card1/four-days-later'
    state={[{date4}, {stateName4}, {img4}, {min4}, {max4},{arrow4}, {windSpeed4}, {humidity4}, {visibility4}, {airPressure4}, {confidence4}, {city4}]
 }> 

<Card 
 
 day={date4} 
 imageWeather={img4} 
 weatherName={t(stateName4)} 
 min={min4}
 max={max4}
 arrow ={arrow4} 
 windSpeed={windSpeed4}
 humidity={humidity4}
 visibility={visibility4}
 pressure={airPressure4}
 confidence={confidence4}
     />  
     </Link> 
              

            </div>
        </div>
        </>
    )
}