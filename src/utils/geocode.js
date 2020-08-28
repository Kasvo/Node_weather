const request = require('request')


const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2Fzdm8iLCJhIjoiY2tibmtnamh1MTA1djJ0cjV0Z2xlYXc1MyJ9.c1JNJIJ069LL47rmIMs3TQ&limit=1'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to location services!!",undefined)
        }else if(response.body.message){
            callback("unable get location!!",undefined)
        }else if(response.body.features.length==0){
            callback("unable to get location!!",undefined)
        }else{
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            callback(undefined,{
                latitude,
                longitude,
                place : response.body.features[0].place_name,
            })
        }
            
    })

}

module.exports = geocode
