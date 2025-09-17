const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nupurrani201819@gmail.com",
    pass: "ajyy myah yqaw tiog" 
  }
});

const templates = {
  selected: (name, position) => `
    Dear ${name},

    We are pleased to inform you that you have been selected for the position of ${position}.

    Please reply to this email to confirm your acceptance.

    Best regards,
    HR Team
  `,
  rejected: (name, position) => `
    Dear ${name},

    Thank you for applying for the position of ${position}.

    We regret to inform you that we have decided to move forward with other candidates.

    Best regards,
    HR Team
  `
};

app.post("/send-email", async (req, res) => {
  const { name, email, position, status } = req.body;

  if (!name || !email || !position || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: status === "selected" ? "Congratulations!" : "Application Status",
    text: templates[status](name, position)
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
