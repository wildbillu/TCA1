// TC-Status-Process.js

function Status_Check()
{ // called everytime character is done, show answer(CA or GR), solve(CA, GR, All)
// CA
    var iCA_Correct = 0;
    var iCARows = g_aAnswers.length
    for ( var iRow = 0; iRow < iCARows; iRow++)  
    {
        if ( g_aAnswers[iRow] == g_aAnswersPlayer[iRow])
            iCA_Correct++
    }
    var sCA = 'Clues: ' + iCA_Correct + ' of ' + iCARows;
    document.getElementById("Status_CA").innerHTML = sCA;
// GR
    var iGR_Correct = 0;
    var iGRRows = g_iGridWidth;
    for ( var iGRRow = 0; iGRRow < iGRRows; iGRRow++ )
    {
        if ( g_aGridAnswersPlayer[iGRRow] == g_aGridAnswers[iGRRow] )
            iGR_Correct++;
    }
    var iGRLetters = g_iGridHeight
// down grid answers - dont need to check for black squares cause player answer will have the .
    for (var iGRLetter = 0; iGRLetter < iGRLetters; iGRLetter++ )
    {
        var bLetterCorrect = true;
        for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
        {
            if ( GR_ForRowLetter_GetAnswer(iRow, iGRLetter) != GR_ForRowLetter_GetAnswerPlayer(iRow, iGRLetter) )
                bLetterCorrect = false;
        }
        if ( bLetterCorrect )
            iGR_Correct++
    }
    var iTot = g_iGridWidth+g_iGridHeight;
    var sGR = 'Grid: ' + iGR_Correct + ' of ' + iTot;
    document.getElementById("Status_GR").innerHTML = sGR;
}
