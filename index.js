const express= require('express')
const axios= require('axios')
const app=express()
const port=3000

const api= "https://jsonplaceholder.typicode.com/users/"
app.get('/users/:email',async(req,res)=>{
    const email=req.params.email
    try {
        const response= await axios.get(api)
        const users= response.data.filter(user=>user.email==email)
        if (users.length === 0) {
            res.status(404).send("User not found");
          } else {
            console.log("User(s) successfully retrieved from the API");
            res.status(200).send(users);
          }
      
    } catch (error) {
        res.status(500).send(err)
    }
})
app.get('/users',async(req,res)=>{
    try {
        const response= await axios.get(api)
        const users= response.data
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port,()=>{
    console.log("Server running on port "+port)
})