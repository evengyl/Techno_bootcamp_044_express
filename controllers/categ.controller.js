import { categsModel } from "../models/categ.model.js"

export const categController = {

    getAll : (req, res) => {
        let listAllCategs = categsModel.getAll()
        
        res.json(listAllCategs)
    },

    getOne : (req, res) => {
        let id = req.params.id
        
        let oneCateg = categsModel.getOne(id)
        res.json(oneCateg)
    },

    createOne : (req, res) => {
        let newCateg = req.body
        let idCreated = categsModel.createOne(newCateg)
        res.json({ message : "Category created successfully", code : true, "idCreated" : idCreated})
    },

    updateOne : (req, res) => {
        let id = req.params.id
        let updatedCateg = req.body
        let idUpdated = categsModel.updateOne(updatedCateg, id)
        res.json({ message : "Category updated successfully", code : true, idUpdated})
    },

    deleteOne : (req, res) => {
        let id = req.params.id
        let idDeleted = categsModel.deleteOne(id)
        res.json({ message : "Category deleted successfully", code : true, idDeleted})
    }
}