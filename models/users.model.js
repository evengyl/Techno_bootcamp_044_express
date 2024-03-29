import { dbInit } from './dbInit.js'
import bcrypt from 'bcrypt'

export const usersModel = {


    getAll : (res) => {

        dbInit.getDb().all('SELECT * FROM users', (err, row) => {
            if(err) return res.status(500).json({ error: err })

            return res.json(row)
        })

    },


    getOneById : (id, res) => {

        dbInit.getDb().get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
            if(err) return res.status(500).json({ error: err })

            return res.json(row)
        })

    },

    
    getOneByName : (name, res) => {

        dbInit.getDb().get('SELECT * FROM users WHERE name = :name', { ":name" : name }, (err, row) => {
            if(err) return res.status(500).json({ error: err })

            return res.json(row)
        })
    },


    createUser : (user, res) => {
        let newUserName = user.name

        //hash du password
        const saltRound = 13
        const passwordToHash = user.password
        const salt = bcrypt.genSaltSync(saltRound)
        const passwordHash = bcrypt.hashSync(passwordToHash, salt)

        dbInit.getDb().run(`INSERT INTO users (name, password) VALUES ("${newUserName}", "${passwordHash}")`, function (err, row){

            if(err) return res.status(500).json({ error: err })

            return res.json({
                "message": "success",
                "id" : this.lastID
            })
        })

    },

    updateUser : (nameUserToUpdate, idUser, res) => {
        dbInit.getDb().get('SELECT id FROM users WHERE id = :id', { ":id" : idUser}, function (err, row){

            if(err) return res.status(500).json({ error: err })

            if(row == undefined) return res.status(404).json({ error: "Cet utilisateur n'existe pas" })
            
            
            //ici j'ai le user à coup sur !
            dbInit.getDb().run('UPDATE users SET name = :name WHERE id = :id', 
            { ":name" : nameUserToUpdate, ":id" : idUser}, function(err, result){

                if(err) return res.status(500).json({ error: err })

                return res.json({
                    id : idUser,
                    message : "User updated successfully"
                })

            })

        })
    },


    deleteOne : (idToDelete, res) => {
        dbInit.getDb().run("DELETE FROM users WHERE id = :id", { ":id" : idToDelete }, function(err, result){

            if(err) return res.status(500).json({ error: err })

            return res.json({ 
                id : idToDelete,
                message : "User deleted successfully"
            })
        })
    }



}