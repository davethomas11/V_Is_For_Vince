'use strict';

import VinceGame from './game/v-is-for-vince'

let canvas = document.getElementById('gameViewport');
let context = canvas.getContext('2d');

// Our mediocre game
let game = new VinceGame(canvas);
game.start();