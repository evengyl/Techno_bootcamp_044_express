import { categsModel } from "../models/categ.model.js"

export const categController = {

    getAll : (req, res) => {
        //pour l'exemple, voici le req.user
        console.log(req.user)
        categsModel.getAll(res)
    },

    getOne : (req, res) => {
        let id = req.params.id
        categsModel.getOneById(id, res)
    },

    createOne : (req, res) => {
        //DTO to MODEL
        //DTO = Data Transfer Object
        let newCateg = {
            name : req.body.name
        }
        categsModel.createOne(newCateg, res)
    },

    updateOne : (req, res) => {
        let idToUpdate = req.params.id
        let updatedCategName = req.body.name
        categsModel.updateOne(idToUpdate, updatedCategName, res)
    },

    deleteOne : (req, res) => {
        let idToDelete = req.params.id
        categsModel.deleteOne(idToDelete, res)
    }
}