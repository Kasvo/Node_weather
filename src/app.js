const express = require('express')
const path =  require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
//Setting up Static dir 
const publicDir = path.join(__dirname,'../public')
app.use(express.static(publicDir))

//setting up new view dir
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setting Up Hbs : handlebars for dynamic page
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setting up urls
app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather App",
        name : "Kasvo"
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : "Help Page",
        name : "kasvo corp"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if (error){
            return res.send({error})
            }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location : place,
                address : req.query.address,
                forecast : forecastdata,
        
            })
        })
    })
    


}) 

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search element"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:"Kasvo",
        title : "About Page"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        ErrorMessage : "Help Page Not Found",
        title : "Error 404",
        name : "kasvo"
    })
})


app.get('*',(req,res)=>{
    res.render('error404',{
        ErrorMessage : "page not found ",
        title : "Error 404",
        name : "kasvo"
    })
}) 


app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})