const getKeyboards = 'SELECT * from keyboards';
const getKeyboardByID = 'SELECT * from keyboards WHERE id = $1';
const checkNameTaken = "SELECT s FROM keyboards s WHERE s.name =$1"
const addKeyboard = "INSERT INTO keyboards (name, description) VALUES ($1, $2)"
const deleteKeyboard = "DELETE FROM keyboards WHERE id = $1"
const updateKeyboard = "UPDATE keyboards SET name = $1, description = $2 WHERE id = $3"

module.exports = {
    getKeyboards,
    getKeyboardByID,
    checkNameTaken,
    addKeyboard,
    deleteKeyboard,
    updateKeyboard,
}