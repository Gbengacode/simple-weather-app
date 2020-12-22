window.addEventListener('load', () => {
    let long 
    let lat
    let time = document.querySelector('.location-timezone')
    let temperature = document.querySelector('.degree')
    let desc = document.querySelector('.temp-description')
    let icon = document.querySelector('.icon')
    let temperatureDegree = document.querySelector('.degree-section span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( p => {
            long = p.coords.longitude
            lat = p.coords.latitude
           
        const API_KEY = '87fd5186d06fc7f3bfb87e59f54646bb'
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`
        fetch( URL )
        .then(response => {
           return response.json()
        })
        .then(data => {
          const {timezone} = data
           getTimeZone(timezone)
          const { temp } = data.current
           getTemperature(temp)
          const {weather} = data.current
           getIcon(weather) 
           getDescription(weather)
           toggleDegree(temp)
        })
        .catch(err => {
            console.log(err.message)
        })
      
    })
      
      function getTimeZone (timezone) {
        time.textContent = timezone
      }
      function getIcon (weather) {
           weather.map(info => icon.src =`http://openweathermap.org/img/wn/${info.icon}@2x.png`)
      }
      function getTemperature (temp) {
          temperature.textContent = Math.floor(temp / 10)
      }
      function getDescription (weather) {
        weather.map(info =>
            desc.textContent = info.description
            )
      }
      function toggleDegree (temp) {
           temperatureDegree.addEventListener('click', () => {
               if(temperatureDegree.textContent === 'F'){
                   temperature.textContent = Math.floor(temp/10)
                   temperatureDegree.textContent = 'C'   
                   return
               }     
              let fahrenheit = (Math.floor(temp/10) * 9/5) + 32 
               temperature.textContent = fahrenheit
               temperatureDegree.textContent = 'F'
           })
      }
   }
   else{
       alert("sorry you cannot get your current weather location")
   }
})