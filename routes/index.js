module.exports = function(app) {

	app.get('/', require('./root').get);

}