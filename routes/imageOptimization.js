const tinify = require("tinify");
const fs = require("fs");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const filterFile = (file) => {
  const allowedTypes = ["image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    return error;
  }
};

tinify.key = process.env.TINIFY_API_KEY;

const minifyFile = (file) => {
  fs.readFile(file, (err, sourceData) => {
    if (err) throw err;
    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
      if (err) {
        res.send({ message: err });
      } else {
        res.send({
          message: "sucess",
          result: resultData,
        });
      }
    });
  });
};
