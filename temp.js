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