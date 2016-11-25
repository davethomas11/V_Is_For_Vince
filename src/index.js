'use strict';

import Game from './models/game';

let canvas = document.getElementById('gameViewport');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function RenderEngine() {

  this.render = function(context, entities) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i in entities) {
      entities[i].render(context);
    }
  }
}

function Vince() {

  var self = this;
  var x = 100;
  var y = 100;

  this.update = function () {
    self.meander();
  }

  this.meander = function () {
    x += Math.floor(Math.random() * 10) + 1;
    y += Math.floor(Math.random() * 10) + 1;

    x -= 5;
    y -= 5;

    x = Math.min(x, window.innerWidth);
    y = Math.min(y, window.innerHeight);

    x = Math.max(x, 60);
    y = Math.max(y, 60);
  }

  this.render = function(context) {

    context.strokeStyle = "#000";
    context.lineWidth = 4;
    context.fillStyle = '#0F0';

    context.beginPath();
    context.arc(x, y, 50, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
  }
}

function bindCoord(n, max) {
  if (n < 0) {
    return n;
  } else if (n > max) {
    return max;
  } else {
    return n;
  }
}

// Our mediocre game
let game = new Game(context, canvas);
game.add(new Vince());

// This allows us to have a full width game
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Everytime window changes we need to redraw
    game.redraw();
}

// Initial lame ass game loop
function start() {
  game.update();
  sleep(50).then(() => start());
}

start();