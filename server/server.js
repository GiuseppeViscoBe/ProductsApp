import express from 'express'
import productsRouter from './router/products.router.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config() 


const app = express()
const PORT = process.env.PORT || 8000
 
app.use(express.json());

app.use('/api/products ', productsRouter)


app.listen(PORT, () => {
    connectDB()
    console.log('App listening on port: ' + PORT)
})