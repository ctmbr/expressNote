const router = require('express').Router()
const noteWriter = require('../db/noteWriter')

router.get("/notes", (req, res) => {
    noteWriter.getNotes().then((notes) => { return res.json(notes) }).catch((err) => { res.status(500).json(err) })
})

module.exports = router