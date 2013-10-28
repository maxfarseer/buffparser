var jsdom = require('jsdom');
var request = require('request');
var url = require('url');
var http = require('http');
var options = {
	host: 'http://google.com/'
}

exports.get = function(req, res, next) {

	http.get(options, function(res) {
		console.log(arguments);
	}).on('error', function(err) {
		console.log(err);
	});

	/*jsdom.env(
		"http://dotabuff.com/",
		["http://code.jquery.com/jquery.js"],
		function (errors, window) {
			console.log(errors);
		}
	);*/

	res.render('index',{
		title: 'http.request'
	});
};