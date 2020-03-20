var switchBoard = new Array(3);

switchBoard = [
  ["x", "o", "x"],
  ["o", "c", "o"],
  ["x", "x", "x"]
];

function clear()
{
  var canvas = $("#canvas");

  var context = canvas.getContext("2d");

  context.clearRect(0, 0, 600, 600);
}

function drawBoard ()
{
  var canvas = $("#canvas");

  if (canvas.getContext)
  {
    alert("This browser does not support CANVAS from HTML5.");
  }
  else
  {
    clear();

    //Retrieves canvas context to draw on
    var context = canvas.getContext("2d");

    //checks if all switches are on
    var allSwitchesOn = false;

    //For every column
    for (var x = 0; x < switchBoard.length; x++)
    {
      //For every row
      for (var y = 0; y< switchBoard[x].length; y++)
      {
        //Start setting up Canvas attributes

        //Sets width of the line and colour of the stroke
        context.lineWidth = 4;
        context.strokeStyle = ""#212121";

        //Sets dimension of the rectangle. Rect(positionX, positionY, width, height)
        context.rect(((x * 200) + 20), ((y * 200) + 20), 200, 200);

        //Draws the rectangle described above
        context.stroke();

        //Checks if the rectangles are activated. If so, draws them activated.
        if (switchBoard[x][y] == "x")
        {
          //Sets up dimension and colour of activated switch.
          context.fillStyle = "#F5F5F5";
          context.strokeStyle = "#BDBDBD";

          //fillRect(positionX, positionY, width, height)
          context.fillRect(((x * 200) + 20), ((y * 200) + 20), 200, 200);

          allSwitchesOn = false;

        }
        else if (switchBoard[x][y] == "c")
        {
          context.fillStyle = "##7C4DFF";

          context.fillRect(((x * 200) + 20), ((y * 200) + 20), 200, 200);
        }
      }
    }

    if (allSwitchesOn)
    {
      userCanClick = false;

      $("h2").text = "You've done did it! Refresh to begin again...";
    }
  }
}

function addEventListenerOnClick ()
{
  $("#canvas").click(function (event)
    {
      //This stores the position of the canvas board.
      var canvasRect = this.getBoundingClientRect();

      //This stores the mouse position relative to the canvas, as the event has absolute values (Page wide)
      var positionX = event.clientX - canvasRect.left;
      console.log("PositionX is: " + positionX + ", which is: " + event.clientX + " - " + canvasRect.left);
      var positionY = event.clientY - canvasRect.top;
      console.log("PositionY is: " + positionY + ", which is: " + event.clientY + " - " + canvasRect.top);

      //Checks which tiles to flip based on the width divided by the amount of desired tiles. In this case, 800 / 3 = 266.66.
      var fieldX = Math.floor(positionX / 200);
      console.log("FieldX is: " + fieldX);
      var fieldY = Math.floor(positionY / 200);
      console.log("FieldY is: " + fieldY);
      console.log(switchBoard[fieldY][fieldX]);

      //Using shortened if statements, checks the click against the board for the assigned values. If X -> O, if O -> X. If C, do nothing.
      //For the switchBoard itself
      if (switchBoard[fieldY][fieldX].localeCompare("c") !== 0)
      {
        console.log("Clicked on: " + switchBoard[fieldY][fieldX]);
        switchBoard[fieldY][fieldX] = switchBoard[fieldY][fieldX] == "x" ? "o" : "x";

        //For the switch above the one clicked.
        if ((fieldY - 1) >= 0)
        {
          if (switchBoard[fieldY - 1][fieldX].localeCompare("c") !== 0)
          {
            console.log("Clicked on: " + switchBoard[fieldY - 1][fieldX] + " And the mouse position is: " + (fieldY - 1));
            switchBoard[fieldY - 1][fieldX] = switchBoard[fieldY - 1][fieldX] == "x" ? "o" : "x";
          }
        }

        //For the switch below the one clicked.
        if ((fieldY + 1) < 3)
        {
          if (switchBoard[fieldY + 1][fieldX].localeCompare("c") !== 0)
          {
            console.log("Clicked on: " + switchBoard[fieldY + 1][fieldX] + " And the mouse position is: " + (fieldY + 1));
            switchBoard[fieldY + 1][fieldX] = switchBoard[fieldY + 1][fieldX] == "x" ? "o" : "x";
          }
        }

        //For the switch to the left of the one clicked.
        if ((fieldX - 1) >= 0)
        {
          if (switchBoard[fieldY][fieldX - 1].localeCompare("c") !== 0)
          {
            console.log("Clicked on: " + switchBoard[fieldY][fieldX - 1] + " And the mouse position is: " + (fieldX - 1));
            switchBoard[fieldY][fieldX - 1] = switchBoard[fieldY][fieldX - 1] == "x" ? "o" : "x";
          }
        }

        //For the switch to the right of the one clicked.
        if ((fieldX + 1) < 3)
        {
          if (switchBoard[fieldY][fieldX + 1].localeCompare("c") !== 0)
          {
            console.log("Clicked on: " + switchBoard[fieldY][fieldX + 1] + " And the mouse position is: " + (fieldX + 1));
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

/////////////Main/////////////

addEventListenerOnClick();


///////TODO:
/////// ADD CHANGETILE FUNCTION TO MINIMIZE IF CALLING IN DOCUMENT
/////// DRAWBOARD function
/////// SCALE PROJECT TO DIFFERENT SIZES
/////// ADD ANIMATIONS WHEN SWITCHES Clicked
/////// ADD TEXT CHANGE WHEN EVENTS HAPPEN
/////// REMOVE DEBUGGERS
