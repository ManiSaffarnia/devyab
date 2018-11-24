const multer = require("multer");
const fs = require('fs');

//STORAGE CRITERIA
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/users/${req.user.id}/`;
        //check konim aya directory vojood dare ya na - agar nist, basazim
        if (!fs.existsSync(path)) {
            fs.mkdir(path, { recursive: true }, (err) => {
                if (!err) cb(null, path);
                else console.log(err);
            })
        }
        else {
            cb(null, path);
        }
    },
    filename: function (req, file, cb) {
        const uploadedName = Date.now() + req.user.id + "." + file.originalname.split('.')[1];
        console.log(uploadedName);
        cb(null, uploadedName);
    }
});

//FILTERS CRITERIA
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //store the file
        cb(null, true);
    }
    else {
        //reject
        console.log('forma dorost nist');
        req.errors = { errorMessage: "only \"jpeg\" or \"png\" formats are acceptable" }
        cb(null, false);
    }
};


//UPLOAD OBJECT
const upload = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 4 //4MB
    },
    fileFilter
});


module.exports = {
    storage,
    upload
}

