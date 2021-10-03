const router = require("express").Router();
const { sendEmail } = require("../functions/emailFunctions");

router.post("/sendEmail", async (req, res) => {
  const sendTo = req.body.sendTo;
  const subject = req.body.subject;
  const message = req.body.message;

  try {
    let sendResult = await sendEmail(sendTo, subject, message);

    res.status(200).json({ message: "Email sent sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid parameters" });
  }

  console.log(sendResult);
});

module.exports = router;
