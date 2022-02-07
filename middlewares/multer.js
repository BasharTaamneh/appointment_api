const multer = require('multer');
const path = require('path');


// customize (multer) package configures
let storage = multer.diskStorage({
    destination: function (req, res, callback) {
        callback(null, "./public/uploads/images");
    },
    filename: function (req, file, callback) {
        let name = path.basename(file.originalname).replace(" ", "_");
        callback(null, req.body.storename + '-' + name.slice(0, name.indexOf(".")).replace(" ", "_") + '-' + req.user.id + path.extname(file.originalname));
    },
});

// handling request bodies that have form-data submissions when called
const upload = multer({ storage: storage });

module.exports = upload