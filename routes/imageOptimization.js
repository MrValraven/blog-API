const tinify = require("tinify");
const fs = require("fs");

tinify.key = process.env.TINIFY_API_KEY;

fs.readFile(fileName, (err, sourceData) => {
  if (err) throw err;
  tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
    if (err) throw err;
    // ...
    else {
      res.send({ message: "sucess" });
    }
  });
});
