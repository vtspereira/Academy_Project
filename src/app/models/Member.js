const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`SELECT * 
        FROM members 
        ORDER BY name ASC`, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows)
        });
    },
    create(data, callback) {

        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                password
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id 
        `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.password
         ]

        db.query(query, values, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {

        db.query(`
            SELECT members.*
            FROM members
            WHERE members.id = $1`, [id], function (err, results) {
                if (err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })
    },
    findBy(filter, callback){

        db.query(`SELECT members.*
        FROM members 
        WHERE members.name ILIKE '%${filter}%'
        OR members.email ILIKE '%${filter}%'
        GROUP BY members.id 
        ORDER BY id`, function (err, results) {
             if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE members SET 
                avatar_url =($1),
                name =($2),
                birth =($3),
                gender =($4),
                email =($5),
                password =($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.password,
            data.id
        ]

        db.query(query, values, function(err, results){
             if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, result){
             if (err) throw `Database Error! ${err}`

             return callback()
        })
    },
    
}