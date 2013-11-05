var async = require('async');
var Dota2Api = require('dota2api');
var dota = new Dota2Api('2F1B42CFCAE0A920E6293AED04EE4F54');
//http://steamidfinder.ru/
//https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=27110133&key=2F1B42CFCAE0A920E6293AED04EE4F54&account_id=43880654
//43880654 - Nemes
//45307627 - Kerza
//20187002 - Max (x)
//77366417 - mNc (x)
//45659957 - Толян
var heroes = {};

var spawn = require('child_process').spawn;

exports.get = function(req, res, next) {
	var playerID = +req.params.id;
	var playerCounter = [];
	var playerInfo = {
		kills: [],
		deaths: [],
		assists: [],
		last_hits: [],
		denies: [],
		hero_damage: [],
		hero_healing: [],
		gold_spent: [],
		kills_number: 0,
		deaths_number: 0,
		assists_number: 0
	};

	async.waterfall([

		function getDota2Json(callback) {
			dota.getByAccountID(playerID, function (err, result) {
				callback(err, result);
			});
		},
		function getMatches(result, callback) {
			result.matches.forEach(function (match) {
				callback(null, match.match_id);
			});
		},
		function getMatchInfo(matchID, callback) {
			dota.getMatchDetails(matchID, function (err, result) {
				callback(err, result.players);
			});
		},
		function getCurrentPlayer(players, callback) {
			players.forEach(function (player) {
				if (player.account_id === playerID) {
					callback(null, player);
				}
			});
		},
		function getDamage(player, callback) {
			callback(null,
					player.kills,
					player.deaths,
					player.assists,
					player.last_hits,
					player.denies,
					player.hero_damage,
					player.hero_healing,
					player.gold_spent,
					'1');
		}
	], function (err, kills, deaths, assists, last_hits, denies, hero_damage, hero_healing, gold_spent, counter) {
		playerCounter.push(counter);

		playerInfo.kills.push(kills);
		playerInfo.deaths.push(deaths);
		playerInfo.assists.push(assists);

		console.log(playerCounter.length);
		
		if (playerCounter.length === 100) {

			playerInfo.kills.forEach(function (val) {
				playerInfo.kills_number += val;
			});
			console.log('Last 100 K ' + playerInfo.kills_number);

			playerInfo.deaths.forEach(function (val) {
				playerInfo.deaths_number += val;
			});
			console.log('Last 100 D ' + playerInfo.deaths_number);

			playerInfo.assists.forEach(function (val) {
				playerInfo.assists_number += val;
			});
			console.log('Last 100 A ' + playerInfo.assists_number);

			var magickOpts = [
				"ursa2.jpg",
				"-font", "Waree-bold",
				"-pointsize", "25",
				"-fill", "white",
				"-gravity", "South",
				"-annotate", "+0+2", "LAST 100 K/D/A: " + playerInfo.kills_number + "/" + playerInfo.deaths_number + "/" + playerInfo.assists_number,
				""+playerID+".png"
			];
			var im = spawn('convert', magickOpts);
		}
	});

	res.end('rdy');
	
};