const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')
// const equipments = require('./app/controllers/equipments')

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id',  instructors.show)
routes.get('/instructors/:id/edit',  instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id',  members.show)
routes.get('/members/:id/edit',  members.edit)
routes.post("/members", members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)

// routes.get('/equipments', equipments.index)
// routes.get('/equipments/create', equipments.create)
// routes.get('/equipments/:id',  equipments.show)
// routes.get('/equipments/:id/edit',  equipments.edit)
// routes.post("/equipments", equipments.post)
// routes.put("/equipments", equipments.put)
// routes.delete("/equipments", equipments.delete)


module.exports = routes