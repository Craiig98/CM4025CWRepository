import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'


//const uri = "mongodb+srv://MyDBAdmin:I3nmOKU2Ign3a7te@cluster0.zh61e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri.substring(1, config.mongoUri.length - 1), { useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true, dbName: "myFirstDatabase" })
mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})


app.listen(config.port, (err) => {
 if (err) {
    console.log(err)
 }
    console.info('Server started on port %s.', config.port)
})
