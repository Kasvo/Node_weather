const request = require('request')

const forecast = (lat,lon,callback)=>{
    console.log("forecast")
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&%20exclude=hourly,daily&appid=49f2b6c208d488ceabe45cb0a30e362b&units=metric'
    
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback("Unable to connect to weather service!",undefined)
    }else if(response.body.message){
        callback("Unable to find location",undefined)
    }else{
        callback(undefined,"Todays temp : "+response.body.current.temp)
    }  

    })
}

module.exports = forecast