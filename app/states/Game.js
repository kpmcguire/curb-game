export default class Game extends Phaser.State {

  create() {
    this.game.score = 0;
    this.game.state.start("CurbIntro");
    // this.game.state.start("Level1_K");
    // this.game.state.start("Level2_K");

  }

}