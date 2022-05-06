const router = require("express").Router();
const noteWriter = require("../db/noteWriter");

router.get("/notes", (req, res) => {
    noteWriter
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.post("/notes", (req, res) => {
    noteWriter
        .writeNote(req.body)
        .then((note) => {
            return res.json(note);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.delete("/notes/:id", (req, res) => {
    noteWriter
        .deleteNote(req.params.id)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
module.exports = router;
