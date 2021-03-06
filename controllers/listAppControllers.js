const { pool } = require("../dbConfig");

exports.GetList = function (req, res) {
    pool.query(
        'SELECT * FROM items',
        (error, results) => {
            res.render('list', {
                items: results.rows,
            
            });
        });

}

exports.AddNewToDo = function (req, res) {
    let itemName = req.body.itemName
    console.log(itemName)
    pool.query(
        `INSERT INTO items (name) values ($1)`,
        [itemName],
        (err, results) => {
            res.redirect('/list')
        });
}

exports.DeleteToDo = function (req, res) {
    var id = req.params.id;
    // console.log(req.params.id)
    pool.query(`DELETE from items where id = $1`,
        [id],
        (err, results) => {
            res.redirect('/list')
        })

}

exports.EditToDo = function (req, res) {
    var id = req.params.id;
    pool.query(
        'SELECT * from items where id= $1',
        [id],
        (err, results) => {
            // console.log(results.rows)
            res.render('edit.ejs', {
                item: results.rows[0]
            });
        });

}

exports.UpdateToDo = function (req, res) {
    pool.query(
        'UPDATE items set name=$1 where id =$2',
        [req.body.itemName, req.params.id],
        (error, results) => {
            res.redirect('/list')
        })
}