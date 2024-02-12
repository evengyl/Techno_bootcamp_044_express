import express from 'express';
import { homePageController } from '../controllers/homePage.controller.js'
import { categController } from '../controllers/categ.controller.js';
import { userController } from '../controllers/user.controller.js'
import { contactController } from '../controllers/contact.controller.js';

//middlewares
import { VerifyUsers } from '../middlewares/verify_users.middle.js'
import { registerUserComplexeValidator } from '../middlewares/validators/createUserComplexe.validator.js'
import { bodyValidation } from '../middlewares/body-validator.js'

/*explain middleswares
    (req, res)
    (req, res, next) --> next()

*/

//pour plus d'infos sur les export import de ES6 -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export


//dans le app.js, je suis a la source du serveur...
/*
DOnc juste avec app.VERB, il enregistre dans le .Router automatiquement
ici je n'ai pas le app() et je ne vais recréer un serveur ici...
donc je vais juste chercher le router d'express et je le rempli ici...
*/
const expressRouter = express.Router();

//res.send -> text/plain
//res.json -> text/json
//res.render -> text/html



expressRouter.get("/", homePageController.renderView)

expressRouter.get("/categ", categController.getAll)
expressRouter.get("/categ/:id", categController.getOne)
expressRouter.post("/categ", VerifyUsers.verify, categController.createOne)//* user registred only
expressRouter.patch("/categ/:id", VerifyUsers.verify, categController.updateOne)//* user registred only
expressRouter.delete("/categ/:id", VerifyUsers.verify, categController.deleteOne)//* user registred only


expressRouter.get("/contact", contactController.getForm)
expressRouter.post("/contact", VerifyUsers.verify, contactController.postMessage)//* user registred only


//CRUD users
expressRouter.get("/users", userController.getAll)
expressRouter.get("/users/:id([0-9]*)", VerifyUsers.verify, userController.getOne)  // /users/1 ou users/tutu //* user registred only
expressRouter.get("/users/:name([a-zA-Z\-]*)", VerifyUsers.verify, userController.getOneByName) //* user registred only
expressRouter.post("/users", VerifyUsers.verify, userController.createOne)//* user registred only

//Validtors middleware avec YUP
expressRouter.post("/usersComplexe", bodyValidation(registerUserComplexeValidator), userController.createOne)

expressRouter.put("/users/:id", VerifyUsers.verify, userController.updateOne)//* user registred only
expressRouter.delete("/users/:id", VerifyUsers.verify, userController.deleteOne)//* user registred only

//404 middleware
expressRouter.all("*", (req, res) =>{
    res.status(404).send("404 Not Found")
})

//handler error global middleware
expressRouter.use((err, req, res, next) => {
    console.log("Error Url ", req.url)
    console.log("Error Message", err.message)
    res.status(500).send("Erreur Global :  " + err.message)
})

export default expressRouter