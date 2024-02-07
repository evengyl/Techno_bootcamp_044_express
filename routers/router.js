import express from 'express';
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

//FAKE SOURCE DE DATAS
let users = [
    { id : 1, name : "Quentin" },
    { id : 2, name : "Colosse" },
    { id : 3, name : "Thibault" },
    { id : 4, name : "Marc"}
]


expressRouter.get("/", (req, res) => {
    res.render("homePage.ejs")
})


expressRouter.get("/categ", (req, res) => {
    
    let categs = [
        { id : 1, name : "categ 1"},
        { id : 2, name : "categ 2"},
        { id : 3, name : "categ 3"},
    ]

    res.json(categs)
})


expressRouter.post("/categ", (req, res) => {
    let newCateg = req.body
})


expressRouter.post("/contact", (req, res) => {
    console.log(req.body)
    res.send("bien recu")
})


//CRUD users
expressRouter.get("/users", (req, res) => {
    res.json(users)
})

expressRouter.get("/users/:id", (req, res) => {
    let idToFind = req.params.id
    let userToFind = users.find(user => user.id == idToFind)

    res.json(userToFind)
})


expressRouter.post("/users", (req, res) => {
    let newUser = req.body
    newUser.id = Math.random()*100
    res.json(newUser)
})


expressRouter.put("/users/:id", (req, res) => {
    let idToFind = req.params.id
    let userToFind = users.find(user => user.id == idToFind)
    userToFind.name = "Autre user mis à jour"
    res.json(userToFind)
})


expressRouter.delete("/users/:id", (req, res) => {
    let idToFind = req.params.id
    let userToFind = users.find(user => user.id == idToFind)
    userToFind.name = "User deleted"
    res.json(userToFind)
})




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
