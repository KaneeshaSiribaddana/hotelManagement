const router = require("express").Router();
const Feedback = require("../models/Feedback");

// Add new feedback
router.route("/add").post(async (req, res) => {
  const { userId, email, message } = req.body;
  const newFeedback = new Feedback({
    userId,
    email,
    message,
  });

  try {
    await newFeedback.save();
    res.json({ message: "Feedback added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding feedback" });
  }
});


// Get all feedback
router.route("/").get((req, res) => {
  Feedback.find()
    .then((feedbacks) => {
      res.json(feedbacks);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error getting feedback" });
    });
});

// Get feedback by ID
router.route("/:id").get(async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      res.status(404).json({ error: "Feedback not found" });
    } else {
      res.json(feedback);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting feedback" });
  }
});

// Update feedback by ID
router.route("/update/:id").put(async (req, res) => {
  const feedbackId = req.params.id;
  const { email, message } = req.body;

  const updatedFeedback = {
    email,
    message,
  };

  try {
    await Feedback.findByIdAndUpdate(feedbackId, updatedFeedback);
    res.json({ message: "Feedback updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating feedback" });
  }
});

// Delete feedback by ID
router.route("/delete/:id").delete(async (req, res) => {
  const feedbackId = req.params.id;

  try {
    await Feedback.findByIdAndDelete(feedbackId);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting feedback" });
  }
});

module.exports = router;
