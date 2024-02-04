const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profiles/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

let uploadProfile = multer({storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === "application/pdf") {
            callback(null, true);
        } else {
            // Handle error more gracefully
            const error = new Error('Only PDF files are supported!');
            error.status = 400; // Set an appropriate status code
            callback(error, false);
        }
    }
});

module.exports = uploadProfile;

