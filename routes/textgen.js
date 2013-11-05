var spawn = require('child_process').spawn;

exports.get = function(req, res, next) {

	var magickOpts = [
		"ursa2.jpg",
		"-font", "Impact-Обычный",
		"-pointsize", "30",
		"-strokewidth", "1",
		"-stroke", "black",
		"-fill", "white",
		"-gravity", "South",
		"-annotate", "+0+10", "Ахуенен и пиздат на Урсе 20/0 расклад",
		""+req.params.name+".png"
	];
	var im = spawn('convert', magickOpts);

	console.log('img done');

	res.end('rdy');
	
};