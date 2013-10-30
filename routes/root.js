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

	dota.getByAccountID(43880654, function (err, result) {
		if (err) {
			console.log('err: ' + err);
		}

		result.matches.forEach(function(val, index, array) {
			//console.log(val.match_id + ' bots ' + val.players.length + ' - ' + index + ' / ' + array.length);
			val.players.forEach(function(player) {
				if (player.account_id === 43880654) {
					//console.log(player.hero_id);
					dota.getHeroes(function (err, heroesArray) {
						heroesArray.heroes.forEach(function(heroName) {
							//console.log(val.id + ' - ' + val.localized_name);
							if (player.hero_id === heroName.id) {
								console.log(heroName.localized_name);
							}
						});
					});
				};
			});
		});

	});

	res.end('rdy');


	
};