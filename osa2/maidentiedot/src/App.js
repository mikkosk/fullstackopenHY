import React, {useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {

  const [search, setNewSearch] = useState('')
  const [countries, setCountries] = useState('')
  const [allCountries, setAllCountries] = useState('')
  const [weather, setWeather] = useState('')
  const [capital, setCapital] = useState('Paris')

  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setCountries(allCountries.filter(country => 
      country.name.toUpperCase().includes(event.target.value.toUpperCase())))
  }


  useEffect (() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])

  
  return (
    <div>
      find countries
      <input 
        value={search}
        onChange={handleNewSearch}
      />
      <Countries countries={countries} 
        setCountries={setCountries} 
        weather={weather}
        setWeather={setWeather}
        capital={capital}
        setCapital={setCapital}/>
    </div>
    
  )
}

const Countries = ( {countries, setCountries, weather, setWeather, capital, setCapital} ) => {
  const weatherLink = 'http://api.apixu.com/v1/current.json?key=b37166a07066450e8f2111445191408&q='
  if(countries.length > 0) {setCapital(countries[0].capital)}
  const weatherLinkCapital = weatherLink.concat(capital)
  
    useEffect(() => {
      console.log('effect')
      axios
        .get(weatherLinkCapital)
        .then(response => {
        setWeather(response.data)
        }
      )
    },[weatherLinkCapital, setWeather])

  if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  if (countries.length > 1) {
    
    return (
      <div>
        {countries.map(country =>
        <div key={country.numericCode}>
          <p>{country.name}</p>
          <button onClick={() => setCountries([country])}>show</button>     
        </div>)}
      </div>
    )
  }

  if (countries.length === 1) {
    
    return (
      <div>
        {countries.map(country => 
        <div key={country.numericCode}>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={country.flag} alt={'haetun maan lippu'}/>
          <Weather weather={weather} />
          </div>
          )
          }
      </div>
    )
  }

  if (countries.length === 0) {
    return null
  }

}

const Weather = ({weather}) => {
  return (
    <div>
      {console.log(weather)}
      <h2>Weather in {weather.location.name}</h2>
      <p>temperature: {weather.current.temp_c}</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
      <p>wind: {weather.current.wind_kph}</p>
    </div>
  )

}


export default App;
