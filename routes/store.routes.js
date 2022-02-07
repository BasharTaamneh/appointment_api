const storeController = require('../controllers/store.controller');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')

// express api store routers
router.post("/createStore", upload.single("img"), storeController.createStore);
router.get("/getuserStores", storeController.getuserStores);
router.get("/searchStoreslist", storeController.searchStoreslist);
router.put("/updateStore", upload.single("img"), storeController.updateStore);
router.delete("/deleteStore", storeController.deleteStore);


module.exports = router;