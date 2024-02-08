import { usersModel } from "../models/users.model.js"


export const userController = {
    getAll : (req, res) => {

        //oui ça pique les yeux !!!
        usersModel.getAll(res)

    },

    getOne : (req, res) => {
        let idToFind = req.params.id
        console.log("Get By Id Called")
        usersModel.getOneById(idToFind, res)
    },

    getOneByName : (req, res) => {
        let nameTofind = req.params.name
        console.log("Get By Name Called")
        usersModel.getOneByName(nameTofind, res)
    },

    createOne : (req, res) => {
        let newUser = req.body
        usersModel.createUser(newUser, res)
    },

    updateOne : (req, res) => {
        let idToFind = req.params.id
        let nameUserToUpdate = req.body.name
        usersModel.updateUser(nameUserToUpdate, idToFind, res)
    },

    deleteOne : (req, res) => {
        let idToFind = req.params.id
        usersModel.deleteOne(idToFind, res)
    }
}