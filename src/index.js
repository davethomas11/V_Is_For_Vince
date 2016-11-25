'use strict';

import Game from './models/game';
import Vince from './models/vince';

let canvas = document.getElementById('gameViewport');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Our mediocre game
let game = new Game(context, canvas);
game.add(new Vince(context));

// This allows us to have a full width game
window.addEventListener('resize', resizeCanvas, false);

start();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Everytime window changes we need to redraw
    game.redraw();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initial lame ass game loop
function start() {
  game.update();
  sleep(50).then(() => start());
}