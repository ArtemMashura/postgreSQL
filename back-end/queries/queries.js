const getKeyboards = 'SELECT * from keyboards';
const getKeyboardByID = 'SELECT * from keyboards WHERE id = $1';
const checkNameTaken = "SELECT s FROM keyboards s WHERE s.name =$1"
const deleteKeyboard = "DELETE FROM keyboards WHERE id = $1"

const addKeyboard = "INSERT INTO keyboards (name, description, imageurl, price) VALUES ($1, $2, $3, $4)"
const updateKeyboard = "UPDATE keyboards SET name = $1, description = $2, imageurl = $3, price = $4 WHERE id = $5"

module.exports = {
    getKeyboards,
    getKeyboardByID,
    checkNameTaken,
    addKeyboard,
    deleteKeyboard,
    updateKeyboard,
}