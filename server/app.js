const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')


const app = express();

// Connect to mlab db

mongoose.connect('mongodb+srv://aaron:12345@cluster0-eig6c.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=>{
  console.log('connected to db')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, ()=>{
  console.log('now listening for requests on port 4000')
})
