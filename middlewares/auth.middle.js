import jwt from 'jsonwebtoken'
import { SHA3 } from 'sha3';

const secret = "??_&42_onvaecrireunephrasesecrete_123456"


export const AuthMiddleware = {

    authenticate : (req, res, next) => {
        const datas = {
            userName : req.body.userName,
            userId : req.body.userId
        }

        const hash = new SHA3(512);

        hash.update(secret);
        let secretHashed = hash.digest('hex');


        const options = {
            algorithm : "HS512",
            expiresIn : "2h",
        }

        jwt.sign(datas, secretHashed, options, (error, token) => {

            if(error) return res.status(500).json({ error : error, message : "Erreur lors de la génération du JWT"})

            res.json({
                "token" : token
            })
        })
    },


    verify : (req, res, next) => {

        if(req.headers["authorization"] != undefined)
        {
        
            const tokenStoredInHttpReq = req.headers["authorization"].split(" ")[1]
            //on a en vrai Bearer ey_zijognzlf,nqseufjgbzmoùejfe,ipoktn,zpùkfeoezirhg
            //split, coupe une chaine poour faire un tableau à tout "tel" endroit
            //[0] "Bearer" [1] "ey_zijognzlf,nqseufjgbzmoùejfe,ipoktn,zpùkfeoezirhg"


            const optionsVerify = {

            }


            const hash = new SHA3(512);

            hash.update(secret);
            let secretHashed = hash.digest('hex');


            
            jwt.verify(tokenStoredInHttpReq, secretHashed, optionsVerify, (error, datas) => {

                if(error) return res.status(500).json({ error : error, message : "Erreur lors vérification de la signature"})

                req.user = datas
                next()
            })
        }
        else return res.status(401).json({ message : "Ressource protégée"})

    }
}