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
	var games =[];
	console.log(playerID);

	/*dota.getByAccountID(playerID, function (err, result) {
		if (err) {
			console.log('err: ' + err);
		}

		// вытащить из последней сотни, героев за которых играл
		result.matches.forEach(function(val, index, array) {
			//console.log(val.match_id + ' bots ' + val.players.length + ' - ' + index + ' / ' + array.length);
			val.players.forEach(function(player) {
				if (player.account_id === playerID) {
					//console.log(player.hero_id);
					dota.getHeroes(function (err, heroesArray) {
						heroesArray.heroes.forEach(function(heroName) {
							//console.log(val.id + ' - ' + val.localized_name);
							if (player.hero_id === heroName.id) {
								res.write(heroName.localized_name+'\n');
							}
						});
					});
				};
			});
		});

		//get match details
		//res.json(result.matches);

	});*/


	function parseMatch(match) {
		ids.push(match.match_id);
	};

	function parseMatchDetails(match_id) {
		dota.getMatchDetails(match_id, function(err, result) {
			console.log(result);
		});
	};

	// get herolist with async
	async.waterfall([
		function getMatches(callback) {
			dota.getByAccountID(playerID, function (err, result) {
				callback(err,result);
			});
		},
		function getGamesID(result, callback) {
			async.each(result.matches, parseMatch, callback(null, ids));
		},
		function getMatchInfo(ids, callback) {
			async.each(ids, parseMatchDetails, callback(null, games));
		},
		function printMatches(games, callback) {
			console.log(games);
		}
		/*function findPlayer(value, callback) {
			console.log(value);
			if (playerName === playerID) {
				ids.push(playerName.hero_id);
			}
		}*/
	], function (err, result) {
			console.log('done');
	});

	/*dota.getMatchDetails(362782339, function(err, result) {
		res.json(result);
	});*/

	//res.end('rdy');
	
};