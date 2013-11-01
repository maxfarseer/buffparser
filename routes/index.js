module.exports = function(app) {

	app.get('/heroes/:id', require('./root').get);

}