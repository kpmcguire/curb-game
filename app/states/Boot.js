const loading_bar = require('../../assets/images/loading_bar.png')

export default class Boot {

  preload() {
    this.load.image("preloader", loading_bar);
  }

  create() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }

}