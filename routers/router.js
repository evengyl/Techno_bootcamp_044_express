import express from 'express';
import { homePageController } from '../controllers/homePage.controller.js'
import { categController } from '../controllers/categ.controller.js';
import { userController } from '../controllers/user.controller.js'
import { contactController } from '../controllers/contact.controller.js';

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
expressRouter.post("/categ", categController.createOne)
expressRouter.patch("/categ/:id", categController.updateOne)
expressRouter.delete("/categ/:id", categController.deleteOne)


expressRouter.get("/contact", contactController.getForm)
expressRouter.post("/contact", contactController.postMessage)


//CRUD users
expressRouter.get("/users", userController.getAll)
expressRouter.get("/users/:id", userController.getOne)
expressRouter.post("/users", userController.createOne)
expressRouter.put("/users/:id", userController.updateOne)
expressRouter.delete("/users/:id", userController.deleteOne)

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