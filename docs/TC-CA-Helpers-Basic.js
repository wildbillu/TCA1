// TC-ClueAnswerHelpers-Basic.js

function CA_ForRowLetter_IsLastLetter(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    if ( iLetter == ( sAnswerPlayer.length - 1) )
        return true;
    return false;
}

function CA_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    var cAnswerPlayer = sAnswerPlayer.charAt(iLetter)
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function CA_ClearPuzzle()
{
    for ( iRow = 0; iRow < g_aAnswers.length; iRow++)
    {
        for ( iLetter = 0; iLetter < g_aAnswers[iRow].length; iLetter++ )
        {
            CA_ForRowLetterClearSquare(iRow, iLetter); 
            CA_SetAnswersPlayer();
        }
    }
    return true;        
}

function CA_ForRowLetterClearSquare(iRow, iC)
{
    var cAnswer = ' ';
    MakeInputNotReadOnly(CA_MakeTag_TD(iRow, iC));
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    sAnswerPlayer = replaceAt(sAnswerPlayer, iC, cAnswer);
    g_aAnswersPlayer[iRow] = sAnswerPlayer;
    var sButton = CA_MakeTag_Id(iRow, iC);
    document.getElementById(sButton).value = cAnswer;
    document.getElementById(sButton).setSelectionRange(0,1);
    CA_ForRowLetter_ReplaceAnswerPlayer(cAnswer, iRow, iC)
    CA_ForRowLetter_UpdateClassForStatusPlayer(g_sCA_CodeMeaning_Normal, iRow, iC);
    CA_ForRowLetter_ReplaceAnswerStatusPlayer(g_sCA_CodeMeaning_Normal, iRow, iC);
    return true;
}
function CA_ShowCheckPuzzle(sToDo)
{
    for ( iRow = 0; iRow < g_aAnswers.length; iRow++)
    {
        for ( iLetter = 0; iLetter < g_aAnswers[iRow].length; iLetter++ )
        {
            CA_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo); 
        }
    }
    return true;        
}

function CA_ForRowLetterShowCheckSquare(iRow, iC, sToDo)
{
    var sAnswer = g_aAnswers[iRow];
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    var cAnswer = sAnswer.charAt(iC);
    var cAnswerPlayer = sAnswerPlayer.charAt(iC);
    var bSet = CharValidEntry(cAnswerPlayer);
    var bCorrect = true;
    var bCorrected = false;
    if ( cAnswer != cAnswerPlayer )
        bCorrect = false;
    if ( sToDo == 'Show')
    {
        if ( !bCorrect )
            bCorrected = true;
        var sButton = CA_MakeTag_Id(iRow, iC)
        document.getElementById(sButton).value = cAnswer;
        document.getElementById(sButton).setSelectionRange(0,1);
        CA_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iC)
    }
// now deal with the status
    if ( bCorrect )
    {
        CA_ForRowLetter_ReplaceAnswerStatusPlayer(g_sCA_CodeMeaning_Correct, iRow, iC)
        CA_ForRowLetter_UpdateClassForStatusPlayer(g_sCA_CodeMeaning_Correct, iRow, iC)
    }
    else
    {
        if ( bCorrected )
        {
            CA_ForRowLetter_ReplaceAnswerStatusPlayer(g_sCA_CodeMeaning_Corrected, iRow, iC)
            CA_ForRowLetter_UpdateClassForStatusPlayer(g_sCA_CodeMeaning_Corrected, iRow, iC)
        }
        else
        {   
            if ( bSet )
            {
                CA_ForRowLetter_ReplaceAnswerStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
                CA_ForRowLetter_UpdateClassForStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
            }
        }
    }
    CA_ForRowLetter_SetToReadonlyIfNecessary(iRow, iC, cAnswer);        
    return true;
}

function CA_ShowCheckSquare(sToDo)
{
    if ( g_sCAidWithFocus == '' )
        return false;
    var iRow    = CA_RowFromId(g_sCAidWithFocus);
    var iC = CA_LetterFromId(g_sCAidWithFocus);
    CA_ForRowLetterShowCheckSquare(iRow, iC, sToDo);    
    return true;
}

function CA_ShowCheckAnswer(sToDo)
{
    if ( g_sCAidWithFocus == '' )
        return false;
    var iRow    = CA_RowFromId(g_sCAidWithFocus);
    var sAnswer = g_aAnswers[iRow];
    var iAnswerLength = sAnswer.length;
    for ( iC = 0; iC < iAnswerLength; iC++ )
    {
        CA_ForRowLetterShowCheckSquare(iRow, iC, sToDo)
    }
    return true;
}

