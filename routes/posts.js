const express = require("express");
const router = express.Router();
const posts = require("../data/posts.js")

// BASE PATH FOR THIS ROUTER IS /api/posts

//////////////POSTS//////////////
router.get('', (req, res) => {
    res.json(posts)
  })
  
  router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id)
    if (post) res.json(post)
    else throw "Resource Not Found"
  })
  
  // Create Post
  router.post('', (req, res) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.userId && req.body.title && req.body.content){
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId:  req.body.userId,
        title: req.body.title,
        content: req.body.content
      }
  
      posts.push(post)
      res.json(post)
    } else {
      throw "Insufficient Data"
    }
  })
  
  //Update a Post
  router.patch('/:id', (req, res) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        // req.body holds the update for the user
        for (const key in req.body) {
          // routerlying the req.body keys to the existing user keys, overwriting them
          posts[i][key] = req.body[key]
        }
        return true
      }
    })
  
    if (post) res.json(post)
    else throw "Resource Not Found"
  })
  
  router.delete("/:id", (req, res) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1)
        return true
      }
    })
  
    if (post) res.json(post);
    else throw 'Resource Not Found'
  })
  
  
  router.get("/", (req, res) => {
    res.send("Work in progress!")
  })
  

module.exports = router