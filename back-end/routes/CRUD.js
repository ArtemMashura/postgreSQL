const { Router } = require("express")
const controller = require("../controllers/CRUDController")

const router = Router();

router.get("/:id", controller.getKeyboardByID)
router.get("/", controller.getKeyboards)
router.post("/", controller.addKeyboard)
router.put("/:id", controller.updateKeyboard)
router.delete("/:id", controller.deleteKeyboard)



module.exports = router;