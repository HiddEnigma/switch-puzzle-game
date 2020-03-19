var switchBoard =
[
  "x", "o", "x",
  "o", "c", "o",
  "x", "x", "x"
];

function drawBoard ()
{

}

function addEventListenerOnClick ()
{
  $("#canvas").click(function (event)
    {
      //This stores the position of the canvas board.
      var canvasPosition = $("#canvas").position();

      //This stores the mouse position relative to the canvas, as the event has absolute values (Page wide)
      var positionX = event.pageX - canvasPosition.left;
      var positionY = event.pageY - canvasPosition.top;

      //Checks which tiles to flip based on the width divided by the amount of desired tiles. In this case, 800 / 3 = 266.66.
      var fieldX = Math.floor(positionY / 266.66);
      var fieldY = Math.floor(positionX / 266.66);

      //Using shortened if statements, checks the click against the board for the assigned values. If X -> O, if O -> X. If C, do nothing.
      //For the switchBoard itself
      switchBoard[fieldX][fieldY] = switchBoard[fieldX][fieldY] != "c" ? == "x" ? "o" : "x";

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

      //For the switch above the one clicked.
      if ((fieldY - 1) >= 0)
      {
        switchBoard[fieldX][fieldY - 1] = switchBoard[fieldX][fieldY - 1] != "c" ? == "x" ? "o" : "x";
      }

      //For the switch below the one clicked.
      if ((fieldY + 1) < 3)
      {
        switchBoard[fieldX][fieldY + 1] = switchBoard[fieldX][fieldY + 1] != "c" ? == "x" ? "o" : "x";
      }

      //For the switch to the left of the one clicked.
      if ((fieldX - 1) >= 0)
      {
        switchBoard[fieldX - 1][fieldY] = switchBoard[fieldX - 1][fieldY] != "c" ? == "x" ? "o" : "x";
      }

      //For the switch to the right of the one clicked.
      if (fieldX + 1) < 3)
      {
        switchBoard[fieldX + 1][fieldY] = switchBoard[fieldX + 1][fieldY] != "c" ? == "x" ? "o" : "x";
      }
    });
}
