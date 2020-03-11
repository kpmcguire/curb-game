export default class Game extends Phaser.State {

  create() {
    this.game.score = 0;

    if (IS_DEV) {
      this.game.state.start("Level1_K");  
    } else {
      this.game.state.start("CurbIntro");
    }
    // this.game.state.start("CurbIntro");
    // this.game.state.start("Level1_K");
    // this.game.state.start("Level2_K");

  }

}