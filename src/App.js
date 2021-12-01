
import Home from './Container/Home/Home'
import HomeHe from './Container/Home/HomeHe'
import {Routes, Route} from 'react-router-dom'
import Card1 from './Container/Card/Card1';
import Card1He from './Container/Card/Card1He';
import Sources from './Container/Sources/Sources';
import { useTranslation } from "react-i18next";


function App() {


  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }

  return (
    <div className="App">

      <select className="custom-select" style={{width: 200}} onChange={changeLanguageHandler}>
        <option value="en" >English</option>
        <option value="he" >Hebrew</option>
      </select>



        <h1> {t('Info Weather')}</h1>
        
        <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/he' element={<HomeHe/>}/>
        <Route path='/card1/:slug' element={<Card1/>}/>
        <Route path='he/card1he/:slug' element={<Card1He/>}/>
        <Route path='/sources' element={<Sources/>}/> 

        </Routes>
        <h3>&copy; Weather, Inc. 2021. {t('We love weather')}</h3>
        
    </div>
  );
}

export default App;
