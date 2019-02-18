var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 8;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var snake2 = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

var count = 0;
var apple = {
  x: 320,
  y: 320
};

var grape = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// game loop
var pause = true;
var requestId;
function loop(pause) 
{
  requestId = requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 - 60/15 = 4
  if (++count < 4) 
  {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  
  snake2.x += snake2.dx;
  snake2.y += snake2.dy;
  
  // wrap snake position on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  
  // wrap snake2 position on edge of screen
  if (snake2.x < 0) {
    snake2.x = canvas.width - grid;
  }
  else if (snake2.x >= canvas.width) {
    snake2.x = 0;
  }
  if (snake2.y < 0) {
    snake2.y = canvas.height - grid;
  }
  else if (snake2.y >= canvas.height) {
    snake2.y = 0;
  }
  
   // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});
  
  
  // keep track of where snake has been. front of the array is always the head
  snake2.cells.unshift({x: snake2.x, y: snake2.y});
  
  
  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  
  
   // remove cells as we move away from them
  if (snake2.cells.length > snake2.maxCells) {
    snake2.cells.pop();
  }
  // draw apple
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
  
   // draw grape
  context.fillStyle = 'purple';
  context.fillRect(grape.x, grape.y, grid-1, grid-1);
  
  // draw snake
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
	  s.innerHTML = snake.maxCells;
    }
    // snake ate grape
    if (cell.x === grape.x && cell.y === grape.y) {
      snake.maxCells++;
      grape.x = getRandomInt(0, 25) * grid;
      grape.y = getRandomInt(0, 25) * grid;
      s.innerHTML = snake.maxCells;
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      // collision. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        grape.x = getRandomInt(0, 25) * grid;
        grape.y = getRandomInt(0, 25) * grid;
		s.innerHTML =  snake.maxCells;
      }
    }
  });
   // draw snake 2 
  context.fillStyle = 'yellow';
  snake2.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    // snake2 ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      snake2.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
	  x.innerHTML = snake2.maxCells;
    }
       // snake ate grape
    if (cell.x === grape.x && cell.y === grape.y) {
      snake2.maxCells++;
      grape.x = getRandomInt(0, 25) * grid;
      grape.y = getRandomInt(0, 25) * grid;
      x.innerHTML = snake2.maxCells;
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake2.cells.length; i++) {
      
      // collision. reset game
      if (cell.x === snake2.cells[i].x && cell.y === snake2.cells[i].y) {
        snake2.x = 160;
        snake2.y = 160;
        snake2.cells = [];
        snake2.maxCells = 4;
        snake2.dx = grid;
        snake2.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        grape.x = getRandomInt(0, 25) * grid;
        grape.y = getRandomInt(0, 25) * grid;
  	    x.innerHTML =  snake2.maxCells;
      }
    }
  });
}
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
document.addEventListener('keydown', function(b) {
  // prevent snake from backtracking on itself
  if (b.which === 65 && snake2.dx === 0) {
    snake2.dx = -grid;
    snake2.dy = 0;
  }
  else if (b.which === 87 && snake2.dy === 0) {
    snake2.dy = -grid;
    snake2.dx = 0;
  }
  else if (b.which === 68 && snake2.dx === 0) {
    snake2.dx = grid;
    snake2.dy = 0;
  }
  else if (b.which === 83 && snake2.dy === 0) {
    snake2.dy = grid;
    snake2.dx = 0;
  }
});



requestAnimationFrame(loop);
document.addEventListener('keydown', function(e) {
console.log("listener");
  // space bar makes snake pause
  if (e.which === 32) 
  {
    if (pause){
	console.log("Pause");
    cancelAnimationFrame(requestId);
	pause = false;
	document.getElementById("s").innerHTML = "Paused";
	document.getElementById("x").innerHTML = "Paused";
	} else {
	console.log("Resume");
	requestAnimationFrame(loop);
	pause = true;
	document.getElementById("s").innerHTML = snake.maxCells;
	document.getElementById("x").innerHTML = snake2.maxCells;

	}
  }});