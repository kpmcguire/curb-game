export default class Player extends Phaser.Sprite {

	constructor(game, x, y, bullets) { 
		super(game, x, y, 'player');

		//game object level variables
		this.speed = 400;
		this.airSpeed = 300;
		this.jumpPower = 700;
		this.inAir = true;
		this.hitGround = false;
		this.game = game
		this.doubleJump = false
	

		//animations
		this.animations.add("idle", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1]);
		this.animations.add("jump", [6]);
		this.landAnimation = this.animations.add("land", [6, 0]);
		this.animations.add("run", [2,3,4,5,4,3]);
		this.animations.add("fire", [8])
		this.animations.add("fireAir", [7])
		this.animations.add("fireRun", [9,10,11,12,11,10])



		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.body.drag = { x: 600, y: 0 };

		this.body.setSize(150, 475, 100, -10);

		this.body.tilePadding.x = 0;
		this.body.tilePadding.y = 0;

		this.anchor.set(.5, 1);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// this.jumpButton.onDown.add(this.jump, this);

		this.bulletGate = 0;
		this.bullets = bullets;
		this.shotInterval = 500;
		this.fireposition = { x: 50, y: -180 };


	  this.fireButton = this.game.input.keyboard.addKey(
			Phaser.Keyboard.Z
		);

		this.animations.play("idle", 1, true);

		this.flashEffect = this.game.add.tween(this)
									.to( { alpha: 0 }, 50, Phaser.Easing.Bounce.Out)
									.to( { alpha: .8 }, 50, Phaser.Easing.Bounce.Out)
									.to( { alpha: 1 }, 150, Phaser.Easing.Circular.Out);




		this.game.input.gamepad.start();

		// To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
		this.pad1 = this.game.input.gamepad.pad1;
	}		

	animationState() {
		if (this.body.touching.down) {
			if((this.fireButton.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_A)) && (this.body.velocity.x > 14 || this.body.velocity.x < -14)) {
				this.animations.play("fireRun", 8, true);
			} else if ((this.fireButton.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_A)) && this.body.velocity.x == 0){
				this.animations.play("fire", 1);
			} else if (this.body.velocity.x > 14 || this.body.velocity.x < -14) {
				this.animations.play("run", 8, true);
			} else {
				this.animations.play("idle", 10, true);
			}	
		} else {
				if ((this.fireButton.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_A)) && !this.body.touching.down){
					this.animations.play("fireAir", 1);
				} else {
					this.animations.play("jump", 1);
				}
		}
		// if(this.hitGround) {
		// 	this.animations.play("land", 15);
		// } else if(!this.inAir && !this.landAnimation.isPlaying) {
		// 	if(Math.abs(this.body.velocity.x) > 4) {
		// 		this.animations.play("run", 2, true);
		// 	} else if( this.body.onFloor() ) {
		// 		this.animations.play("idle", 20, true);
		// 	}
		// }
	}

	update() {
		this.hitGround = false;
		var wasAir = this.inAir;
		this.inAir = !this.body.onFloor();

		if(this.inAir != wasAir && this.body.velocity > 0) {
			this.hitGround = true;
		}

		this.animationState();

		this.speedToUse = this.inAir ? this.airSpeed : this.speed;

		if ( this.cursors.left.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)
        ) {
            this.scale.x = this.game.scaleFactor * -1;
						this.body.velocity.x = -this.speedToUse;
						// this.body.moveLeft(this.speedToUse)
        }

		if(this.cursors.right.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
			this.scale.x = this.game.scaleFactor;
			this.body.velocity.x = this.speedToUse;
			// this.body.moveRight(this.speedToUse)
		}

		if(this.fireButton.isDown || this.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
			this.fire();
		}

		if(this.pad1.isDown(Phaser.Gamepad.XBOX360_B)) {
			this.jump();
			// this.body.moveUp(this.speedToUse)
		}

		this.jumpButton.onDown.add(this.jump, this);

	}

	jump() {
		if(this.body.touching.down == true) {
			this.body.velocity.y = -this.jumpPower;
			this.doubleJump = true;
		} else if(this.doubleJump == true) {
			this.doubleJump = false;
			this.body.velocity.y = -this.jumpPower;
		}
	}

	flash() {
		if(!this.flashEffect.isRunning) {
			this.flashEffect.start();
		}
	}

	fire() {
		if(this.game.time.now > this.bulletGate) {



			var bullet = this.bullets.getFirstDead();
			if(bullet) {
				bullet.x = this.x + this.fireposition.x;
				bullet.y = this.y + this.fireposition.y;
				bullet.revive();
			} else {
				bullet = this.bullets.create(this.x + this.fireposition.x, this.y+this.fireposition.y, "bullet");
				this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
				bullet.outOfBoundsKill = true;
				bullet.checkWorldBounds = true;
				bullet.body.allowGravity = false

			}
			bullet.body.velocity.x = this.scale.x * 2668;
			this.bulletGate = this.game.time.now + this.shotInterval;
			
		}
	}	

}