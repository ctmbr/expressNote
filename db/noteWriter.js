const fs = require("fs");
const util = require("util");
const { v4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteWriter {
    read() {
        return readFileAsync("./db/db.json", "utf-8");
    }
    write(note) {
        return writeFileAsync("./db/db.json", JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((allNotes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(allNotes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    writeNote(note) {
        if (!note.title || !note.text) {
            throw new Error("Empty Note");
        }
        note.id = v4();
        console.log(note);
        return this.getNotes()
            .then((notes) => {
                return [...notes, note];
            })
            .then((notes) => {
                return this.write(notes);
            })
            .then(() => {
                return note;
            });
    }
    deleteNote(id) {
        return this.getNotes()
            .then((notes) => {
                return notes.filter((note) => note.id !== id);
            })
            .then((toKeep) => {
                return this.write(toKeep);
            });
    }
}

module.exports = new NoteWriter();
