const express = require("express");
const router = express.Router();
const admins = require("../data/admins.js")
const posts = require("../data/posts.js")
// BASE PATH FOR THIS ROUTER IS /api/admins


//////////////Admins//////////////
// Creating a simple GET route for individual admin,
// using a route parameter for the unique id.

router.get('/', (req, res) => {
    res.json(admins)
})
  
// Creating a simple GET route for individual admins,
// using a route parameter for the unique id.
router.get('/:id', (req, res) => {
const admin = admins.find(u => u.id == req.params.id)
if (admin) res.json(admin)
else throw "Resource Not Found"
})

// Get admin's posts
router.get("/:id/posts", (req, res) => {
    const adminsPosts = posts.filter((p) => p.adminId == req.params.id)

    res.json(adminsPosts)
})


// Create Admin
router.post('', (req, res) => {
// Within the POST request route, we create a new
// admin with the data given by the client.
// We should also do some more robust validation here,
// but this is just an example for now.
if (req.body.name && req.body.username && req.body.email){
    const foundAdmin = admins.find(u => u.username === req.body.username)
    if (foundAdmin,om) {
        res.json({ error: 'Username Already Taken' })
    return
    }

    const admin = {
    id: admins[admins.length - 1].id + 1,
    name:  req.body.name,
    username: req.body.username,
    email: req.body.email
    }

    admins.push(admin)
    res.json(admin)
} else {
    throw "Insufficient Data"
}
})

router.patch('/:id', (req, res) => {
// Within the PATCH request route, we allow the client
// to make changes to an existing admins in the database.
const admin = admins.find((u, i) => {
    if (u.id == req.params.id) {
    // req.body holds the update for the admins
    for (const key in req.body) {
        // routerlying the req.body keys to the existing admins keys, overwriting them
        admins[i][key] = req.body[key]
    }
    return true
    }
})

if (admin) res.json(admin)
else throw "Resource Not Found"
})

router.delete("/:id", (req, res) => {
    const admin = admin.find((u, i) => {
    if (u.id == req.params.id) {
        admins.splice(i, 1)
        return true
    }
})

const adminIndex = admins.findIndex(u => u.id == req.params.id)

if (userIndex !== -1){
    const deletedAdmin = admins[adminIndex]
    admins.splice(adminIndex, 1)
    res.json(deletedAdmin)
} else {
    throw "Resource Not Found"
}

})  

module.exports = router

