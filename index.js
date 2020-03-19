var switchBoard = new Array(3);

switchBoard = [
  ["x", "o", "x"],
  ["o", "c", "o"],
  ["x", "x", "x"]
];

function drawBoard ()
{

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
      //drawBoard();
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
