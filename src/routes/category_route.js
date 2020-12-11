const express = require("express");
const router = express.Router();
const controller = require("../component/category");
const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    // console.log("body in file name", req.body);
    let filename = file.originalname.split(".")[0];
    let name = req.body.imagName;
    cb(
      null,
      "image" + Date.now() + ".png"
      // `${req.body.author}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      req.fileValidationError = "Forbidden extension";
      return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
  },
  // limits: {
  // 	fileSize: 420 * 150 * 200,
  // },
});

router.post("/add", upload.any(), controller.add);
router.post("/update", upload.any(), controller.update);
router.get("/get", controller.get);
router.get("/getData/:name", controller.getByName);
router.post("/delete", controller.deletee);
module.exports = router;