function CA_ForRowLetter_UpdateClassForStatusPlayer(cStatus, iRow, iLetter)
{
    elem = document.getElementById(CA_MakeTag_Id(iRow, iLetter));
    sClassName = elem.className;
    sClassName = CA_SetStatusToClass_FromCode(cStatus, sClassName)
    elem.className = sClassName;
}

function CA_UpdateAllOnKeyDown(cAnswerPlayer, iRow, iLetter)
{
    var cAnswer = CA_ForRowLetter_GetAnswer(iRow, iLetter);
    CA_ForRowLetter_ReplaceAnswerPlayer(cAnswerPlayer, iRow, iLetter);
    CA_SetAnswersPlayer();
    var cStatus = CA_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_sCA_CodeMeaning_Incorrect )
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        cStatus = g_sCA_CodeMeaning_Normal;
        CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter);
        CA_ForRowLetter_UpdateClassForStatusPlayer(cStatus, iRow, iLetter);
        CA_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cAnswerPlayer);
        StoreCookie_Puzzle();
        Status_Check();    
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters && cAnswerPlayer == cAnswer )
    {
        cStatus = g_sCA_CodeMeaning_Correct;
        CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter);
        CA_ForRowLetter_UpdateClassForStatusPlayer(cStatus, iRow, iLetter)
        CA_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cAnswerPlayer);
        StoreCookie_Puzzle();
        Status_Check();    
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    { // if match then we want to set status of entire row
        var sAnswers = g_aAnswers[iRow];
        var sAnswersPlayer = g_aAnswersPlayer[iRow]
        if ( sAnswersPlayer == sAnswers )
        { 
            CA_ForRow_SetClassToStatusCorrect(iRow);
        }
        StoreCookie_Puzzle();
        Status_Check();    
    }
}

function CA_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cForceLetter)
{
    var cStatusFinal = CA_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatusFinal == g_sCA_CodeMeaning_Corrected || cStatusFinal == g_sCA_CodeMeaning_Correct )
    {
        var sIdTD = CA_MakeTag_TD(iRow, iLetter);
        MakeInputReadOnlyForceValueIfNotAlready(sIdTD, cForceLetter);
    }
}        

function CA_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aAnswersPlayer[iRow] = sNew;
    CA_SetAnswersPlayer();
}

function CA_ForRow_SetClassToStatusCorrect(iRow)
{
// called when we know the answer is correct
    var sAnswer = g_aAnswers[iRow];
    var iLength = sAnswer.length;
    for ( var iLetter = 0; iLetter < iLength; iLetter++)
    {
        var cStatus = g_sCA_CodeMeaning_Correct;
        CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter);
        var sId = CA_MakeTag_Id(iRow, iLetter)
        elem = document.getElementById(sId);
        sClassName = elem.className;
        sClassName = CA_SetStatusToClass_FromCode(cStatus, sClassName)
        elem.className = sClassName;
        var sTD = CA_MakeTag_TD(iRow, iLetter);
        var cThis = sAnswer.charAt(iLetter)
        MakeInputReadOnlyForceValueIfNotAlready(sTD, cThis);
    }
}

function CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter)
{
    var sRow = g_aAnswersStatusPlayer[iRow];
    var sNewRow = replaceAt(sRow, iLetter, cStatus);
    g_aAnswersStatusPlayer[iRow] = sNewRow;
    CA_SetStatusPlayer();
}

function CA_ForRowLetter_ReplaceAnswerPlayer(cNew, iRow, iLetter)
{
    var sRow = g_aAnswersPlayer[iRow];
    var sNewRow = replaceAt(sRow, iLetter, cNew);
    g_aAnswersPlayer[iRow] = sNewRow;
    CA_SetAnswersPlayer();
}

function CA_SetAnswersPlayer()
{
    g_sAnswersPlayer = g_aAnswersPlayer.join('|');
}

function CA_SetStatusPlayer()
{
    g_sAnswersStatusPlayer = g_aAnswersStatusPlayer.join('|');
}

function CA_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_aAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CA_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_aAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CA_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    var sRow = g_aAnswersStatusPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CA_MakeTag_TD(iRow, iLetter)
{
    var s = 'TD_CA_' + iRow + '_A_' + iLetter;
    return s;
}

function CA_MakeTag_Id(iRow, iLetter)
{
    var s = 'CA_' + iRow + '_A_' + iLetter;
    return s;
}

function CA_LetterFromId(sid)
{
    return parseInt(sid.charAt(7));
}

function CA_RowFromId(sid)
{
    return parseInt(sid.charAt(3));
}

function CA_ForRow_GetLength(iRow)
{
    return g_aAnswers[iRow].length;
}