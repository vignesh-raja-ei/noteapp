const notes = require('./notes.js');
const yargs = require('yargs');
var argv = yargs.argv;
var cmd = argv._[0];
var MongoClient = require('mongodb').MongoClient;

// Connect to db called CRUD 
MongoClient.connect("mongodb://localhost:27017/CRUD", (err, db) => {
	if(err) {
		return console.log(err);
	}

	// Add note
	if(cmd === "add") {
		var title = argv.title.toString().trim();
		var text = argv.text.toString().trim();
		if(!title || !text) {
			console.log("Please provide title and text to add note");
			return true;
		}
		notes.addNote({
			title,
			text,
			db
		});
		// Delete note
	}  else if(cmd === "delete") {
		var title = argv.title;
		if(!title) {
			console.log("Please provide title");
			return true;
	}
	notes.deleteNote({
		title,
		db
	});
	// List all notes
	} else if(cmd === "list") {
		notes.listNotes({
			db
		});
		// Update a note
	} else if(cmd === "update") {
	var title = argv.title.toString().trim();
	var text = argv.text.toString().trim();
	if(!title || !text) {
		console.log("Please provide title and text to update note");
		return true;
	}
	notes.updateNote({
		title,
		text,
		db
	});
	}else {
		console.log(`Please use the following commands
			1. add 
			2. update
			3. list
			4. delete`);
		return false;
	}
});