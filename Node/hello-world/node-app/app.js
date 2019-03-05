console.log('Hello World');
const fs = require('fs');

fs.writeFileSync('notes.txt', 'Hello i am notes for the second hit. And this time the previous text will be overwitten with this new one.');

// Challange 1
    // Append a message to notes.txt
fs.appendFileSync('notes.txt' , 'Now this one will be appended, not overwritten')
