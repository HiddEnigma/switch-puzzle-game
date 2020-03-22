//Boolean variable to control the game logic
var userCanClick = true;

//3x3 Matrix with empty values representing the game board
var switchBoard = [...Array (3)].map(e => Array (3));


function addEventListenerOnClick ()
{
  $("#canvas").click(function (event)
    {
      //Checks if the user can still click. If no, return false.
      if (!userCanClick)
      {
        return false;
      }
      //This stores the position of the canvas board.
      var canvasRect = this.getBoundingClientRect();

      //This stores the mouse position relative to the canvas, as the event has absolute values (Page wide)
      var positionX = event.clientX - canvasRect.left;
      var positionY = event.clientY - canvasRect.top;

      //Checks which tiles to flip based on the width divided by the amount of desired tiles. In this case, 800 / 3 = 266.66.
      var fieldX = Math.floor(positionX / 200);
      var fieldY = Math.floor(positionY / 200);

      //Using shortened if statements, checks the click against the board for the assigned values. If X -> O, if O -> X. If C, do nothing.
      //For the switchBoard itself
      if (switchBoard[fieldY][fieldX].localeCompare("c") !== 0)
      {
        switchBoard[fieldY][fieldX] = switchBoard[fieldY][fieldX] == "x" ? "o" : "x";

        //For the switch above the one clicked.
        if ((fieldY - 1) >= 0)
        {
          if (switchBoard[fieldY - 1][fieldX].localeCompare("c") !== 0)
          {
            switchBoard[fieldY - 1][fieldX] = switchBoard[fieldY - 1][fieldX] == "x" ? "o" : "x";
          }
        }

        //For the switch below the one clicked.
        if ((fieldY + 1) < 3)
        {
          if (switchBoard[fieldY + 1][fieldX].localeCompare("c") !== 0)
          {
            switchBoard[fieldY + 1][fieldX] = switchBoard[fieldY + 1][fieldX] == "x" ? "o" : "x";
          }
        }

        //For the switch to the left of the one clicked.
        if ((fieldX - 1) >= 0)
        {
          if (switchBoard[fieldY][fieldX - 1].localeCompare("c") !== 0)
          {
            switchBoard[fieldY][fieldX - 1] = switchBoard[fieldY][fieldX - 1] == "x" ? "o" : "x";
          }
        }

        //For the switch to the right of the one clicked.
        if ((fieldX + 1) < 3)
        {
          if (switchBoard[fieldY][fieldX + 1].localeCompare("c") !== 0)
          {
            switchBoard[fieldY][fieldX + 1] = switchBoard[fieldY][fieldX + 1] == "x" ? "o" : "x";
          }
        }
      }


      // //extended if version
      // if (switchBoard[fieldX][fieldY] != "c")
      // {
      //   if (switchBoard[fieldX][fieldY] == "x")
      //   {
      //     switchBoard[fieldX][fieldY] = "o";
      //   }
      //   else
      //   {
      //     switchBoard[fieldX][fieldY] = "x";
      //   }
      // }



      //Calls function to draw board again with new values
      drawBoard();
    });
}

function addEventListenerOnKeyboard ()
{
  $(document).keypress(function ()
    {
      if (!userCanClick)
      {
        $("body").fadeOut().fadeIn();
        randomizeBoard();
        $("h2").text("You may have defeated me once, but will it happen again?");
        userCanClick = true;
        drawBoard();
      }
    });
}

function clear()
{
  var canvas = document.getElementById("canvas");

  var context = canvas.getContext("2d");

  context.clearRect(0, 0, 600, 600);
}

function checkIfVictory()
{
  for (var x = 0; x < switchBoard.length; x++)
  {
    for (var y = 0; y < switchBoard[x].length; y++)
    {
      if (switchBoard[x][y] === "o")
      {
        return false;
      }
    }
  }

  return true;
}

function drawBoard ()
{
  var canvas = document.getElementById("canvas");

  if (!canvas.getContext)
  {
    alert("This browser does not support CANVAS from HTML5.");
  }
  else
  {
    clear();

    //Retrieves canvas context to draw on
    var context = canvas.getContext("2d");

    //For every column
    for (var x = 0; x < switchBoard.length; x++)
    {
      //For every row
      for (var y = 0; y < switchBoard[x].length; y++)
      {
        //Start setting up Canvas attributes

        //Sets width of the line and colour of the stroke
        context.lineWidth = 4;
        context.strokeStyle = "#212121";

        //Sets dimension of the rectangle. Rect(positionX, positionY, width, height)
        context.rect((x * 200), (y * 200), 200, 200);

        //Draws the rectangle described above
        context.stroke();

        //Checks if the rectangles are activated. If so, draws them activated.
        if (switchBoard[y][x] == "x")
        {
          //Sets up dimension and colour of activated switch.
          context.fillStyle = "#F9E18E";
          context.strokeStyle = "#BDBDBD";

          //fillRect(positionX, positionY, width, height)
          context.fillRect((x * 200), (y * 200), 200, 200);

        }
        else if (switchBoard[y][x] == "c")
        {
          context.fillStyle = "#A073B5";

          context.fillRect((x * 200), (y * 200), 200, 200);
        }
      }
    }

    if (checkIfVictory())
    {
      userCanClick = false;
      $("body").fadeOut().fadeIn();
      $("h2").text("You've done did it, love! Press any key to restart...");
    }
  }
}

function randomizeBoard ()
{
  for (var x = 0; x < switchBoard.length; x++)
  {
    for (var y = 0; y < switchBoard[x].length; y++)
    {
      if ((x === 1) && (y === 1))
      {
        switchBoard[x][y] = "c";
      }
      else
      {

      var random = Math.round(Math.random());

      switchBoard[x][y] = random == 0 ? "o" : "x";
      }
    }
  }
}


/////////////Main/////////////

addEventListenerOnClick ();
addEventListenerOnKeyboard ();
randomizeBoard ();
drawBoard ();


///////TODO:
/////// SCALE PROJECT TO DIFFERENT SIZES
/////// ADD ANIMATIONS WHEN SWITCHES Clicked
/////// REMOVE DEBUGGERS
