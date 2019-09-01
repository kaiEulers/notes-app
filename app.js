// require() import functions or variables from another file
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// ----- Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new notes',
    // builder handles parameters of the command. For the command "add", two parameters are required, title and body.
    builder: {
        title: {
            // Description of title
            describe: 'Note title',
            // Add command has to exist
            demandOption: true,
            // Input has to be a string
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    // The handler function is called when the 'add' command is issued
    // Variable argv is passed into the handler function using a lambda expression
    handler: (argv) => notes.addNote(argv.title, argv.body)

    // // Long way of writing the above function 
    // handler: function(argv) {
    //     notes.addNote(argv.title, argv.body)
    // }
})

// ----- Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})

// ----- Create list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => notes.listNotes()
})

// ----- Create read command
yargs.command({
    command: 'read',
    describe: 'Read a notes',
    builder : {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})

yargs.parse()
// console.log(yargs.argv)