export default class CurbIntro extends Phaser.State {

  create() {
		let curbLogo = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            "curb"
        );

		let music = this.game.add.audio('frolic')
		music.play()

		curbLogo.anchor.setTo(0.5);
		curbLogo.alpha = 0;
		this.game.add.tween(curbLogo).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 2000);

		let gameFunc = function() {
			this.game.state.start("Level1_K");
		}

		this.game.time.events.add(Phaser.Timer.SECOND * 8, gameFunc, this);

		
		

	}
	

}