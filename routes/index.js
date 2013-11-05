module.exports = function(app) {

	app.get('/heroes/:id', require('./root').get);
	app.get('/textgen/:name', require('./textgen').get);

}