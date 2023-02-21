#!/usr/bin/node
const toReplace = {
	"é": "&eacute;",
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
	"%%frist_name%%":"%%first_name%%",
	//"href":"target=\"_blank\" href",
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
				let text = data;
				if (err) {
					return console.error(err);
				}

				// Supression des target="_blank" dans le but d'homogénéiser
				text = text.replace(/target=\"_blank\" /gim, "");

				// Suppression des commentaires
				text = text.replace(/<!--.+-->/gim, "");

				// Remplacement des caractères présents dans l'objet toReplace
				Object.keys(toReplace).forEach(element => {
					let flag = true;
					while(flag) {
						let text2 = text.replace(element, toReplace[element]);
						if (text !== text2) {
							text = text2;
						} else {
							flag = false;
						}
						// console.log(text);
					}
				});

				// Ajout des target blank
				text = text.replace(/href/gim, "target=\"_blank\" href");

				// Ecriture du nouveau fichier dans le dossier dest/
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
