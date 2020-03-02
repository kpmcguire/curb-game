var game;

// var phaserjs = require('./scripts/phaser.min.js')

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import LevelsCommon from "./states/LevelsCommon";
import GameOver from "./states/GameOver.js";
import CurbIntro from "./states/CurbIntro.js";


window.onload = function () {
  // changed to canvas to improve performance - see http://thebotanistgame.com/blog/2015/03/04/tuning-phaserjs-performance.html
  game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game');
  // game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('game', Game);
  game.state.add("Level1_K", new LevelsCommon("level1_k"));
  game.state.add("Level2_K", new LevelsCommon("level2_k"));

  game.state.add("Level1", new LevelsCommon("level1"));
  game.state.add("Level2", new LevelsCommon("level2"));
  game.state.add("CurbIntro", CurbIntro);
  game.state.add("GameOver", GameOver);
  game.state.start('boot');
};