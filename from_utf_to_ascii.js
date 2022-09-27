#!/usr/bin/node
const toReplace = {
	"é": "&éacute;",
	"€": "&euro;",
	"ç": "&ccedil;",
	"á":"&acute;",
	"â":"&acirc;",
	"à":"&agrave;",
	"è":"&egrave;",
	"é":"&eacute;",
	"ê":"&ecirc;",
	"œ":"&oelig;",
	"î":"&icirc;",
	"í":"&iacute;",
	"ò":"&ograve;",
	"ó":"&oacute;",
	"ô":"&ocirc;",
	"ù":"&ugrave;",
	"ú":"&uacute;",
	"û":"&ucirc;",
	"’":"&rsquo;",
	"'":"&rsquo;",
	"...":"&hellip;",
	"«":"&laquo;",
	"»":"&raquo;",
	"Ë":"&euml;",
	"Ï":"&iuml;",
};

/*
’	&rsquo;
...	&hellip;
«	&laquo;
»	&raquo;
Ë	&euml;
Ï	&iuml;
€	&euro;

*/

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
				let text = data;
				if (err) {
					return console.error(err);
				}
				Object.keys(toReplace).forEach(element => {
					text = text.replaceAll(element, toReplace[element])
				});
				fs.writeFile(destFilename, text, 'utf-8', err => {
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
