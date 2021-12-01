import React from "react"
import './Card.css'
import { useTranslation } from "react-i18next";


export default function Card(props) {

    const { t, i18n } = useTranslation();

    return (


        <div className="card">
        
             <h4>{props.day}</h4>

             <img src={props.imageWeather} />{props.weatherName}
             <br/><br/>

             <p>{t('Min')}: {props.min}°C</p>
             <p>{t('Max')}: {props.max}°C</p>
            
            
             <p> <img style={{   width: '10px', transform: 'rotate(27deg)'}} src={props.arrow}/> {props.windSpeed}mph
               </p>
              <br/>

              <p><strong>{t('Humidity')}</strong></p>
              <p>{props.humidity}%</p>
           
              <p><strong>{t('Visibility')}</strong></p>
              <p>{props.visibility} {t('miles')}</p>
           
              <p><strong>{t('Pressure')}</strong></p>
              <p>{props.pressure}mb</p>
              <br/>

              <p><strong>{t('Confidence')}</strong></p>
              <p>{props.confidence}%</p>
              <br/>
        </div>

    )
}
