const express = require("express")
const router = express.Router()
const axios = require("axios")
const { isLiked, like, unlike } = require("../controllers/User")
const { create, FindByImdbIds, update } = require("../controllers/Comment")
const { createLikes, FindByImdbIdsLikes } = require("../controllers/Likes")
// const validate = require("../middlewares/validate")
const authenticate = require("../middlewares/authenticate")

// get generic recommendations (specific page number)
router.get("/:pageNumber", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US&page=${req.params.pageNumber}`)
        .then(response => {
            // console.log(response.data.results)
            res.send(response.data.results)
        })
        .catch(err => next(err))
})

// search for a movie by name
router.get("/search/:name", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8ef1582bce336c778e54d74f414322a7&query=${req.params.name}&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get details of movie by id
router.get("/details/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get recommendations based on liked movie
router.get("/recommendations/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/recommendations?api_key=8ef1582bce336c778e54d74f414322a7&language=en-US`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// get streaming services of movie by id
router.get("/details/streaming/:id", (req, res, next) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/watch/providers?api_key=8ef1582bce336c778e54d74f414322a7`).then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
        .catch(err => next(err))
})

// // router.route("/details/comment/:id").get(FindByImdbIds)
// // router.route("/details/:id").post(create)
// // router.route("/details/like/:id").get(FindByImdbIdsLikes)
// // router.route("/details/likes/:id").post(createLikes)

// check if movie is liked (user and movie IDs in request body)
router.get("/checklike", isLiked)
// add like to movie (user and movie IDs in request body)
router.post("/like", like)
// remove like from movie (user and movie IDs in request body)
router.post("/unlike", unlike)

// router
//     .route("/comment/:id")
//     .patch(authenticate, update)

module.exports = router
