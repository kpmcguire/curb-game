//require other components
import Player from "../prefabs/Player.js";
import Mouse from "../prefabs/Mouse.js";
import NumberBox from "../prefabs/NumberBox.js";

export default class LevelsCommon extends Phaser.State {
  constructor(name) {
    super()
    this.levelName = name
  }

  
  create() {
    //physics
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
    this.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#a9f0ff";

    // this.physics.startSystem(Phaser.Physics.NINJA);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 800;
    this.physics.arcade.TILE_BIAS = 40;

    //map start

    this.map = this.add.tilemap(this.levelName);

    //parallax background
    // this.map.addTilesetImage('gamebg');
    // this.bg = this.map.createLayer('bg');
    // this.bg.scrollFactorX = .6;
    // this.bg.scrollFactorY = .6;

    //walkable tiles
    this.map.addTilesetImage('kenney', 'kenney');
    this.layer = this.map.createLayer('collision');
    this.map.setCollisionBetween(0,72,true,this.layer);
    this.game.slopes.convertTilemapLayer(this.layer, 'arcadeslopes', 0)
    // added to improve performance - see http://thebotanistgame.com/blog/2015/03/04/tuning-phaserjs-performance.html
    // this.layer.renderSettings.enableScrollDelta = false;

    //collision
    this.layer.resizeWorld();

    // let slopeMap = [1,1,3]

    // console.log(this.map.tilesets[0].tileProperties)

    // this.tiles = this.physics.ninja.convertTilemap(this.map, this.layer, slopeMap)

    // this.game.slopes.convertTilemapLayer(this.layer, 'ninja')

    // //coin layer
    // this.coins = this.add.group();
    // this.coins.physicsBodyType = Phaser.Physics.ARCADE;
    // this.coins.enableBody = true;
    // this.map.createFromObjects("Collectables", 'coin', 'coin', null, true, false, this.coins);
    // this.coins.setAll("body.gravity", 0);

    // //place doors
    // this.doors = this.add.group();
    // this.doors.physicsBodyType = Phaser.Physics.ARCADE;
    // this.doors.enableBody = true;
    // this.map.createFromObjects("Doors", 'door', 'sign', null, true, false, this.doors);
    // this.doors.setAll("body.gravity", 0);

    // this.doors.forEach((door)=>{
    //   console.log(door[0].value)
    // })

    this.bullets = this.add.group();


    //player
    this.map.createFromObjects("Player", 'fox', null, null, true, false, this.world, Player);
    this.player = this.world.getTop();

    this.player.scale.x = 1;
    this.player.scale.y = 1;
    this.player.bullets = this.bullets;


    //place enemies
    // this.enemies = this.add.group();
    // this.map.createFromObjects("Enemies", 'mouse', null, null, true, false, this.enemies, Mouse);
    // this.enemies.setAll("player", this.player);
    // this.enemies.scale.x = 0.75;
    // this.enemies.scale.y = 0.75;

    //UI
    // this.UIGroup = this.add.group();
    // this.scoreField = new NumberBox(this.game, "scoreholder", this.game.score, this.UIGroup);
    // this.scoreField.fixedToCamera = true;

    //sound
    // this.sfx = this.add.audioSprite('sfx');

    this.camera.follow(this.player);


    this.toggleDebug = false
    this.debugGate = 0

	  this.toggleDebugKey = this.game.input.keyboard.addKey(
			Phaser.Keyboard.D
		)

    // var map = this.map

    // for (var ol in map.layers) {
    //     // Loop over each object in the object layer
    //     for (var o in map.layers[ol]) {
    //         var object = map.layers[ol][o];

    //         console.log(object);

    //         // Do something with the object data here; game.add.sprite(object.name)
    //         // for example, or even game.add[object.type](object.name)
    //     }
    // }    


      // this.physics.ninja.enable(this.player)
      // this.physics.ninja.gravity = 2

      this.game.slopes.enable(this.player)





  }

  update() {
	    // for (var i = 0; i < this.tiles.length; i++)
	    // { 
	    //   this.player.body.aabb.collideAABBVsTile(this.tiles[i].tile);
	    // }

    this.physics.arcade.collide(this.player, this.layer);

  	this.physics.arcade.collide(this.enemies, this.layer);
  	this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.arcade.overlap(this.player, this.doors, this.hitDoor, null, this);
    this.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    
    this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);

    if(this.toggleDebugKey.isDown) {
      if (this.game.time.now > this.debugGate) {
        this.toggleDebug = !this.toggleDebug;
        this.debugGate = this.game.time.now + 500
      }
    }
  }

  render() {
    if (this.toggleDebug) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      
      this.game.debug.body(this.player)
      this.game.debug.spriteBounds(this.player, 'rgba(255, 100, 50, 0.2)')

      this.game.debug.physicsGroup(this.bullets)
      // this.game.debug.physicsGroup(this.enemies)
      this.layer.debug = true

    }
  }

  collectCoin(playerRef, coinRef) {
  	coinRef.kill();
  	this.game.score ++;
  	this.scoreField.setValue(this.game.score);
        this.sfx.play("coin");
  }

  hitDoor(playerRef, doorRef) {
    this.game.state.clearCurrentState();
    this.game.state.start(doorRef[0].value);
  }

  hitEnemy(playerRef, enemyRef) {	
  	if(!playerRef.flashEffect.isRunning) {
  		playerRef.flash();
      this.sfx.play("hit");
	  	if(this.game.score > 0) {
	  		this.game.score --;
	  		this.scoreField.setValue(this.game.score);
	  	}
  	}
  }

  damageEnemy(enemy, bullet) {
      enemy.kill();
      bullet.kill();
  }
}