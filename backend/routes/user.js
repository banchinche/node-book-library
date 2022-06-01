const express = require('express')
const router = express.Router()
const db = require('../database')

router.get("/me", function(req, res) {
    db.User.findByPk(req.user.id)
        .then( user => {
            res.status(200).send(JSON.stringify(user));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.put("/me", function(req, res) {
    db.User.update({
        email: req.body.email,
        password: req.body.password
    }, 
    {
        where: {
          id: req.user.id
        }
    })
        .then( user => {
            res.status(200).send(user);
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.get("/books", function(req, res) {
    db.User.findByPk(req.user.id,
        {
            include: db.Book
        })
        .then( books => {
            res.status(200).send(JSON.stringify(books));
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.put("/books", function(req, res) {
    db.UserBook.destroy({
        where: {UserId: req.user.id} 
    })
    .then(() => {
            if (req.body.books) {
                const associations = req.body.books.map((id) => ({"UserId": req.user.id, "BookId": id}))
                db.UserBook.bulkCreate(associations)
                .then(userBooks => {
                    db.User.findByPk(req.user.id,
                        {
                            include: db.Book
                        })
                        .then( books => {
                            res.status(200).send(JSON.stringify(books));
                        })
                        .catch( error => {
                            res.status(500).send(JSON.stringify(error));
                        })
                })
                .catch(error => {
                    res.status(500).send(JSON.stringify(error));
                })
            }
    })
    .catch(error => {
            res.status(500).send(JSON.stringify(error));
    })
})

module.exports = router
