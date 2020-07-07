const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`SELECT * 
        FROM equipments 
        ORDER BY priority DESC`, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows)
        });
    },
    create(data, callback) {

        const query = `
            INSERT INTO equipments (
                name,
                observation,
                priority,
                instructor_id
            ) VALUES ($1, $2, $3, $4)
            RETURNING id 
        `
        const values = [
            data.name,
            data.observation,
            data.priority,
            data.instructor
         ]

        db.query(query, values, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {

        db.query(`
            SELECT equipments.*
            FROM equipments
            WHERE equipments.id = $1`, [id], function (err, results) {
                if (err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })
    },
    findBy(filter, callback){

        db.query(`SELECT equipments.*
        FROM equipments 
        WHERE equipments.name ILIKE '%${filter}%'
        OR equipments.email ILIKE '%${filter}%'
        GROUP BY equipments.id 
        ORDER BY id`, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE equipments SET 
                name =($1),
                observation =($2),
                priority =($3),
                instructor_id =($4)
            WHERE id = $5
        `

        const values = [
            data.name,
            data.observation,
            data.priority,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(err, results){
             if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM equipments WHERE id = $1`, [id], function(err, result){
             if (err) throw `Database Error! ${err}`

             return callback()
        })
    },
    instructorsSelectOptions(callback) {
        db.query(`SELECT name,id FROM instructors`, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
}