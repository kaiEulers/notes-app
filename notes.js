const fs = require('fs')
const chalk = require('chalk')

const getNotes = () =>{
    return "Your notes..."
}

// ---------- addNote() adds a new note given its title and body
const addNote = (title, body) => {
    const notes = loadNotes()
    // If a note title already exists, place note in duplicateNotes
    // filter() returns elements within an array base on the condition of the function written within it
    const duplicateNotes = notes.filter((n) => n.title == title)

    // For debugging
    // console.log(duplicateNotes)

    // If there are no notes with the same title, duplicateNotes will have a length of 0
    if (duplicateNotes.length === 0) {
        // Push title and body data in notes array
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold.inverse('New note added!'))
    }
    else {
        console.log(chalk.red.bold.inverse('Note title already taken...'))       
    }
}
// ---------- removeNote() removes a note given its title
const removeNote = (title) => {
    const notes = loadNotes()
    // note2keep will contain an array of notes without the removed note
    const notes2Keep = notes.filter((n) => n.title !== title)

    // For debugging
    // console.log(notes2keep)
    
    // If the length of notes2Keep and notes are the same, no notes were removed. Otherwise, notes were removed.
    if (notes2Keep.length == notes.length) {
        console.log(chalk.red.bold.inverse('No note with this title was found...'))
    }
    else {
        saveNotes(notes2Keep)
        console.log(chalk.green.bold.inverse('Note removed!'))
    }

    
}






// saveNotes saves note data as "notes.json"
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJSON)
}
// loadNotes returns JSON object if "notes.json" exists, otherwise, it returns an empty array
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}

