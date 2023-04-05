const router = require('express').Router()
// const client = require('../connection')
const bcrypt = require("bcryptjs");
const config = require('../config/auth.config')
const jwt = require("jsonwebtoken")
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig["development"]);


//Register
router.post('/register', async (req, res) => {
    const userbaru = req.body //inisiasi input data
    // const user = await client.query((`Select * from users where email = '${req.body.email}'`))
    const user = await knex("users").where("email", userbaru['email'])
    if(user.length == 0){
        // res.send("aman")
            
            const hashpassword = bcrypt.hashSync(userbaru['password'], 8)
            userbaru['password'] = hashpassword
            // res.send(hashpassword)
            // client.query((`insert into users(username, email, password) values ('${username}', '${email}', '${hashpassword}')`), (err, result) => {
            //     if(err){
            //         res.send(err.message)
            //     } else {
            //         res.send("Data sudah terinput")
            //     }
            // })
            knex("users").insert(userbaru).then(() => {
                return res.status(200).json(userbaru)
            }).catch((err) => {
                // console.error(err);
                return res.status(500).json({ success: false, message: err });
              });
    } else {
        return res.json({ success: false, message: "Email sudah Terpakai" });
    }
})

//Login
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    // const user = await client.query((`Select * from users where email = '${email}'`))
    const user = await knex("users").where("email", email)
    if(user.length == 0){
        return res.json({ success: false, message: "Email tidak ditemukan" });
    } else {
        // return res.json(user[0].password)
        const validPassword = bcrypt.compareSync(password, user[0].password)
        if(validPassword){
            // res.send("aman")
            const accessToken = jwt.sign(
                {
                    id: user[0].id,
            }, config.secret, { expiresIn: "1d"})
            const {id, username} = user[0]
           return res.status(200).json({id, username, accessToken})
        } else {
            return res.status(500).json({ success: false, message: err });
        }
    }
})



module.exports = router