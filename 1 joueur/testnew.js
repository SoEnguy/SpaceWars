window.onload = (function() {
    var WIDTH = 952,
        HEIGHT = 680;
    Crafty.init(WIDTH, HEIGHT);
	
	/** localStorage + Variables**/
	var nb_victoire_cookie = localStorage.getItem("victoire");
	var nb_defaite_cookie = localStorage.getItem("defaite");
	var nb_tir_total_cookie = localStorage.getItem("nb_tir_total");
	var nb_tir_touche_total_cookie = localStorage.getItem("nb_tir_touche_total");
	
	if (nb_victoire_cookie > 0) {
		var nb_victoire = localStorage.getItem("victoire");
	}
	else {
		var nb_victoire = 0;
	}
	
	if (nb_defaite_cookie > 0) {
		var nb_defaite = localStorage.getItem("defaite");
	}
	else {
		var nb_defaite = 0;
	}
	
	if (nb_tir_total_cookie > 0) {
		var nb_tir_total = localStorage.getItem("nb_tir_total");
	}
	else {
		var nb_tir_total = 1;
	}
	
	if (nb_tir_touche_total_cookie > 0) {
		var nb_tir_touche_total = localStorage.getItem("nb_tir_touche_total");
	}
	else {
		var nb_tir_touche_total = 0;
	}
	
	/** Variables globales **/
	var tir_ia = new Array();
	var nb_tir_ia = 20; //nombre de bateau de base (joueur) pour éviter le plantage du tir de l'ia
	var nb_bateau_joueur = 20;
	var nb_bateau_ia = 20;
	var skill = 0;
	var nb_tir = 1;
	var nb_tir_touche = 0;
	var pourcentage = 0;
	var pourcentage_total = 0;
	
	var bouton_menu2;
	var jauge_energie;
	var energie_ia = 0;
	
	var vaisseau;
	var tank1;
	var tank2;
	var unite1;
	var unite2;
	var unite3;
	
	var skin = 0;
	var vaisseau_x;
	var vaisseau_y;
	var tank1_x;
	var tank1_y;
	var tank2_x;
	var tank2_y;
	var unite1_x;
	var unite1_y;
	var unite2_x;
	var unite2_y;
	var unite3_x;
	var unite3_y;
	
	var bonus_1;
	var bonus_2;
	var bonus_3;
	var bonus_4;
	var bonus_5;
	var bonus_6;
	var bonus_7;
	var bonus_8;
	var bonus_9;
	var bonus_10;
	
	var bonus_1_x = 0;
	var bonus_1_y = 0;
	var bonus_2_x = 0;
	var bonus_2_y = 0;
	var bonus_3_x = 0;
	var bonus_3_y = 0;
	var bonus_4_x = 0;
	var bonus_4_y = 0;
	var bonus_5_x = 0;
	var bonus_5_y = 0;
	var bonus_6_x = 0;
	var bonus_6_y = 0;
	var bonus_7_x = 0;
	var bonus_7_y = 0;
	var bonus_8_x = 0;
	var bonus_8_y = 0;
	var bonus_9_x = 0;
	var bonus_9_y = 0;
	var bonus_10_x = 0;
	var bonus_10_y = 0;
	var energie = 0;
	
	var soulignex = 286+(130*skin);	
	
	Crafty.audio.add({
				bouton: "sounds/bouton.mp3",
			});
	Crafty.audio.add({
				clic: "sounds/clic.mp3",
			});
	
	
	/** Fonctions globales **/
	
	function reset_game() {
		nb_tir_ia = 20;
		nb_bateau_joueur = 20;
		nb_bateau_ia = 20;
		nb_tir=1;
		nb_tir_touche = 0;
		energie=0;
		
		var k = 0;
		while (k<256) {
			tir_ia[k] = 0;
			k++;
		}
	}
	
	/** Preload **/
	
	Crafty.scene("preload", function() {
	Crafty.load(
			["assets/fond/classique/loading.png",
			],
			function() {
				//when loaded
				
				Crafty.scene("loading"); //ouvrir le loading
			},

			function(e) {
			  //progress
			},

			function(e) {
				alert('Erreur de chargement, rafraichissez la page ou contactez nous.');
			}
		);
	});
	
	
	/** Scene correspondant au chargement (loading) **/
	Crafty.scene("loading", function(){
		Crafty.background("url('assets/fond/classique/loading.png')");
		Crafty.load(
			["assets/bouton/classique/credits_sprite.png",
			"assets/bouton/classique/finplace_sprite.png",				
			"assets/bouton/classique/instructions_sprite.png",
			"assets/bouton/classique/jouer_sprite.png",
			"assets/bouton/classique/retourmenu_sprite.png",
			"assets/bouton/classique/souligne.png",
			"assets/bouton/classique/theme_classique_sprite_full.png",
			"assets/bouton/classique/theme_cyber_sprite_full.png",
			"assets/bouton/classique/theme_pokemon_sprite_full.png",
			"assets/bouton/classique/theme_sprite.png",
			"assets/bouton/classique/tiria_sprite.png",
			
			"assets/bouton/cyber/credits_sprite.png",
			"assets/bouton/cyber/instructions_sprite.png",
			"assets/bouton/cyber/jouer_sprite.png",
			"assets/bouton/cyber/retourmenu_sprite.png",
			"assets/bouton/cyber/theme_classique_sprite_full.png",
			"assets/bouton/cyber/theme_cyber_sprite_full.png",
			"assets/bouton/cyber/theme_pokemon_sprite_full.png",
			"assets/bouton/cyber/theme_sprite.png",
			
			"assets/fond/brouillard.png",
			"assets/fond/classique/menu.png",
			"assets/fond/classique/grillefond.png",
			"assets/fond/classique/defaite.png",
			"assets/fond/classique/victoire.png",
			
			"assets/fond/cyber/menu.jpg",
			
			"assets/unite/pokemon/carapuce_sprite.png",
			"assets/unite/pokemon/carabafe_sprite.png",
			"assets/unite/pokemon/tortank_sprite.png",
			"assets/unite/pokemon/salameche_sprite.png",
			"assets/unite/pokemon/reptincel_sprite.png",
			"assets/unite/pokemon/dracaufeu_sprite.png",
			
			"assets/unite/classique/vaisseau_sprite.png",
			"assets/unite/classique/tank_sprite.png",
			"assets/unite/classique/unite_sprite.png",
			"assets/unite/classique/unite_ia.png",
			"assets/unite/classique/tank_ia.png",
			"assets/unite/classique/vaisseau_ia.png",
			],
			function() {
				//when loaded
				
				Crafty.scene("menu"); //ouvrir le menu
			},

			function(e) {
			  //progress
			},

			function(e) {
				alert('Erreur de chargement, rafraichissez la page ou contactez nous.');
			}
		);
	});	
	
	/** Scene correspondant au menu (acceuil) **/
	Crafty.scene("menu", function() {
	
		if (skin == 2) {
			Crafty.background("url('assets/fond/cyber/menu.jpg')");
		}
		else {
		Crafty.background("url('assets/fond/classique/menu.png')");
		}
		
		if (skin == 2) {
			Crafty.sprite(300, "assets/bouton/cyber/jouer_sprite.png", {
				jouer: [0, 0],
				joueractive: [1, 0]
			});
		Crafty.sprite(300, "assets/bouton/cyber/instructions_sprite.png", {
				instructions: [0, 0],
				instructionsactive: [1, 0]
			});			
		Crafty.sprite(300, "assets/bouton/cyber/theme_sprite.png", {
				theme: [0, 0],
				themeactive: [1, 0]
			});
		Crafty.sprite(300, "assets/bouton/cyber/credits_sprite.png", {
				credits: [0, 0],
				creditsactive: [1, 0]
			});
		}
		else {
		Crafty.sprite(120, "assets/bouton/classique/jouer_sprite.png", {
				jouer: [0, 0],
				joueractive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/classique/instructions_sprite.png", {
				instructions: [0, 0],
				instructionsactive: [1, 0]
			});		
		Crafty.sprite(120, "assets/bouton/classique/theme_sprite.png", {
				theme: [0, 0],
				themeactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/classique/credits_sprite.png", {
				credits: [0, 0],
				creditsactive: [1, 0]
			});
		}
		
		if (skin == 2) {
			var bouton_jouer_x = 630;
			var bouton_jouer_y = 270;
			var bouton_instructions_x = 630 ;
			var bouton_instructions_y = 360;
			var bouton_theme_x = 630;
			var bouton_theme_y = 420;
			var bouton_credits_x = 630;
			var bouton_credits_y = 480;
		}
		else {
			var bouton_jouer_x = 416;
			var bouton_jouer_y = 300;
			var bouton_instructions_x = 416 ;
			var bouton_instructions_y = 360;
			var bouton_theme_x = 416;
			var bouton_theme_y = 420;
			var bouton_credits_x = 416;
			var bouton_credits_y = 480;
		}
		
		var bouton_jouer = Crafty.e("2D, DOM, Mouse, jouer")
				.attr({x:bouton_jouer_x, y:300})
				if (skin == 2) {
					bouton_jouer.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_jouer.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_jouer.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("main");
				})
				bouton_jouer.bind('MouseOver', function(e) {
					bouton_jouer.removeComponent("jouer");
					bouton_jouer.addComponent("joueractive");
					Crafty.audio.play("bouton",1);
				})
				bouton_jouer.bind('MouseOut', function(e) {
					bouton_jouer.removeComponent("joueractive");
					bouton_jouer.addComponent("jouer");
				})
				
		var bouton_instructions = Crafty.e("2D, DOM, Mouse, instructions")
				.attr({x:bouton_instructions_x, y:bouton_instructions_y})
				if (skin == 2) {
					bouton_instructions.areaMap([0,0], [300,0], [300, 46], [0, 46])
				}
				else {
					bouton_instructions.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_instructions.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("instruction");
				})
				bouton_instructions.bind('MouseOver', function(e) {
					bouton_instructions.removeComponent("instructions");
					bouton_instructions.addComponent("instructionsactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_instructions.bind('MouseOut', function(e) {
					bouton_instructions.removeComponent("instructionsactive");
					bouton_instructions.addComponent("instructions");
					})

			
		var bouton_theme = Crafty.e("2D, DOM, Mouse, theme")
				.attr({x:bouton_theme_x, y:bouton_theme_y})
				if (skin == 2) {
					bouton_theme.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_theme.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_theme.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("skin");
				})
				bouton_theme.bind('MouseOver', function(e) {
					bouton_theme.removeComponent("theme");
					bouton_theme.addComponent("themeactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_theme.bind('MouseOut', function(e) {
					bouton_theme.removeComponent("themeactive");
					bouton_theme.addComponent("theme");
				})
		
		var bouton_credits = Crafty.e("2D, DOM, Mouse, credits")
				.attr({x:bouton_credits_x, y:bouton_credits_y})
				if (skin == 2) {
					bouton_credits.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_credits.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_credits.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("credit");
				})
				bouton_credits.bind('MouseOver', function(e) {
					bouton_credits.removeComponent("credits");
					bouton_credits.addComponent("creditsactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_credits.bind('MouseOut', function(e) {
					bouton_credits.removeComponent("creditsactive");
					bouton_credits.addComponent("credits");
				})
			
		var bouton_excalibur = Crafty.e("2D, DOM, Mouse")
				.attr({x:0, y:0})
				.areaMap([0,0], [300,0], [300,46], [0,46])
				bouton_excalibur.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("excalibur");
				})
	});
	

		
	/** Scene correspondant a la selection de skin **/
	Crafty.scene("skin", function() {
		
		if (skin == 2) {
			Crafty.background("url('assets/fond/cyber/menu.jpg')");
		}
		else if (skin == 1) {
			Crafty.background("url('assets/fond/pokemon/menu.png')");
		}
		else {
		Crafty.background("url('assets/fond/classique/menu.png')");
		}
		
		if (skin == 2) {
		Crafty.sprite(300, "assets/bouton/cyber/theme_pokemon_sprite_full.png", {
				themepokemon: [0, 0],
				themepokemonactive: [2, 0],
			});
			
		Crafty.sprite(300, "assets/bouton/cyber/theme_cyber_sprite_full.png", {
				themecyber: [0, 0],
				themecyberactive: [1, 0]
			});
		Crafty.sprite(300, "assets/bouton/cyber/theme_classique_sprite_full.png", {
				themeclassique: [0, 0],
				themeclassiqueactive: [2, 0]
			});		
		Crafty.sprite(300, "assets/bouton/cyber/retourmenu_sprite.png", {
				retourmenu: [0, 0],
				retourmenuactive: [2, 0]
			});
			
			var theme_pokemon_x = 530 ;
			var theme_pokemon_y = 400;
			var theme_cyber_x = 530;
			var theme_cyber_y = 340;
			var theme_classique_x = 530;
			var theme_classique_y = 280;
			var bouton_menu_x = 530;
			var bouton_menu_y = 460;
			
		}
		else if (skin == 1) {
			Crafty.sprite(120, "assets/bouton/pokemon/theme_pokemon_sprite_full.png", {
				themepokemon: [0, 0],
				themepokemonactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/pokemon/theme_classique_sprite_full.png", {
				themeclassique: [0, 0],
				themeclassiqueactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/pokemon/theme_cyber_sprite_full.png", {
				themecyber: [0, 0],
				themecyberactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/pokemon/retourmenu_sprite.png", {
				retourmenu: [0, 0],
				retourmenuactive: [1, 0]
			});
			var theme_pokemon_x = 416;
			var theme_pokemon_y = 300;
			var theme_cyber_x = 546;
			var theme_cyber_y = 300;
			var theme_classique_x = 286;
			var theme_classique_y = 300;
			var bouton_menu_x = 416;
			var bouton_menu_y = 420;
		}
		else {
		Crafty.sprite(120, "assets/bouton/classique/theme_pokemon_sprite_full.png", {
				themepokemon: [0, 0],
				themepokemonactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/classique/theme_classique_sprite_full.png", {
				themeclassique: [0, 0],
				themeclassiqueactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/classique/theme_cyber_sprite_full.png", {
				themecyber: [0, 0],
				themecyberactive: [1, 0]
			});
		Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
				retourmenu: [0, 0],
				retourmenuactive: [1, 0]
			});
			var theme_pokemon_x = 416;
			var theme_pokemon_y = 300;
			var theme_cyber_x = 546;
			var theme_cyber_y = 300;
			var theme_classique_x = 286;
			var theme_classique_y = 300;
			var bouton_menu_x = 416;
			var bouton_menu_y = 420;
			
		var souligne = Crafty.e("2D, DOM, Image")
				.image("assets/bouton/classique/souligne.png");
				if (skin == 0) {
					souligne.attr({x:theme_classique_x, y:theme_classique_y})
				}
				if (skin == 1) {
					souligne.attr({x: theme_pokemon_x, y: theme_pokemon_y})
				}
		}
		
		var bouton_menu = Crafty.e("2D, DOM, Mouse, retourmenu")
				.attr({x:bouton_menu_x, y:bouton_menu_y})
				if (skin == 2) {
					bouton_menu.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_menu.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_menu.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("menu");
				})
				bouton_menu.bind('MouseOver', function(e) {
					bouton_menu.removeComponent("retourmenu");
					bouton_menu.addComponent("retourmenuactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_menu.bind('MouseOut', function(e) {
					bouton_menu.removeComponent("retourmenuactive");
					bouton_menu.addComponent("retourmenu");
				})
		
		var theme_pokemon = Crafty.e("2D, DOM, Mouse, themepokemon")
				.attr({x:theme_pokemon_x, y:theme_pokemon_y})
				if (skin == 2) {
					theme_pokemon.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					theme_pokemon.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				theme_pokemon.bind('MouseUp', function(e) { 
						if(e.mouseButton == Crafty.mouseButtons.LEFT)
							skin = 1;
							soulignex = this._x;
							Crafty.scene("skin");
					})
				theme_pokemon.bind('MouseOver', function(e) {
					theme_pokemon.removeComponent("themepokemon");
					theme_pokemon.addComponent("themepokemonactive");
					Crafty.audio.play("bouton",1);
				})
				theme_pokemon.bind('MouseOut', function(e) {
					theme_pokemon.removeComponent("themepokemonactive");
					theme_pokemon.addComponent("themepokemon");
				})
					
		var theme_classique = Crafty.e("2D, DOM, Mouse, themeclassique")
				.attr({x:theme_classique_x, y:theme_classique_y})
				if (skin == 2) {
					theme_classique.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					theme_classique.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				theme_classique.bind('MouseUp', function(e) { 
						if(e.mouseButton == Crafty.mouseButtons.LEFT)
							skin = 0;
							soulignex = this._x;
							Crafty.scene("skin");
					})
				theme_classique.bind('MouseOver', function(e) {
					theme_classique.removeComponent("themeclassique");
					theme_classique.addComponent("themeclassiqueactive");
					Crafty.audio.play("bouton",1);
				})
				theme_classique.bind('MouseOut', function(e) {
					theme_classique.removeComponent("themeclassiqueactive");
					theme_classique.addComponent("themeclassique");
				})
		
		var theme_cyber = Crafty.e("2D, DOM, Mouse, themecyber")
				.attr({x:theme_cyber_x ,y:theme_cyber_y})
				if (skin == 2) {
					theme_cyber.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					theme_cyber.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				theme_cyber.bind('MouseUp', function(e) { 
						if(e.mouseButton == Crafty.mouseButtons.LEFT)
							skin = 2;
							soulignex = this._x;
							Crafty.scene("skin");
					})
				theme_cyber.bind('MouseOver', function(e) {
					theme_cyber.removeComponent("themecyber");
					theme_cyber.addComponent("themecyberactive");
					Crafty.audio.play("bouton",1);
				})
				theme_cyber.bind('MouseOut', function(e) {
					theme_cyber.removeComponent("themecyberactive");
					theme_cyber.addComponent("themecyber");
				})
	});
	
	/** Scene correspondant au jeu (phase placement)**/
	Crafty.scene("main", function(){
	/** Musique selon les skin **/
		
		/*if (skin == 1) {
			Crafty.audio.add({
				pokemon: "sounds/pokemon/opening.mp3",
			});
			Crafty.audio.play("pokemon",1,0.1);
		}*/
		
	/** Déclaration des variables Booléens **/
	var vaisseau_select = false;
	var tank1_select = false;
	var tank2_select = false;
	var unite1_select = false;
	var unite2_select = false;
	var unite3_select = false;
	
	/** Déclaration des sprite des "bateaux" **/
		if (skin == 1) {
			Crafty.sprite(102, "assets/unite/pokemon/tortank_sprite.png", {
				vaisseau: [0,0],
				vaisseausel: [1,0]
			});
			Crafty.sprite(68, "assets/unite/pokemon/carabafe_sprite.png", {
				tank: [0,0],
				tanksel: [1,0]
			});
			Crafty.sprite(34, "assets/unite/pokemon/carapuce_sprite.png", {
				unite: [0,0],
				unitesel: [1,0]
			});
			Crafty.sprite(102, "assets/unite/pokemon/dracaufeu_sprite.png", {
				vaisseau_ia: [0,0]
			});
			Crafty.sprite(68, "assets/unite/pokemon/reptincel_sprite.png", {
				tank_ia: [0,0]
			});
			Crafty.sprite(34, "assets/unite/pokemon/salameche_sprite.png", {
				unite_ia: [0,0]
			});
		}
		else {
			Crafty.sprite(102, "assets/unite/classique/vaisseau_sprite.png", {
				vaisseau: [0, 0],
				vaisseausel: [1, 0]
			});
			Crafty.sprite(68, "assets/unite/classique/tank_sprite.png", {
				tank: [0,0],
				tanksel: [1, 0]
			});
			Crafty.sprite(34, "assets/unite/classique/unite_sprite.png", {
				unite: [0,0],
				unitesel: [1,0]
			});
			Crafty.sprite(102, "assets/unite/classique/vaisseau_ia.png", {
				vaisseau_ia: [0,0]
			});		
			Crafty.sprite(68, "assets/unite/classique/tank_ia.png", {
				tank_ia: [0,0]
			});
			Crafty.sprite(34, "assets/unite/classique/unite_ia.png", {
				unite_ia: [0,0]
			});
		}
	
	if (skin == 1) {
		Crafty.background("url('assets/fond/pokemon/grillefond.png')");
	}
	else {
		Crafty.background("url('assets/fond/classique/grillefond.png')");
	}
	
	/** Fin de placement **/
	
	Crafty.sprite(120, "assets/bouton/classique/finplace_sprite.png", {
				finplace: [0,0],
				finplaceactive: [1,0]
			});
	
	var bouton_finplace = Crafty.e("2D, DOM, Mouse, finplace")
				.attr({x:720, y:150})
				.areaMap([0,0], [120,0], [120,60], [0,60])
				bouton_finplace.bind('MouseUp', function(e) {
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
							vaisseau_x = vaisseau._x;
							vaisseau_y = vaisseau._y;
							tank1_x = tank1._x;
							tank1_y = tank1._y;
							tank2_x = tank2._x;
							tank2_y = tank2._y;	
							unite1_x = unite1._x;
							unite1_y = unite1._y;
							unite2_x = unite2._x;
							unite2_y = unite2._y;
							unite3_x = unite3._x;
							unite3_y = unite3._y;
						vaisseau_select = false;
							vaisseau.removeComponent("vaisseausel");
							vaisseau.addComponent("vaisseau");
						tank1_select = false;
							tank1.removeComponent("tanksel");
							tank1.addComponent("tank");
						tank2_select = false;
							tank2.removeComponent("tanksel");
							tank2.addComponent("tank");
						unite1_select = false;
							unite1.removeComponent("unitesel");
							unite1.addComponent("unite");
						unite2_select = false;
							unite2.removeComponent("unitesel");
							unite2.addComponent("unite");
						unite3_select = false;
							unite3.removeComponent("unitesel");
							unite3.addComponent("unite");
						vaisseau.unbind('KeyDown');
						vaisseau.unbind('Click');
						tank1.unbind('KeyDown');
						tank1.unbind('Click');
						tank2.unbind('KeyDown');
						tank2.unbind('Click');
						unite1.unbind('KeyDown');
						unite1.unbind('Click');
						unite2.unbind('KeyDown');
						unite2.unbind('Click');
						unite3.unbind('KeyDown');
						unite3.unbind('Click');
						Crafty.scene("IA_place");
				})
				bouton_finplace.bind('MouseOver', function(e) {
					bouton_finplace.removeComponent("finplace");
					bouton_finplace.addComponent("finplaceactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_finplace.bind('MouseOut', function(e) {
					bouton_finplace.removeComponent("finplaceactive");
					bouton_finplace.addComponent("finplace");
				})
				
	
	/** Bord anti-sortie des bateaux **/
	var bord_haut = Crafty.e("2D, Canvas")
					.attr({x:68, y:67, w:544, h:1})
	var bord_bas = Crafty.e("2D, Canvas")
					.attr({x:68, y:612, w:544, h:1})
	var bord_droite = Crafty.e("2D, Canvas")
					.attr({x:645, y:68, w:1, h:544})
	var bord_gauche = Crafty.e("2D, Canvas")
					.attr({x:67, y:68, w:1, h:544})
	
	/** Déclaration des différents bateaux **/
	
		/** Vaisseau**/
	vaisseau = Crafty.e("2D, Canvas, vaisseau, Mouse, Collision, Persist")
					.attr({x:68, y:510, w:102, h:102})	// Gère la position initiale et la taille
					.areaMap([0, 0], [102,0], [102,102], [0, 102])	//areaMap = cliquabilité de l'entité
					vaisseau.bind('KeyDown', function(e) {	//Gère le déplacement du vaisseau (case par case, 68 px par 68px)
					if (vaisseau_select==true ) {	//Si le bateau est sélectionné
					if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
				
		/** Tanks (2) **/
	tank1 = Crafty.e("2D, Canvas, Mouse, tank, Collision, Persist")
					.attr({x:170, y:544, w:68, h:68}) // for Component 2D
					.areaMap([0, 0], [68,0], [68,68], [0, 68])
					tank1.bind('KeyDown', function(e) {
						if (tank1_select==true ) {
							if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
					
	tank2 = Crafty.e("2D, Canvas, Mouse, tank, Collision, Persist")
					.attr({x:238, y:544, w:68, h:68}) // for Component 2D
					.areaMap([0, 0], [68,0], [68,68], [0,68])
					tank2.bind('KeyDown', function(e) {
						if (tank2_select==true ) {
							if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
					
		/** Unités (3) **/
	unite1 = Crafty.e("2D, Canvas, unite, Mouse, Collision, Persist")
					.attr({x:306, y:578, w:34, h:34}) // for Component 2D
					.areaMap([0, 0], [34,0], [34,34], [0,34])
					unite1.bind('KeyDown', function(e) {
						if (unite1_select==true ) {
							if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
					
	unite2 = Crafty.e("2D, Canvas, unite, Mouse, Collision, Persist")
					.attr({x:340, y:578, w:34, h:34}) // for Component 2D
					.areaMap([0, 0], [34,0], [34,34], [0,34])
					unite2.bind('KeyDown', function(e) {
						if (unite2_select==true ) {
							if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
					
	unite3 = Crafty.e("2D, Canvas, unite, Mouse, Collision, Persist")
					.attr({x:374, y:578, w:34, h:34}) // for Component 2D
					.areaMap([0, 0], [34,0], [34,34], [0,34])
					unite3.bind('KeyDown', function(e) {
						if (unite3_select==true ) {
							if ((e.key == Crafty.keys['LEFT_ARROW']) || (e.key == Crafty.keys['Q'])) {
							  this.x=this.x-34;
								if(this.hit('2D')) {
									this.x=this.x+34;
								}
							} else if ((e.key == Crafty.keys['RIGHT_ARROW']) || (e.key == Crafty.keys['D'])) {
							this.x=this.x+34;
								if(this.hit('2D')) {
									this.x=this.x-34;
								}
							} else if ((e.key == Crafty.keys['UP_ARROW']) || (e.key == Crafty.keys['Z'])) {
							this.y=this.y-34;
								if(this.hit('2D')) {
									this.y=this.y+34;
								}
							} else if ((e.key == Crafty.keys['DOWN_ARROW']) || (e.key == Crafty.keys['S'])) {
							this.y=this.y+34;
								if(this.hit('2D')) {
									this.y=this.y-34;
								}
							}
						}})
	
	/** Clic sur les bateaux **/
	
	vaisseau.bind('Click', function() {
		if(vaisseau_select==true) {
			vaisseau_select=false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
		}
		else{
			tank1_select = false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			tank2_select = false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			unite1_select = false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
			unite2_select = false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			unite3_select = false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
			vaisseau_select=true;
				vaisseau.removeComponent("vaisseau");
				vaisseau.addComponent("vaisseausel");
		}
	})
	
	tank1.bind('Click', function() {
		if(tank1_select==true) {
			tank1_select=false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			}
		else{
			vaisseau_select = false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
			tank2_select = false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			unite1_select = false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
			unite2_select = false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			unite3_select = false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
			tank1_select=true;
				tank1.removeComponent("tank");
				tank1.addComponent("tanksel");
		}
	})
	
	tank2.bind('Click', function() {
		if(tank2_select==true) {
			tank2_select=false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			}
			else{
			vaisseau_select = false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
			tank1_select = false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			unite1_select = false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
			unite2_select = false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			unite3_select = false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
			tank2_select=true;
				tank2.removeComponent("tank");
				tank2.addComponent("tanksel");
		}
	})
	
	unite1.bind('Click', function() {
		if(unite1_select==true) {
			unite1_select=false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
		}
		else{
			vaisseau_select = false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
			tank1_select = false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			tank2_select = false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			unite2_select = false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			unite3_select = false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
			unite1_select=true;
				unite1.removeComponent("unite");
				unite1.addComponent("unitesel");
		}
	})
	
	unite2.bind('Click', function() {
		if(unite2_select==true) {
			unite2_select=false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			}
		else{
			vaisseau_select = false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
			tank1_select = false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			tank2_select = false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			unite1_select = false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
			unite3_select = false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
			unite2_select=true;
				unite2.removeComponent("unite");
				unite2.addComponent("unitesel");
		}
	})
	
	unite3.bind('Click', function() {
		if(unite3_select==true) {
			unite3_select=false;
				unite3.removeComponent("unitesel");
				unite3.addComponent("unite");
		}
		else{
			vaisseau_select = false;
				vaisseau.removeComponent("vaisseausel");
				vaisseau.addComponent("vaisseau");
			tank1_select = false;
				tank1.removeComponent("tanksel");
				tank1.addComponent("tank");
			tank2_select = false;
				tank2.removeComponent("tanksel");
				tank2.addComponent("tank");
			unite1_select = false;
				unite1.removeComponent("unitesel");
				unite1.addComponent("unite");
			unite2_select = false;
				unite2.removeComponent("unitesel");
				unite2.addComponent("unite");
			unite3_select=true;
				unite3.removeComponent("unite");
				unite3.addComponent("unitesel");
		}
	})
	
	/** Bouton retour menu **/
	Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
				retourmenu: [0, 0],
				retourmenuactive: [1, 0]
			});
	
	bouton_menu2 = Crafty.e("2D, DOM, Mouse, Persist, retourmenu")
		.attr({x:730, y:500})
		.areaMap([0,0], [120,0], [120,60], [0,60])
		bouton_menu2.bind('MouseUp', function(e) { 
			if(e.mouseButton == Crafty.mouseButtons.LEFT)
				/** On retire l'effet qui empêche les entités de disparaitre au changement de scène **/
				vaisseau.removeComponent("Persist");
				tank1.removeComponent("Persist");
				tank2.removeComponent("Persist");
				unite1.removeComponent("Persist");
				unite2.removeComponent("Persist");
				unite3.removeComponent("Persist");
				/** On détruit ce bouton **/
				this.destroy();
				/** On réinitialise les variables **/
				reset_game();
				/** On change de scène **/
				Crafty.scene("menu");
			})
		bouton_menu2.bind('MouseOver', function(e) {
			bouton_menu2.removeComponent("retourmenu");
			bouton_menu2.addComponent("retourmenuactive");
			Crafty.audio.play("bouton",1);
		})
		bouton_menu2.bind('MouseOut', function(e) {
			bouton_menu2.removeComponent("retourmenuactive");
			bouton_menu2.addComponent("retourmenu");
		})
	
	},function() {
				vaisseau.removeComponent("Persist");
				tank1.removeComponent("Persist");
				tank2.removeComponent("Persist");
				unite1.removeComponent("Persist");
				unite2.removeComponent("Persist");
				unite3.removeComponent("Persist");
	});
	
	
	/** Scene correspondant au jeu (placement bateau IA) **/
	Crafty.scene("IA_place", function(){
	/** Création du brouillard de guerre + gestion du tir joueur **/
		var case_touche = false;
		var lastx = 0;
		var lasty = 0;
	
		
		function checktir() {
			/** Check du vaisseau 1 **/
			if ((lastx == vaisseau_x) && (lasty == vaisseau_y)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+34)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+0) && (lasty == vaisseau_y+68)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
			case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
			case_touche = true;
			}
			/** Check du tank1 **/
			else if ((lastx == tank1_x) && (lasty == tank1_y)) {
			case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y)) {
			case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty == tank1_y+34)) {
			case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y+34)) {
			case_touche = true;
			}
			/** Check du tank2 **/
			else if ((lastx == tank2_x) && (lasty == tank2_y)) {
			case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y)) {
			case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty == tank2_y+34)) {
			case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y+34)) {
			case_touche = true;
			}
			else if ((lastx == unite1_x) && (lasty == unite1_y)) {
			case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty == unite2_y)) {
			case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty == unite3_y)) {
			case_touche = true;
			}
			else {
			case_touche = false;
			}
		}
		
		/** Génération bateaux IA **/
		
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
		} while (case_touche == true)

		var unite1_ia = Crafty.e("2D, DOM, unite_ia")
				.attr({x: lastx, y:lasty})
				
		unite1_ia_x = unite1_ia._x;
		unite1_ia_y = unite1_ia._y;
		
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
		} while(case_touche == true)
		
		unite2_ia_x = lastx;
		unite2_ia_y = lasty;
		
		var unite2_ia = Crafty.e("2D, DOM, unite_ia")
				.attr({x: lastx, y:lasty})
				
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}			
		} while(case_touche == true)
		
		unite3_ia_x = lastx;
		unite3_ia_y = lasty;

		var unite3_ia = Crafty.e("2D, DOM, unite_ia")
				.attr({x: lastx, y:lasty})
				
		do {
			lastx = Crafty.math.randomInt(2, 16) * 34;
			lasty = Crafty.math.randomInt(2, 16) * 34;
			checktir();
			/*************************************************/
			/**				CHECK TANK 1 IA				    **/
			/*************************************************/

			/** 		DEBUT CHECK UNITE 		**/
			if ((lastx == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			/** FIN CHECK UNITE > TOUTES LES CASES DU TANK 1 IA NE PEUVENT ETRE SUR UNE UNITE JOUEUR**/
			
			/** 		DEBUT CHECK UNITE IA		**/
			else if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite1_ia_x) && (lasty+34 == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty+34 == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}			
			else if ((lastx+34 == unite2_ia_x) && (lasty == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty+34 == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite2_ia_x) && (lasty+34 == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty == unite3_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty+34 == unite3_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty+34 == unite3_ia_y)){
				case_touche = true;
			}
			/** FIN CHECK UNITE IA > TOUTES LES CASES DU TANK 1 IA NE PEUVENT ETRE SUR UNE UNITE IA **/

			/** DEBUT CHECK TANK 1 IA AVEC TANK 1 JOUEUR **/
			else if ((lastx == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK IA AVEC TANK 1 JOUEUR > TANK 1 IA NE PEUT ETRE EN CONTACT AVEC TANK 1 JOUEUR **/
			
			/** DEBUT CHECK TOUTES CASES TANK 1 IA AVEC TANK 2 JOUEUR **/
			else if ((lastx == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 1 IA AVEC TANK 2 JOUEUR > TANK 1 IA NE PEUT ETRE EN CONTACT AVEC TANK 2 JOUEUR **/

			/** DEBUT CHECK TOUTES CASES TANK 1 IA AVEC VAISSEAU JOUEUR **/
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 1 IA AVEC VAISSEAU JOUEUR > TANK 1 IA NE PEUT ETRE EN CONTACT AVEC VAISSEAU JOUEUR **/
		} while(case_touche == true)
		
		tank1_ia_x = lastx;
		tank1_ia_y = lasty;
		
		var tank1_ia = Crafty.e("2D, DOM, tank_ia")
				.attr({x: lastx, y:lasty})
				
		do {
			lastx = Crafty.math.randomInt(2, 16) * 34;
			lasty = Crafty.math.randomInt(2, 16) * 34;
			checktir();
			/*************************************************/
			/**				CHECK TANK 2 IA					**/
			/*************************************************/

			/** 		DEBUT CHECK UNITE 		**/
			if ((lastx == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			/** FIN CHECK UNITE > TOUTES LES CASES DU TANK 2 IA NE PEUVENT ETRE SUR UNE UNITE JOUEUR**/
			
			/** 		DEBUT CHECK UNITE IA		**/
			else if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite1_ia_x) && (lasty+34 == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty+34 == unite1_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}			
			else if ((lastx+34 == unite2_ia_x) && (lasty == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty+34 == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite2_ia_x) && (lasty+34 == unite2_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty == unite3_ia_y)){
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty+34 == unite3_ia_y)){
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty+34 == unite3_ia_y)){
				case_touche = true;
			}
			/** FIN CHECK UNITE IA > TOUTES LES CASES DU TANK 2 IA NE PEUVENT ETRE SUR UNE UNITE IA **/

			/** DEBUT CHECK TANK 2 IA AVEC TANK 1 JOUEUR **/
			else if ((lastx == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 2 IA AVEC TANK 1 JOUEUR > TANK 2 IA NE PEUT ETRE EN CONTACT AVEC TANK 1 JOUEUR **/
			
			/** DEBUT CHECK TOUTES CASES TANK 2 IA AVEC TANK 2 JOUEUR **/
			else if ((lastx == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 2 IA AVEC TANK 2 JOUEUR > TANK 2 IA NE PEUT ETRE EN CONTACT AVEC TANK 2 JOUEUR **/

			
			/** DEBUT CHECK TOUTES CASES TANK 2 IA AVEC TANK 1 IA **/
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 2 IA AVEC TANK 1 IA > TANK 2 IA NE PEUT ETRE EN CONTACT AVEC TANK 1 IA **/

			/** DEBUT CHECK TOUTES CASES TANK 2 IA AVEC VAISSEAU JOUEUR **/
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES TANK 2 IA AVEC VAISSEAU JOUEUR > TANK 2 IA NE PEUT ETRE EN CONTACT AVEC VAISSEAU JOUEUR **/
		} while(case_touche == true)
		
		tank2_ia_x = lastx;
		tank2_ia_y = lasty;
		
		var tank2_ia = Crafty.e("2D, DOM, tank_ia")
				.attr({x: lastx, y:lasty})
		
		do {
			lastx = Crafty.math.randomInt(2, 15) * 34;
			lasty = Crafty.math.randomInt(2, 15) * 34;
			checktir();
			/*************************************************/
			/**				CHECK VAISSEAU IA				**/
			/*************************************************/

			/** 		DEBUT CHECK UNITE 		**/
			if ((lastx == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_x) && (lasty+68 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_x) && (lasty+68 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_x) && (lasty == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_x) && (lasty+34 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_x) && (lasty+68 == unite1_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_x) && (lasty+68 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_x) && (lasty+68 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_x) && (lasty == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_x) && (lasty+34 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_x) && (lasty+68 == unite2_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_x) && (lasty+68 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_x) && (lasty+68 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_x) && (lasty == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_x) && (lasty+34 == unite3_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_x) && (lasty+68 == unite3_y)) {
				case_touche = true;
			}
			/** FIN CHECK UNITE > TOUTES LES CASES DU VAISSEAU IA NE PEUVENT ETRE SUR UNE UNITE JOUEUR**/
			
			/** 		DEBUT CHECK UNITE IA		**/
			else if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_ia_x) && (lasty+34 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite1_ia_x) && (lasty+68 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty+34 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite1_ia_x) && (lasty+68 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_ia_x) && (lasty == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_ia_x) && (lasty+34 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite1_ia_x) && (lasty+68 == unite1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty+34 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty+68 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_ia_x) && (lasty+34 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite2_ia_x) && (lasty+68 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_ia_x) && (lasty == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_ia_x) && (lasty+34 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite2_ia_x) && (lasty+68 == unite2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty+34 == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty+68 == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty+34 == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == unite3_ia_x) && (lasty+68 == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_ia_x) && (lasty == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_ia_x) && (lasty+34 == unite3_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == unite3_ia_x) && (lasty+68 == unite3_ia_y)) {
				case_touche = true;
			}
			/** FIN CHECK UNITE IA > TOUTES LES CASES DU VAISSEAU IA NE PEUVENT ETRE SUR UNE UNITE IA **/

			/** DEBUT CHECK VAISSEAU IA AVEC TANK 1 JOUEUR **/
			else if ((lastx == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty+34 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty+68 == tank1_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_x+34) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_x+34) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty+34 == tank1_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_x+34) && (lasty+68 == tank1_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES VAISSEAU IA AVEC TANK 1 JOUEUR > VAISSEAU IA NE PEUT ETRE EN CONTACT AVEC TANK 1 JOUEUR **/
			
			/** DEBUT CHECK TOUTES CASES VAISSEAU IA AVEC TANK 2 JOUEUR **/
			else if ((lastx == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty+34 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty+68 == tank2_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_x+34) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_x+34) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty+34 == tank2_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_x+34) && (lasty+68 == tank2_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES VAISSEAU IA AVEC TANK 2 JOUEUR > VAISSEAU IA NE PEUT ETRE EN CONTACT AVEC TANK 2 JOUEUR **/

			
			/** DEBUT CHECK TOUTES CASES VAISSEAU IA AVEC TANK 1 IA **/
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty+68 == tank1_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank1_ia_x+34) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty+34 == tank1_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank1_ia_x+34) && (lasty+68 == tank1_ia_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES VAISSEAU IA AVEC TANK 1 IA > VAISSEAU IA NE PEUT ETRE EN CONTACT AVEC TANK 1 IA **/

			

			/** DEBUT CHECK TOUTES CASES VAISSEAU IA AVEC TANK 2 IA **/
			else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty+34 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty+68 == tank2_ia_y)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == tank2_ia_x+34) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty+34 == tank2_ia_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == tank2_ia_x+34) && (lasty+68 == tank2_ia_y+34)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES VAISSEAU IA AVEC TANK 2 IA > VAISSEAU IA NE PEUT ETRE EN CONTACT AVEC TANK 2 IA **/

			/** 		DEBUT CHECK TOUTES CASES VAISSEAU IA AVEC VAISSEAU JOUEUR 		**/
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+34) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+34) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+34) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+34 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+68 == vaisseau_y)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+34 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+68 == vaisseau_y+34)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx == vaisseau_x+68) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+34 == vaisseau_x+68) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+34 == vaisseau_y+68)) {
				case_touche = true;
			}
			else if ((lastx+68 == vaisseau_x+68) && (lasty+68 == vaisseau_y+68)) {
				case_touche = true;
			}
			/** FIN CHECK TOUTES CASES VAISSEAU IA AVEC VAISSEAU JOUEUR > VAISSEAU IA NE PEUT ETRE EN CONTACT AVEC VAISSEAU JOUEUR**/
		} while(case_touche == true)
		
		vaisseau_ia_x = lastx;
		vaisseau_ia_y = lasty;
		
		var vaisseau_ia = Crafty.e("2D, DOM, vaisseau_ia")
				.attr({x: lastx, y:lasty})
		
		/**Fonction vérification création bonus**/
		
		function checkcreabonus() {
		if ((lastx == bonus_1_x) && (lasty == bonus_1_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_3_x) && (lasty == bonus_3_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_4_x) && (lasty == bonus_4_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_5_x) && (lasty == bonus_5_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_6_x) && (lasty == bonus_6_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_7_x) && (lasty == bonus_7_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_8_x) && (lasty == bonus_8_y)){
				case_touche = true;
			}
			else if ((lastx == bonus_9_x) && (lasty == bonus_9_y)){
				case_touche = true;
			}
		}
		
		/** Creation bonus **/
		
		Crafty.sprite(34, "assets/unite/classique/bonus.png", {
			bonus: [0, 0]
		});

		/**1**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
		} while ((case_touche == true) || (ia_touche == true))

		bonus_1 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_1.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_1_x = lastx;
		bonus_1_y = lasty;

		/**2**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_2 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_2.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_2_x = lastx;
		bonus_2_y = lasty;

		/**3**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_3 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_3.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_3_x = lastx;
		bonus_3_y = lasty;

		/**4**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_4 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_4.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_4_x = lastx;
		bonus_4_y = lasty;

		/**5**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_5 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_5.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_5_x = lastx;
		bonus_5_y = lasty;

		/**6**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_6 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_6.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_6_x = lastx;
		bonus_6_y = lasty;

		/**7**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_7 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_7.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_7_x = lastx;
		bonus_7_y = lasty;

		/**8**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_8 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_8.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_8_x = lastx;
		bonus_8_y = lasty;

		/**9**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_9 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_9.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_9_x = lastx;
		bonus_9_y = lasty;

		/**10**/
		do {
			lastx = Crafty.math.randomInt(2, 17) * 34;
			lasty = Crafty.math.randomInt(2, 17) * 34;
			checktir();
			checkia();
			checkcreabonus()
		} while ((case_touche == true) || (ia_touche == true))

		bonus_10 = Crafty.e("2D, DOM, Mouse, bonus")
			.attr({x: lastx, y:lasty})
			.areaMap([0, 0], [34,0], [34,34], [0, 34])
			bonus_10.bind('MouseUp', function(e) { 
				if(e.mouseButton == Crafty.mouseButtons.LEFT)
					energie = energie + 1;
					this.destroy();
					jauge_energie();
			})
		bonus_10_x = lastx;
		bonus_10_x = lasty;

		
		/** Empêcher l'ia de couler ses bateaux **/
		var vaisseau_ia_coord = (vaisseau_ia_x /34)*16 + (vaisseau_ia_y /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-34)/34)*16 + (vaisseau_ia_y /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-68)/34)*16 + (vaisseau_ia_y /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = (vaisseau_ia_x /34)*16 + ((vaisseau_ia_y-34) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = (vaisseau_ia_x /34)*16 + ((vaisseau_ia_y-68) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-34) /34)*16 + ((vaisseau_ia_y-34) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-34) /34)*16 + ((vaisseau_ia_y-68) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-68) /34)*16 + ((vaisseau_ia_y-34) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		vaisseau_ia_coord = ((vaisseau_ia_x-68) /34)*16 + ((vaisseau_ia_y-68) /34);
		tir_ia[vaisseau_ia_coord] = 1;
		
		var unite1_ia_coord = ((unite1_ia_x /34)*16 + (unite1_ia_y /34))-34;
		tir_ia[unite1_ia_coord] = 1;
		
		var unite2_ia_coord = ((unite2_ia_x /34)*16 + (unite2_ia_y /34))-34;
		tir_ia[unite2_ia_coord] = 1;
		
		var unite3_ia_coord = ((unite3_ia_x /34)*16 + (unite3_ia_y /34))-34;
		tir_ia[unite3_ia_coord] = 1;
		
		var tank1_ia_coord = ((tank1_ia_x /34)*16 + (tank1_ia_y /34))-34;
		tir_ia[tank1_ia_coord] = 1;
		tank1_ia_coord = (((tank1_ia_x+34) /34)*16 + (tank1_ia_y /34))-34;
		tir_ia[tank1_ia_coord] = 1;
		tank1_ia_coord = (((tank1_ia_x+34) /34)*16 + ((tank1_ia_y+34) /34))-34;
		tir_ia[tank1_ia_coord] = 1;
		tank1_ia_coord = ((tank1_ia_x /34)*16 + ((tank1_ia_y+34) /34))-34;
		tir_ia[tank1_ia_coord] = 1;
		
		var tank2_ia_coord = ((tank2_ia_x /34)*16 + (tank2_ia_y /34))-34;
		tir_ia[tank2_ia_coord] = 1;
		tank2_ia_coord = (((tank2_ia_x+34) /34)*16 + (tank2_ia_y /34))-34;
		tir_ia[tank2_ia_coord] = 1;
		tank2_ia_coord = (((tank2_ia_x+34) /34)*16 + ((tank2_ia_y+34) /34))-34;
		tir_ia[tank2_ia_coord] = 1;
		tank2_ia_coord = ((tank2_ia_x /34)*16 + ((tank2_ia_y+34) /34))-34;
		tir_ia[tank2_ia_coord] = 1;
		
		/** Check tir vers les bateaux IA **/
		
		function checkia() {
			/** Check du vaisseau 1 **/
			if ((lastx == vaisseau_ia_x) && (lasty == vaisseau_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x) && (lasty == vaisseau_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+0) && (lasty == vaisseau_ia_y+68)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+34) && (lasty == vaisseau_ia_y+68)) {
			ia_touche = true;
			}
			else if ((lastx == vaisseau_ia_x+68) && (lasty == vaisseau_ia_y+68)) {
			ia_touche = true;
			}
			/** Check du tank1 **/
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == tank1_ia_x) && (lasty == tank1_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == tank1_ia_x+34) && (lasty == tank1_ia_y+34)) {
			ia_touche = true;
			}
			/** Check du tank2 **/
			else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == tank2_ia_x) && (lasty == tank2_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == tank2_ia_x+34) && (lasty == tank2_ia_y+34)) {
			ia_touche = true;
			}
			else if ((lastx == unite1_ia_x) && (lasty == unite1_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == unite2_ia_x) && (lasty == unite2_ia_y)) {
			ia_touche = true;
			}
			else if ((lastx == unite3_ia_x) && (lasty == unite3_ia_y)) {
			ia_touche = true;
			}
			else {
			ia_touche = false;
			}
		}
		
		/** check avec bonus **/
		function checkbonus() {
			if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
			bonus_touche = true;
			}
			else if ((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
			bonus_touche = true;
			}
		}
		

		
		Crafty.sprite(34, "assets/unite/touche.png", {
				touche: [0, 0]
			});
		Crafty.sprite(34, "assets/unite/rate.png", {
				rate: [0, 0]
			});
		Crafty.sprite(34, "assets/fond/brouillard.png", {
			brouillard: [0,0],
			vide: [1,0]
		});
		
		
		var i = 68;
		var j = 68;
		var tab=0;
		var pl = new Array()
			do{
				while(j<579){
					pl[tab] = Crafty.e("2D, DOM, Mouse, brouillard")
						.attr({x:i, y:j, w: 34, h: 34 })
						.areaMap([0,0], [34,0], [34,34], [0,34])
						pl[tab].bind('MouseUp', function(e) {
							if( e.mouseButton == Crafty.mouseButtons.LEFT ) {
								var pltab_x = this._x;
								var pltab_y = this._y;
								if (skill == 1) { //Skil radar
									var case_counter = ((this._x /34)*16 + (this._y /34))-34;
									if (case_counter == 0) {	//cas spécifique haut-gauche
										pl[case_counter].addComponent("vide");
										pl[case_counter+1].addComponent("vide");
										pl[case_counter+16].addComponent("vide");
										pl[case_counter+17].addComponent("vide");
									}
									else if (case_counter == 15) {	//cas spécifique bas-gauche
										pl[case_counter].addComponent("vide");
										pl[case_counter+16].addComponent("vide");
										pl[case_counter+15].addComponent("vide");
										pl[case_counter-1].addComponent("vide");
										}
									else if (case_counter == 255) {	//cas spécifique bas-droite
										pl[case_counter].addComponent("vide");
										pl[case_counter-1].addComponent("vide");
										pl[case_counter-16].addComponent("vide");
										pl[case_counter-17].addComponent("vide");
									}
									else if (case_counter == 240) {	//cas spécifique haut-droite
										pl[case_counter].addComponent("vide");
										pl[case_counter+1].addComponent("vide");
										pl[case_counter-16].addComponent("vide");
										pl[case_counter-15].addComponent("vide");
									}
									else if (case_counter <16) {	//cas spécifique ligne de gauche
										pl[case_counter].addComponent("vide");
										pl[case_counter-1].addComponent("vide");
										pl[case_counter+1].addComponent("vide");
										pl[case_counter+16].addComponent("vide");
										pl[case_counter+17].addComponent("vide");
										pl[case_counter+15].addComponent("vide");
									}
									else if (case_counter > 240) {	//cas spécifique ligne de droite
										pl[case_counter].addComponent("vide");
										pl[case_counter+1].addComponent("vide");
										pl[case_counter-1].addComponent("vide");
										pl[case_counter-16].addComponent("vide");
										pl[case_counter-15].addComponent("vide");
										pl[case_counter-17].addComponent("vide");
									}
									else {
										var hautligne = case_counter % 16;
										var basligne = case_counter+1;
										basligne = basligne % 16;
										if (hautligne == 0) { //ligne du haut
											pl[case_counter].addComponent("vide");
											pl[case_counter+1].addComponent("vide");
											pl[case_counter+16].addComponent("vide");
											pl[case_counter-16].addComponent("vide");
											pl[case_counter+17].addComponent("vide");
											pl[case_counter-15].addComponent("vide");
										}
										else if (basligne == 0) { //ligne du bas
											pl[case_counter].addComponent("vide");
											pl[case_counter-1].addComponent("vide");
											pl[case_counter-16].addComponent("vide");
											pl[case_counter+16].addComponent("vide");
											pl[case_counter-17].addComponent("vide");
											pl[case_counter+15].addComponent("vide");
										}
										else { 
											pl[case_counter].addComponent("vide");
											pl[case_counter+1].addComponent("vide");
											pl[case_counter-1].addComponent("vide");
											pl[case_counter+16].addComponent("vide");
											pl[case_counter-16].addComponent("vide");
											pl[case_counter+17].addComponent("vide");
											pl[case_counter+15].addComponent("vide");
											pl[case_counter-17].addComponent("vide");
											pl[case_counter-15].addComponent("vide");
										}
									}
									skill = 0;
								}
								else if (skill == 3) {	//skill laser vertical
									var compteurlaser = 0;
										while (compteurlaser < 256) {
											var laser_tir = pl[compteurlaser]._x;
												if (laser_tir == pltab_x) {
													pl[compteurlaser].destroy();
													tir_ia[compteurlaser] = 1;
													lastx = pl[compteurlaser]._x;
													lasty = pl[compteurlaser]._y;
													checkia();
													checktir();
														if (ia_touche == true) {
															var touche = Crafty.e("2D, DOM,	touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_ia = nb_bateau_ia -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else if(case_touche == true) {
															var touche = Crafty.e("2D, DOM, touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_joueur = nb_bateau_joueur -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else {
															var rate = Crafty.e("2D, DOM, rate")
																.attr({x:lastx, y:lasty})
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
															bonus_1.destroy();
														}
														else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
															bonus_2.destroy();
														}
														else if((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
															bonus_3.destroy();
														}
														else if((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
															bonus_4.destroy();
														}
														else if((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
															bonus_5.destroy();
														}
														else if((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
															bonus_6.destroy();
														}
														else if((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
															bonus_7.destroy();
														}
														else if((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
															bonus_8.destroy();
														}
														else if((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
															bonus_9.destroy();
														}
														else if((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
															bonus_10.destroy();
														}
												}
											compteurlaser++;
										}
									skill = 0;
								}
								else if (skill == 2) {	//skill laser horizontal
									var compteurlaser = 0;
										while (compteurlaser < 256) {
											var laser_tir = pl[compteurlaser]._y;
												if (laser_tir == pltab_y) {
													pl[compteurlaser].destroy();
													tir_ia[compteurlaser] = 1;
													lastx = pl[compteurlaser]._x;
													lasty = pl[compteurlaser]._y;
													checkia();
													checktir();
														if (ia_touche == true) {
															var touche = Crafty.e("2D, DOM,	touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_ia = nb_bateau_ia -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else if(case_touche == true) {
															var touche = Crafty.e("2D, DOM, touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_joueur = nb_bateau_joueur -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else {
															var rate = Crafty.e("2D, DOM, rate")
																.attr({x:lastx, y:lasty})
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
															bonus_1.destroy();
														}
														else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
															bonus_2.destroy();
														}
														else if((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
															bonus_3.destroy();
														}
														else if((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
															bonus_4.destroy();
														}
														else if((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
															bonus_5.destroy();
														}
														else if((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
															bonus_6.destroy();
														}
														else if((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
															bonus_7.destroy();
														}
														else if((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
															bonus_8.destroy();
														}
														else if((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
															bonus_9.destroy();
														}
														else if((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
															bonus_10.destroy();
														}
												}
											compteurlaser++;
										}
									skill = 0;
								}
								else {				// Tir classique
									nb_tir += 1;
									lastx = this._x;
									lasty = this._y;
									this.destroy();
									checkia();
									checktir();
										if (ia_touche == true) {
											var touche = Crafty.e("2D, DOM,	touche")
												.attr({x:lastx, y:lasty})
												nb_bateau_ia = nb_bateau_ia -1;
												var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
												tir_ia[tir_joueur] = 1;
												nb_tir_touche = nb_tir_touche + 1;
										}
										else if(case_touche == true) {
											var touche = Crafty.e("2D, DOM, touche")
												.attr({x:lastx, y:lasty})
												nb_bateau_joueur = nb_bateau_joueur -1;
												var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
												tir_ia[tir_joueur] = 1;
										}
										else {
											var rate = Crafty.e("2D, DOM, rate")
												.attr({x:lastx, y:lasty})
												var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
												tir_ia[tir_joueur] = 1;
										}
								}
							if (energie_ia >= 2) {
								var randskill = Crafty.math.randomInt(0, 1);
									if (randskill == 1) {	//laser vertical
										energie_ia = energie_ia-2;
										var compteurlaser = 0;
										var pltab_x = Crafty.math.randomInt(1, 16);
										pltab_x = (pltab_x*34)+68;
										while (compteurlaser < 256) {
											var laser_tir = pl[compteurlaser]._x;
												if (laser_tir == pltab_x) {
													pl[compteurlaser].destroy();
													tir_ia[compteurlaser] = 1;
													lastx = pl[compteurlaser]._x;
													lasty = pl[compteurlaser]._y;
													checkia();
													checktir();
														if (ia_touche == true) {
															var touche = Crafty.e("2D, DOM,	touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_ia = nb_bateau_ia -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else if(case_touche == true) {
															var touche = Crafty.e("2D, DOM, touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_joueur = nb_bateau_joueur -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else {
															var rate = Crafty.e("2D, DOM, rate")
																.attr({x:lastx, y:lasty})
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
															bonus_1.destroy();
														}
														else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
															bonus_2.destroy();
														}
														else if((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
															bonus_3.destroy();
														}
														else if((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
															bonus_4.destroy();
														}
														else if((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
															bonus_5.destroy();
														}
														else if((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
															bonus_6.destroy();
														}
														else if((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
															bonus_7.destroy();
														}
														else if((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
															bonus_8.destroy();
														}
														else if((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
															bonus_9.destroy();
														}
														else if((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
															bonus_10.destroy();
														}
												}
											compteurlaser++;
										}
									}
									else {		//laser horizontal
										energie_ia = energie_ia-2;
										var compteurlaser = 0;
										var pltab_y = Crafty.math.randomInt(1, 16);
										pltab_y = (pltab_y*34)+68;
										while (compteurlaser < 256) {
											var laser_tir = pl[compteurlaser]._y;
												if (laser_tir == pltab_y) {
													pl[compteurlaser].destroy();
													tir_ia[compteurlaser] = 1;
													lastx = pl[compteurlaser]._x;
													lasty = pl[compteurlaser]._y;
													checkia();
													checktir();
														if (ia_touche == true) {
															var touche = Crafty.e("2D, DOM,	touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_ia = nb_bateau_ia -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else if(case_touche == true) {
															var touche = Crafty.e("2D, DOM, touche")
																.attr({x:lastx, y:lasty})
																nb_bateau_joueur = nb_bateau_joueur -1;
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														else {
															var rate = Crafty.e("2D, DOM, rate")
																.attr({x:lastx, y:lasty})
																var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
																tir_ia[tir_joueur] = 1;
														}
														if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
															bonus_1.destroy();
														}
														else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
															bonus_2.destroy();
														}
														else if((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
															bonus_3.destroy();
														}
														else if((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
															bonus_4.destroy();
														}
														else if((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
															bonus_5.destroy();
														}
														else if((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
															bonus_6.destroy();
														}
														else if((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
															bonus_7.destroy();
														}
														else if((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
															bonus_8.destroy();
														}
														else if((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
															bonus_9.destroy();
														}
														else if((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
															bonus_10.destroy();
														}
												}
											compteurlaser++;
										}
									}
							}
							else {		//attaque auto de l'ia
								do {
									var randtir = Crafty.math.randomInt(0, 255);
								} while (tir_ia[randtir] == 1)
								nb_tir_ia = nb_tir_ia +1;
								tir_ia[randtir] = 1;
								pl[randtir].destroy();
								lastx = pl[randtir]._x;
								lasty = pl[randtir]._y;
												
								checktir();
									if (case_touche == true) {
										var touche = Crafty.e("2D, DOM,	touche")
											.attr({x:lastx, y:lasty})
											nb_bateau_joueur= nb_bateau_joueur-1;
									}
									else {
										var rate = Crafty.e("2D, DOM, rate")
											.attr({x:lastx, y:lasty})
											
										if ((lastx == bonus_1_x) && (lasty == bonus_1_y)) {
											bonus_1.destroy();
											energie_ia = energie_ia + 1;
										}
										else if ((lastx == bonus_2_x) && (lasty == bonus_2_y)) {
											bonus_2.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_3_x) && (lasty == bonus_3_y)) {
											bonus_3.destroy();
											energie_ia = energie_ia+1;
										}
										else if((lastx == bonus_4_x) && (lasty == bonus_4_y)) {
											bonus_4.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_5_x) && (lasty == bonus_5_y)) {
											bonus_5.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_6_x) && (lasty == bonus_6_y)) {
											bonus_6.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_7_x) && (lasty == bonus_7_y)) {
											bonus_7.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_8_x) && (lasty == bonus_8_y)) {
											bonus_8.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_9_x) && (lasty == bonus_9_y)) {
											bonus_9.destroy();
											energie_ia = energie_ia + 1;
										}
										else if((lastx == bonus_10_x) && (lasty == bonus_10_y)) {
											bonus_10.destroy();
											energie_ia = energie_ia + 1;
										}
									}
								}
							if (nb_bateau_ia <= 0) {
								nb_victoire++;
								bouton_menu2.removeComponent("Persist");
								Crafty.scene("victoire");
							}
							else if (nb_bateau_joueur <= 0) {
								nb_defaite++;
								bouton_menu2.removeComponent("Persist");
								Crafty.scene("defaite");
							}
						}
						})
				j=j+34;
				tab++;
				}
			i=i+34;
			j=68;
			}while ((i<579) || (tab <= 1)) 
			
		
		var reveal = ((vaisseau_x /34)*16 + (vaisseau_y /34))-34;
		pl[reveal].destroy();
		reveal = ((vaisseau_x /34)*16 + ((vaisseau_y+34) /34))-34;
		pl[reveal].destroy();
		reveal = ((vaisseau_x /34)*16 + ((vaisseau_y+68) /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+34) /34)*16 + ((vaisseau_y+68) /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+34) /34)*16 + ((vaisseau_y+34) /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+34) /34)*16 + (vaisseau_y /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+68) /34)*16 + (vaisseau_y /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+68) /34)*16 + ((vaisseau_y+34) /34))-34;
		pl[reveal].destroy();
		reveal = (((vaisseau_x+68) /34)*16 + ((vaisseau_y+68) /34))-34;
		pl[reveal].destroy();
		
		reveal = ((tank1_x /34)*16 + (tank1_y /34))-34;
		pl[reveal].destroy();
		reveal = ((tank1_x /34)*16 + ((tank1_y+34) /34))-34;
		pl[reveal].destroy();
		reveal = (((tank1_x+34) /34)*16 + (tank1_y /34))-34;
		pl[reveal].destroy();
		reveal = (((tank1_x+34) /34)*16 + ((tank1_y+34) /34))-34;
		pl[reveal].destroy();
		
		reveal = ((tank2_x /34)*16 + (tank2_y /34))-34;
		pl[reveal].destroy();
		reveal = ((tank2_x /34)*16 + ((tank2_y+34) /34))-34;
		pl[reveal].destroy();
		reveal = (((tank2_x+34) /34)*16 + (tank2_y /34))-34;
		pl[reveal].destroy();
		reveal = (((tank2_x+34) /34)*16 + ((tank2_y+34) /34))-34;
		pl[reveal].destroy();
		
		reveal = ((unite1_x /34)*16 + (unite1_y /34))-34;
		pl[reveal].destroy();
		reveal = ((unite2_x /34)*16 + (unite2_y /34))-34;
		pl[reveal].destroy();
		reveal = ((unite3_x /34)*16 + (unite3_y /34))-34;
		pl[reveal].destroy();
		
		/** Jauge d'énergie **/
		
		
		Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
				troissurtrois: [0,0],
				deuxsurtrois: [1,0],
				unsurtrois: [2,0],
				zerosurtrois: [3,0],
			});
		
		var jauge_energie_0 = Crafty.e("2D, DOM, zerosurtrois")
				.attr({x: 710, y: 75})
		
		/** Jauge d'energie en fonction du bonus **/		
		function jauge_energie() {
			jauge_energie_0.destroy();
			if (energie == 0) {
					Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
					energie_sprite: [3,0],
				});
			}
			else if (energie == 1) {
				Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
					energie_sprite: [2,0],
				});
				}
			else if (energie == 2) {
				Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
					energie_sprite: [1,0],
				});
			}
			else if (energie == 3) {
				Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
					energie_sprite: [0,0],
				});
			}
			else if (energie == 4) {
				energie = 3;
				Crafty.sprite(150, "assets/bouton/classique/jauge_energie.png", {
					energie_sprite: [0,0],
				});
			}
			jauge_energie_0 = Crafty.e("2D, DOM, energie_sprite")
				.attr({x: 710, y: 75})
		}
		
		/** Skills **/
		
		Crafty.sprite(130, "assets/radar.png", {
				skill_radar: [0,0],
			});
		Crafty.sprite(68, "assets/laserh.png", {
				skill_laser_h: [0,0],
			});
		Crafty.sprite(68, "assets/laserv.png", {
				skill_laser_v: [0,0],
			});
			
		var bouton_skill_radar = Crafty.e("2D, DOM, Mouse, skill_radar")
				.attr({x:730, y:350})
				.areaMap([0,0], [130,0], [130, 130], [0, 130]);
				bouton_skill_radar.bind('Click', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						if (energie >= 1) {
						skill = 1;
						energie = energie - 1;
						}
						else {
						alert("Pas assez d'énergie");
						}
						jauge_energie();
				})
				bouton_skill_radar.bind('KeyDown', function(e) {	
					if(e.key == Crafty.keys['E']){
						if (energie >= 1) {
						skill = 1;
						energie = energie - 1;
						}
						else {
						alert("Pas assez d'énergie");
						}
						jauge_energie();
					}
				})
		
		var bouton_skill_laser_horizontal = Crafty.e("2D, DOM, Mouse, skill_laser_v") 
				.attr({x: 750, y: 250})
				.areaMap([0,0], [68,0], [68,68], [0,68])
				bouton_skill_laser_horizontal.bind('Click', function(e) {
					if(e.mouseButton == Crafty.mouseButtons.LEFT){
						if (energie >= 2) {
							skill = 3;
							energie = energie - 2;
						}
						else {
							alert("Pas assez d'énergie");
						}
						jauge_energie();
					}
					})	
				bouton_skill_laser_horizontal.bind('KeyDown', function(e) {	
					if(e.key == Crafty.keys['A']){
						if (energie >= 2) {
							skill = 3;
							energie = energie - 2;
						}
						else {
							alert("Pas assez d'énergie");
						}
						jauge_energie();
					}
				})
				
		var bouton_skill_laser_vertical = Crafty.e("2D, DOM, Mouse, skill_laser_h")
				.attr({x:750, y:150})
				.areaMap([0,0], [68,0], [68,68], [0,68])
				bouton_skill_laser_vertical.bind('Click', function(e) {
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						if (energie >= 2) {
							skill = 2;
							energie = energie - 2;
						}
						else {
							alert("Pas assez d'énergie");
						}
						jauge_energie();
				})
				bouton_skill_laser_vertical.bind('KeyDown', function(e) {	
					if(e.key == Crafty.keys['Z']){
						if (energie >= 2) {
							skill = 2;
							energie = energie - 2;
						}
						else {
							alert("Pas assez d'énergie");
						}
						jauge_energie();
					}
				})
	});
	
	/** Scene correspondant à la page de victoire **/
	Crafty.scene("victoire", function(){
		Crafty.background("url('assets/fond/classique/victoire.png')");
		
		if (skin == 2) {
			Crafty.sprite(300, "assets/bouton/cyber/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [2, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		else {
			Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [1, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		
	
		var bouton_menu = Crafty.e("2D, DOM, Mouse, retourmenu")
				.attr({x:bouton_menu_x, y:bouton_menu_y})
				if (skin == 2) {
					bouton_menu.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_menu.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_menu.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						reset_game();
						Crafty.scene("menu");
				})
				bouton_menu.bind('MouseOver', function(e) {
					bouton_menu.removeComponent("retourmenu");
					bouton_menu.addComponent("retourmenuactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_menu.bind('MouseOut', function(e) {
					bouton_menu.removeComponent("retourmenuactive");
					bouton_menu.addComponent("retourmenu");
				})
		
		localStorage.setItem("nb_victoire", nb_victoire); // Stockage du nombre de victoires
		nb_tir_touche_total = parseInt(nb_tir_touche_total) + parseInt(nb_tir_touche);
		localStorage.setItem("nb_tir_touche_total", nb_tir_touche_total);
		nb_tir_total = parseInt(nb_tir_total) + parseInt(nb_tir); // Conserver le nombre de tir total
		localStorage.setItem("nb_tir_total", nb_tir_total);
		pourcentage = (nb_tir_touche/nb_tir)*100;
		pourcentage_total = (nb_tir_touche_total/nb_tir_total)*100;
		pourcentage = Math.round(pourcentage);
		pourcentage_total = Math.round(pourcentage_total);
		
		var textevictoire = Crafty.e("2D, DOM, Text")
			.attr({ x: 0, y:400 , w: 500, h: 100})
			.text( "J'ai tiré " + nb_tir + " fois sur cette partie et tiré "+ nb_tir_total +" en tout. J'ai touché " + nb_tir_touche + " sur cette partie et j'ai touché " + nb_tir_touche_total + " fois en tout.");
		
		var precisionvictoire = Crafty.e("2D, DOM, Text")
			.attr({ x: 200, y:600 , w: 500, h: 100})
			.text( "precision : "+ pourcentage + "% precision totale : " + pourcentage_total + "%");
	
	});
	
	/** Scene correspondant à la page de défaite **/
	Crafty.scene("defaite", function(){
		Crafty.background("url('assets/fond/classique/defaite.png')");
	
		if (skin == 2) {
			Crafty.sprite(300, "assets/bouton/cyber/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [2, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		else {
			Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [1, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		
	
		var bouton_menu = Crafty.e("2D, DOM, Mouse, retourmenu")
				.attr({x:bouton_menu_x, y:bouton_menu_y})
				if (skin == 2) {
					bouton_menu.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_menu.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_menu.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						reset_game();
						Crafty.scene("menu");
				})
				bouton_menu.bind('MouseOver', function(e) {
					bouton_menu.removeComponent("retourmenu");
					bouton_menu.addComponent("retourmenuactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_menu.bind('MouseOut', function(e) {
					bouton_menu.removeComponent("retourmenuactive");
					bouton_menu.addComponent("retourmenu");
				})	
		
		localStorage.setItem("nb_defaite", nb_defaite); // Stockage du nombre de défaites	
		nb_tir_touche_total = parseInt(nb_tir_touche_total) + parseInt(nb_tir_touche);
		localStorage.setItem("nb_tir_touche_total", nb_tir_touche_total);
		nb_tir_total = parseInt(nb_tir_total) + parseInt(nb_tir); // Conserver le nombre de tir total
		localStorage.setItem("nb_tir_total", nb_tir_total);
		pourcentage = (nb_tir_touche/nb_tir)*100;
		pourcentage_total = (nb_tir_touche_total/nb_tir_total)*100;
		pourcentage = Math.round(pourcentage);
		pourcentage_total = Math.round(pourcentage_total);
		
		var textedefaite = Crafty.e("2D, DOM, Text")
			.attr({ x: 0, y:400 , w: 500, h: 100})
			.text( "J'ai tiré " + nb_tir + " fois sur cette partie et tiré "+ nb_tir_total +" en tout. J'ai touché " + nb_tir_touche + " sur cette partie et j'ai touché " + nb_tir_touche_total + " fois en tout.");
		
		var precisiondefaite = Crafty.e("2D, DOM, Text")
			.attr({ x: 200, y:600 , w: 500, h: 100})
			.text( "precision : "+ pourcentage + "% precision totale : " + pourcentage_total + "%");
	
	});
	
	/** Scene correspondant à la page d'instruction **/
	Crafty.scene("instruction", function() {
	
		if (skin == 2) {
			Crafty.sprite(300, "assets/bouton/cyber/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [2, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		else {
			Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [1, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		
	
		var bouton_menu = Crafty.e("2D, DOM, Mouse, retourmenu")
				.attr({x:bouton_menu_x, y:bouton_menu_y})
				if (skin == 2) {
					bouton_menu.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_menu.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_menu.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("menu");
				})
				bouton_menu.bind('MouseOver', function(e) {
					bouton_menu.removeComponent("retourmenu");
					bouton_menu.addComponent("retourmenuactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_menu.bind('MouseOut', function(e) {
					bouton_menu.removeComponent("retourmenuactive");
					bouton_menu.addComponent("retourmenu");
				})	
	});
	
	/** Scene correspondant aux crédits **/
	Crafty.scene("credit", function() {
	
		if (skin == 2) {
			Crafty.sprite(300, "assets/bouton/cyber/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [2, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		else {
			Crafty.sprite(120, "assets/bouton/classique/retourmenu_sprite.png", {
					retourmenu: [0, 0],
					retourmenuactive: [1, 0]
				});
				
			var bouton_menu_x = 416;
			var bouton_menu_y = 380;
		}
		
	
		var bouton_menu = Crafty.e("2D, DOM, Mouse, retourmenu")
				.attr({x:bouton_menu_x, y:bouton_menu_y})
				if (skin == 2) {
					bouton_menu.areaMap([0,0], [300,0], [300,46], [0,46])
				}
				else {
					bouton_menu.areaMap([0,0], [120,0], [120,60], [0,60])
				}
				bouton_menu.bind('MouseUp', function(e) { 
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
						Crafty.scene("menu");
				})
				bouton_menu.bind('MouseOver', function(e) {
					bouton_menu.removeComponent("retourmenu");
					bouton_menu.addComponent("retourmenuactive");
					Crafty.audio.play("bouton",1);
				})
				bouton_menu.bind('MouseOut', function(e) {
					bouton_menu.removeComponent("retourmenuactive");
					bouton_menu.addComponent("retourmenu");
				})
	});
	
	/** Mini-jeu excalibur **/
	Crafty.scene("excalibur", function() {
		Crafty.background("url('assets/fond/classique/grillefond.png')");
		
		var excalibur_x = Crafty.math.randomInt(2, 17) * 34;
		var excalibur_y = Crafty.math.randomInt(2, 17) * 34;
		
		var i = 68;
		var j = 68;
		var tab = 0;
		var pl = new Array();
		
		Crafty.sprite(34, "assets/fond/brouillard.png", {
			brouillard: [0,0],
			vide: [1,0]
		});
		
		var excalibur = Crafty.e("2D, DOM")
				.attr({x:excalibur_x, y:excalibur_y})
			
		do{
			while(j<579){
				pl[tab] = Crafty.e("2D, DOM, Mouse, brouillard")
						.attr({x:i, y:j, w: 34, h: 34 })
						.areaMap([0,0], [34,0], [34,34], [0,34])
						pl[tab].bind('MouseUp', function(e) {
							if( e.mouseButton == Crafty.mouseButtons.LEFT ) {
									lastx = this._x;
									lasty = this._y;
									this.destroy();
										if ((lasty == excalibur_y) || (lastx == excalibur_x)) {
											var touche = Crafty.e("2D, DOM,	touche")
												.attr({x:lastx, y:lasty})
											Crafty.scene("victoire");
										}
										else {
											var rate = Crafty.e("2D, DOM, rate")
												.attr({x:lastx, y:lasty})
												var tir_joueur = ((lastx /34)*16 + (lasty /34))-34;
												tir_ia[tir_joueur] = 1;
										}
							do {
								var randtir = Crafty.math.randomInt(0, 255);
							} while (tir_ia[randtir] == 1)
							nb_tir_ia = nb_tir_ia +1;
							tir_ia[randtir] = 1;
							pl[randtir].destroy();
							lastx = pl[randtir]._x;
							lasty = pl[randtir]._y;
										
								if ((lasty == excalibur_y) || (last == excalibur_x)) {
									var touche = Crafty.e("2D, DOM,	touche")
										.attr({x:lastx, y:lasty})
										Crafty.scene("defaite");
								}
								else {
									var rate = Crafty.e("2D, DOM, rate")
										.attr({x:lastx, y:lasty})
								}
						}
						})
				j=j+34;
				tab++;
				}
			i=i+34;
			j=68;
		}while (i<579)
		
	});
	
	Crafty.scene("preload");
	});