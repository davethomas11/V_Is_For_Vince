'use strict';

let canvas = document.getElementById('gameViewport');
let context = canvas.getContext('2d');

context.strokeStyle = '#F00';

console.log('going to stroke');

context.beginPath();
context.arc(100, 100, 50, 0, 2 * Math.PI);
context.stroke();