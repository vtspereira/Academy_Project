const { age, date } = require('../../lib/utils')

const Equipment = require('../models/Equipments')

module.exports = {

    index(req, res) {

            Equipment.all(function(equipments) {
                return res.render("equipments/index", { equipments })
            })


    },
    create(req, res) {

        Equipment.instructorsSelectOptions(function(options){
            return res.render("equipments/create", { instructorOptions: options  })
        })

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields!')
        }

        Equipment.create(req.body, function(member) {
            return res.redirect(`/equipments`)
        })

    },
    show(req, res) {

        Equipment.find(req.params.id, function(member){
            if(!member) return res.send("Equipment not found!")

            member.birth = date(member.birth).birthDay

            return res.render("equipments/show", { member })
        })

    },
    edit(req, res) {

        Equipment.find(req.params.id, function(member){
            if(!member) return res.send("Equipment not found!")

            member.birth = date(member.birth).iso

            return res.render("equipments/edit", { member })  
        })   

    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields!')
        }

        Equipment.update(req.body, function() {
            return res.redirect(`/equipments`)
        })

    },
    delete(req, res) {

        Equipment.delete(req.body.id, function() {
            return res.redirect(`/equipments`)
        })

    },

}