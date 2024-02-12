import { dbInit } from '../models/dbInit.js'

export const VerifyUsers = {


    verify : (req, res, next) =>{

        let isOk = false

        //dans mon bussineess, le user a le droit de blablabla si userName_idUser est valable
        let userName = req.body.userName
        let userId = req.body.userId

        dbInit.getDb().get('SELECT * FROM users WHERE id = :id AND name = :name', { ":id" : userId, ":name" : userName}, (err, row) => 
        {

            console.log(err)
            console.log(row)


            if(err) return res.status(500).json({error : err})

            if(row == undefined) isOk = false
            else isOk = true

            

            //-> si le users n'est pas bon/connecter/ etc...
            if(isOk == false)
            {
                return res.status(401).json({
                    error : 401,
                    message : "Vous n'êtes pas authorisé à acceder a cette page"
                })
            }
            else
            {
                if(row.id == userId && row.name == userName)
                    next()
                else //techniquement c'est un "never"
                    return res.status(500).json({error : err})
            }

        })

    }
}