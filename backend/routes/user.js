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
            res.status(200).send();
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
    const associations = req.body.books.map((id) => ({"BookId": id, "UserId": req.user.id}))
    db.UserBook.bulkCreate(associations)
        .then( books => {
            res.status(200).send();
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

router.delete("/:id", function(req, res) {
    db.UserBook.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(204).send();
        })
        .catch( error => {
            res.status(500).send(JSON.stringify(error));
        })
})

module.exports = router