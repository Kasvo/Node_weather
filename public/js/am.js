
console.log("addin js file ")

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const address = document.querySelector('#address')
const temp = document.querySelector('#temp')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value

    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            address.textContent=data.error
        }else{
            address.textContent=data.location
            temp.textContent=data.forecast
        }
    })
})
    console.log(location)
}) 