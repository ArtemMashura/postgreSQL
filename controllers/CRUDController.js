const pool = require('../db');
const queries = require("../queries/queries")

const getKeyboards = async (req, res) =>{
    pool.query(queries.getKeyboards, (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
    })
}

const getKeyboardByID = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getKeyboardByID, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
    })
}

const addKeyboard = async (req, res) => {
    const { name, description } = req.body
    const client = await pool.connect()
    client.query(queries.checkNameTaken, [name], (err, result) => {
        if (result.rows.length) {
            res.status(409).send("Keyboard name taken")
        }
        else {
            client.query(queries.addKeyboard, [name, description], (err, result) => {
                if (err) throw err;
                res.status(201).send(result)
            })
        }
    })
    client.release()
}

const deleteKeyboard = async (req, res) => {
    const id = parseInt(req.params.id);
    const client = await pool.connect()
    client.query(queries.getKeyboardByID, [id], (err, result) => {
        if (!result.rows.length) {
            res.status(404).send("Keyboard not found")
        }
        else {
            client.query(queries.deleteKeyboard, [id], (err, result) => {
                if (err) throw err;
                res.status(200).send(result)
            })
        }
    })
    client.release()
}

const updateKeyboard = async (req, res) => {
    const id = parseInt(req.params.id);
    var { name, description } = req.body

    const client = await pool.connect()
    client.query(queries.getKeyboardByID, [id], (err, result) => {
        if (!result.rows.length) {
            res.status(404).send("Keyboard not found")
        }
        else {
            if (!name){
                name = result.rows[0].name
            }
            if (!description){
                description = result.rows[0].description
            }
            client.query(queries.updateKeyboard, [name, description, id], (err, result) => {
                if (err) throw err;
                res.status(200).send(result)
            })
        }
    })
    client.release()
}


module.exports = {
    getKeyboards,
    getKeyboardByID,
    addKeyboard,
    deleteKeyboard,
    updateKeyboard,
}