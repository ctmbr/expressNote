const fs = require('fs')
const util = require('util')
const uuid = require('uuid')

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteWriter {
    read() { return readFileAsync("./db/db.json", "utf-8") }
    write(note) { return writeFileAsync("./db/db.json", JSON.stringify(note)) }
    getNotes() {
        return this.read().then((allNotes) => {
            let parsedNotes
            try {
                parsedNotes = [].concat(JSON.parse(allNotes))
            } catch (err) {
                parsedNotes = []
            }
            return parsedNotes
        })
    }
    // writeNotes()
}

module.exports = new NoteWriter()