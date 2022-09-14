#!/usr/bin/node
const toReplace = {
	"é": "&éacute;",
};

const fileList = process.argv.slice(2).filter(x => {
	if (x.slice(-5) === ".html")
	{
		return x;
	}
});

if (fileList.length >= 1) {
	fs = require('fs');
	fs.mkdir('dest', '0777', err => {
		if (err) {
			console.error(err);
		}
		fileList.forEach(sourceFilename => {
			const destFilename = "dest/" + sourceFilename;
			const file = fs.readFile(sourceFilename, 'utf-8', (err, data) => {
				if (err) {
					return console.error(err);
				}
				let text = data.split('');
				text.forEach((letter, index) => {
					Object.keys(toReplace).forEach(element => {
						if (letter === element) {
							text[index] = toReplace[element];
						}
					});
				});
				fs.writeFile(destFilename, text.join(''), 'utf-8', err => {
					if (err) {
						console.error(err);
					} else {
						console.log('Le fichier a bien été converti, retrouvez le dans le dossier dest');
					}
				});
			});
		});
	});
} else {
	console.error("At least one file is required");
}
