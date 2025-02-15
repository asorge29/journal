const fs = require('fs')

const journal = fs.readFileSync('test.journ', 'utf-8')

console.log(journal)

const journalData = JSON.parse(journal)

console.log(journalData.name)
