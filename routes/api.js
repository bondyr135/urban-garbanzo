const express = require("express");

const router = express.Router();

const EventNote = require("../models/EventModel");

// Sacing the Event the user created
router.post("/save", async (req, res) => {
  const { date, title, month, year } = req.body;

  const newEvent = new EventNote({
    title,
    date,
    month,
    year
  });

  await newEvent
    .save()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      return res
        .status(500)
        .send(
          (err.message = "Something was missing in the Event you tried to save")
        );
    });
});

// Retrieving all Events for the CurrentMonthDisplayed
router.get("/get_events_by_month/:year/:month", (req, res) => {
  const { month: queryMonth, year: queryYear } = req.params;

  EventNote.find({ month: queryMonth, year: queryYear })
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  EventNote.deleteOne({ _id: id })
    .then(ans => {
      if (ans.deletedCount === 0) {
        return res.status(500).send({ msg: "no such event was found" });
      }
      res.status(200);
      res.send(ans);
    })
    .catch(err => {
      console.log(err + " error in server");
      res.status(501).send(err);
    });
});

// ONLY for cleaning up the DB, so it won't  fill-up
router.delete("/delete_whole_month/:month", async (req, res) => {
  const { month } = req.params;

  await EventNote.deleteMany({ month: month })
    .then(ans => {
      console.log(
        `The event from the month of ${month} were automatically deleted`
      );
      res.status(200).send(`Month ${month} was deleted`);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
