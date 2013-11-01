var async = require('async');
var Dota2Api = require('dota2api');
var dota = new Dota2Api('2F1B42CFCAE0A920E6293AED04EE4F54');
//http://steamidfinder.ru/
//43880654 - Nemes
//45307627 - Kerza
//20187002 - Max (x)
//77366417 - mNc (x)
//45659957 - Толян
var heroes = {};

exports.get = function(req, res, next) {
	var playerID = +req.params.id;
	var ids = [];
	var last100matches = [];
	var allPlayers = [];
	var playerInfo = {
		damage: 0
	};
	var matches = [11,22,31];

	
	async.waterfall([
		function getHuet(callback) {
			dota.getByAccountID(playerID, function (err, result) {

				if (err) {
					console.log('err: ' + err);
				}
				
				result.matches.forEach(function (match) {
					console.log(match);
					last100matches.push(match.match_id)
				});
			});

			console.log(last100matches);
		}

	], function(err, result) {
		console.log(result);
	});



	

	console.log(last100matches);

	//last100matches.forEach(singleMatchInfo);

	function singleMatchInfo(match) {
		dota.getMatchDetails(311581500, function(err, matchDetails) {
			console.log(matchDetails);
		});
	};


/*		allPlayers.forEach(currentPlayerInfo);

		function currentPlayerInfo(player) {
			console.log(player);
		};*/

		// вытащить из последней сотни весь дамаг
		/*dota.getMatchDetails(result.match_id, function(err, matchDetails) {
			console.log(matchDetails);
		});
			*/

	res.end('rdy');
	
};