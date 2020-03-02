const loading_bg = require('../../assets/images/loading_bg.png')
const larry = require('../../assets/images/larry-sprite.png')
const mouse = require("../../assets/images/sprites/MouseSprite.png")
const gamebg = require("../../assets/images/Background.png")
const kenney = require("../../assets/images/spritesheet_ground_extruded.png")
const coin = require("../../assets/images/coin.png")
const sign = require("../../assets/images/sign.png")
const frolic = require("../../assets/sounds/frolic.mp3")
const curb = require("../../assets/images/curb.png")

const level1_k = require('../../assets/levels/level1_k.json')
const level2_k = require("../../assets/levels/level2_k.json")

export default class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.load.image("loading_bg", loading_bg)  
  }

  create() {

    let loading_bg = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY-100,
      "loading_bg"
    );

    loading_bg.anchor.setTo(0.5);

    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //do all your loading here
    this.load.spritesheet('player', larry, 150, 230);
    this.load.spritesheet('mouse', mouse, 165, 160);
    this.load.image('gamebg', gamebg);
    this.load.tilemap('level1_k', level1_k, null, Phaser.Tilemap.TILED_JSON);

    this.load.tilemap('level2_k', level2_k, null, Phaser.Tilemap.TILED_JSON);

    // this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('Tiles', 'assets/images/Tiles.png');
    // this.load.image('kenney', 'assets/images/spritesheet_ground_extruded.png');
    this.load.spritesheet('kenney', kenney, 128, 128);


    this.load.image('bullet', coin);
    // this.load.image('scoreholder', 'assets/images/scoreholder.png');
    this.load.image('sign', sign);
    // this.load.image('gameover_bg', 'assets/images/gameover_bg.png');
    // this.load.audiosprite('sfx', [ 'assets/sounds/sfx.mp3', 'assets/sounds/sfx.ogg' ], "assets/sounds/sfx.json")
    // this.load.image('bullet', 'assets/images/bullet.png');

    this.load.audio('frolic', frolic)
    this.load.image('curb', curb)

    //staaaart load
    this.load.start();
  }

  update() {

    if(this.ready) {
      this.game.state.start('game');
    }

  }

  onLoadComplete() {
    this.ready = true;
  }

}