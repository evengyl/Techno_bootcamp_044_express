import express from 'express'
import expressRouter from './routers/router.js'
import { dbInit } from './models/dbInit.js'
import cors from 'cors'

dbInit.init()
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set("views", "./views")

app.use("", expressRouter)

const port = 3000

app.listen(port, console.log(`Le serveur écoute sur le port ${port}`))
console.log(new Date())


/*
14 Fev, voir un middleware de droit autorisation { admin, moderetor, user, visitor}
13 fev aprem, voir Bcrypt 
*/