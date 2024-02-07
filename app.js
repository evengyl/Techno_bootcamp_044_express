import express from 'express'
import expressRouter from './routers/router.js'


const app = express()

app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set("views", "./views")


app.use("", expressRouter)



const port = 3000
app.listen(port, console.log(`Le serveur écoute sur le port ${port}`))