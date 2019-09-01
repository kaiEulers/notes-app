const fs = require('fs')
const chalk = require('chalk')

// ---------- addNote() adds a new note given its title and body
const addNote = (title, body) => {
    const notes = loadNotes()
    // If a note title already exists, place note in duplicateNotes
    // find() returns the element of an array that satisfy the condition in the function that is passed into it. Otheriwse, find() will return undefined. find() will stop traversing thru the array once the duplicate note title is found.
    const duplicateNote = notes.find((n) => n.title == title)

    // For debugging
    // console.log(duplicateNotes)

    // If duplicateNote is undefined, push title and body data onto notes array. Otherqise, print error message.
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold.inverse('\"' + title + '\" added!'))
    }
    else {
        console.log(chalk.red.bold.inverse('The title \"' + title + '\" is already taken...'))
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
        console.log(chalk.red.bold.inverse('\"' + title + '\" does not exist...'))
    }
    else {
        saveNotes(notes2Keep)
        console.log(chalk.green.bold.inverse('\"' + title + '\" removed!'))
    }
}

// ----------listNotes() prints all notes stored in the system
const listNotes = () => {
    const notes = loadNotes()

    // Print heading
    console.log(chalk.bold('Your notes:'))
    // Print all note titles
    notes.forEach((n) => console.log(chalk.bold.inverse(n.title)))
}

// ----------readNotes() prints a note's body given its title
const readNote = (title) => {
    const notes = loadNotes()

    // Check if note title exists in the array
    const theNote = notes.find((n) => n.title === title)
    // If note exist, print its title and body. Otherwise, print error message.
    if (theNote) {
        console.log(chalk.bold.inverse(theNote.title))
        console.log(theNote.body)
    }
    else {
        console.log(chalk.red.bold.inverse(title + ' does not exist...'))
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

// Export all functions in the module
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

