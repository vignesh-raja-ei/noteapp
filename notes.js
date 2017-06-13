// To add a new note
var addNote = ({title, text, db}) => {
	db.collection("Usernote").find({title:title}).toArray()
	.then((res) => { 
			if(res.length == 0) {
				db.collection("Usernote").insertOne({title:title ,text:text })
				.then((res) => {
					console.log(`Note added with title '${res.ops[0].title}' and text '${res.ops[0].text}'`);
					closeDB(db);
				}, 
				err => { 
					console.log(err);
					closeDB(db); 
				});
			}
			else {
				console.log(`Note with title '${res[0].title}' already exists. Create a new note.`);
				closeDB(db);
			}
		},
		err => {
			console.log(err);
			closeDB(db);
		});
};
// To delete a note
var deleteNote = ({title, db}) => {
	db.collection("Usernote").find({title:title}).toArray()
	.then((res) => { 
			if(res.length == 0) {
					console.log("Note not found");
					closeDB(db);
			}
			else{
				db.collection("Usernote").deleteOne({title:title})
				.then(res => {
					console.log(`Note deleted - Title '${title}'`);
					closeDB(db);
				});
			}
		},
		err => {
			console.log(err);
			closeDB(db);
		});
}
//To Update Note
var updateNote = ({title, text, db}) => {
	db.collection("Usernote").find({title:title}).toArray()
	.then((res) => { 
			if(res.length == 0) {
				console.log(" note not found");
				closeDB(db);
			}
			else{
				db.collection("Usernote").updateOne({title:title}, { $set: { text:text } })
				.then(res => {
					console.log(`Note updated with title '${title}' and text '${text}'`);
					closeDB(db);
				});
			 }
		},
		err => {
			console.log(err);
			closeDB(db);
		});

}
//To List the user notes
function listNotes({db}) { 
	db.collection("Usernote").find().toArray()
	.then((res) => { 
			if(res.length == 0) {
					console.log("No notes found. Create one using 'add' command");
					closeDB(db);
			}
			else{
				console.log(JSON.stringify(res, undefined, 8));
				closeDB(db);
			}
		},
		err => { 
			console.log(err);
			closeDB(db);
		});	
}

function closeDB(db) {
	db.close();
}
module.exports = {
	addNote,
	deleteNote,
	updateNote,
	listNotes
};