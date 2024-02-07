import { usersModel } from "../models/users.model.js"


export const userController = {
    getAll : (req, res) => {

        let listAllUsers = usersModel.getAll()

        res.json(listAllUsers)
    },

    getOne : (req, res) => {
        let idToFind = req.params.id
        let userToFind = users.find(user => user.id == idToFind)
    
        res.json(userToFind)
    },

    createOne : (req, res) => {
        let newUser = req.body
        newUser.id = Math.random()*100
        res.json(newUser)
    },

    updateOne : (req, res) => {
        let idToFind = req.params.id
        let userToFind = users.find(user => user.id == idToFind)
        userToFind.name = "Autre user mis à jour"
        res.json(userToFind)
    },

    deleteOne : (req, res) => {
        let idToFind = req.params.id
        let userToFind = users.find(user => user.id == idToFind)
        userToFind.name = "User deleted"
        res.json(userToFind)
    }
}