// TC-GridHelpers-Basic.js
//

function GR_ClearPuzzle()
{
    alert('clear')
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iC = 0; iC < g_iGridWidth; iC++ )
        {
            GR_ForRowLetterClearSquare(iRow, iC);
        }
    }
    alert('clear.done')
    return true;
}

function GR_ForRowLetterClearSquare(iRow, iC)
{
    var cAnswer = ' '
    if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iC) )
    {
        MakeInputNotReadOnly(GR_MakeTag_TD(iRow, iC));
        g_sGridAnswersPlayer = replaceAt(g_sGridAnswersPlayer, iRow*g_iGridWidth+iC, cAnswer) ;
        var sButton = GR_MakeTag_Id(iRow, iC)
        document.getElementById(sButton).value = cAnswer;
        document.getElementById(sButton).setSelectionRange(0,1);
        GR_UpdateAnswersPlayer(cAnswer, iRow, iC);
        GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC);
        GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC);
    }
}

function GR_ShowCheckPuzzle(sToDo)
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iC = 0; iC < g_iGridWidth; iC++ )
        {
            GR_ForRowLetterShowCheckSquare(iRow, iC, sToDo);
        }
    }
    return true;
}


function GR_ShowCheckAnswer(sToDo)
{
    if ( g_GR_sFocus == '' )
        return false;
        if ( g_GR_bAcross )
        {
            var iRow    = GR_RowFromId(g_GR_sFocus);
            for ( var iC = 0; iC < g_iGridWidth; iC++ )
            {
                GR_ForRowLetterShowCheckSquare(iRow, iC, sToDo);
            }
        }
        else 
        {
            var iC    = GR_LetterFromId(g_GR_sFocus);
            for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
            {
                GR_ForRowLetterShowCheckSquare(iRow, iC, sToDo);
            }
        }
        return true;
}

function GR_ForRowLetterShowCheckSquare(iRow, iC, sToDo)
{
    if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iC) )
    {
        var cAnswer         = g_sGridAnswers.charAt(iRow*g_iGridWidth+iC);
        var cAnswerPlayer   = g_sGridAnswersPlayer. charAt(iRow*g_iGridWidth+iC);
        var bCorrect = true;
        if ( cAnswer != cAnswerPlayer )
            bCorrect = false;
        if ( sToDo == 'Show')
        {
            if ( cAnswerPlayer == '' || cAnswerPlayer == ' ' || cAnswerPlayer == '-' )
                bCorrect = true;                
            // now correct the value in the 'button' and in the player answer
            var sButton = GR_MakeTag_Id(iRow, iC)
            document.getElementById(sButton).value = cAnswer;
            document.getElementById(sButton).setSelectionRange(0,1);
            GR_UpdateAnswersPlayer(cAnswer, iRow, iC);
        }                    
        // now deal with the status
        if ( bCorrect )    
        {
            GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Correct, iRow, iC)
            GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Correct, iRow, iC)
        }
        else
        {
            if ( sToDo == 'Show')
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Corrected, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Corrected, iRow, iC)
            }
            else
            {
                if ( cAnswerPlayer != '' && cAnswerPlayer != ' ' && cAnswerPlayer != '-' )
                {
                    GR_ForRowLetter_UpdateStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
                    GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Incorrect, iRow, iC)
                }
            }
        }
    }
    GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iC, cAnswer);
}

function GR_ShowCheckSquare(sToDo)
{
    if ( g_GR_sFocus == '' )
        return false;
    var iRow    = GR_RowFromId(g_GR_sFocus);
    var iC    = GR_LetterFromId(g_GR_sFocus);
    GR_ForRowLetterShowCheckSquare(iRow, iC, sToDo);
    return true;
}

function GR_ForLetterSetAnswerTo(iLetter, sForceAnswer)
{
// first we set the grid answer player then all else should happen
// we assume we cannot get here unless the right length
    var iForce = 0;
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            var cForceCharacter = sForceAnswer.charAt(iForce);
            if ( cForceCharacter != '' && cForceCharacter !=' ' && cForceCharacter != g_sCharMeaningNotSet )
            {
                sGridAnswerRow = g_aGridAnswersPlayer[iRow];
                sGridAnswerRow = replaceAt(sGridAnswerRow, iLetter, cForceCharacter )
                g_aGridAnswersPlayer[iRow] = sGridAnswerRow;
            }
            iForce++;
        }
    }
    GR_SetAnswersPlayer();
    for ( iRR = 0; iRR < g_iGridHeight; iRR++ )
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRR, iLetter) )
        {
            GR_ForRowLetterNotABlackSquare_SetGridAnswer(iRR, iLetter);
        }
    }
    return true;
}

function GR_ForRowSetAnswerTo(iRow, sForceAnswer)
{
    // first we set the grid answer player then all else should happen
    // we assume we cannot get here unless the right length
    var sGridAnswerRow = g_aGridAnswersPlayer[iRow];
    var iForce = 0;
    for ( iCC = 0; iCC < g_iGridWidth; iCC++ )
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iCC) )
        {
            var cForceCharacter = sForceAnswer.charAt(iForce);
            if ( cForceCharacter != '' && cForceCharacter !=' ' && cForceCharacter != g_sCharMeaningNotSet )
            {
                sGridAnswerRow = replaceAt(sGridAnswerRow, iCC, cForceCharacter )
            }
            iForce++;
        }
    }
    g_aGridAnswersPlayer[iRow] = sGridAnswerRow;
    GR_SetAnswersPlayer();
    for ( iC = 0; iC < g_iGridWidth; iC++ )
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iC) )
        {
            GR_ForRowLetterNotABlackSquare_SetGridAnswer(iRow, iC)
        }
    }
    return true;
}

function GR_ForRowLetterNotABlackSquare_SetGridAnswer(iRow, iC)
{
    var cAnswer         = g_sGridAnswers.charAt(iRow*g_iGridWidth+iC);
    var cAnswerPlayer   = g_sGridAnswersPlayer. charAt(iRow*g_iGridWidth+iC);
    var sButton = GR_MakeTag_Id(iRow, iC)
    if ( cAnswerPlayer != '' && cAnswerPlayer != ' ' && cAnswerPlayer != '-' )
    {
        document.getElementById(sButton).value = cAnswerPlayer;
        document.getElementById(sButton).setSelectionRange(0,1);
    }
    GR_UpdateAnswersPlayer(cAnswer, iRow, iC);
    // now deal with the status
    // if we are checking things we check them
    // if not we just set the status to normal
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        var cAnswer = g_sGridAnswers.charAt(iRow*g_iGridWidth+iC);
        var bCorrect = true;
        if ( cAnswer != cAnswerPlayer )
            bCorrect = false;
        if ( bCorrect )
        {
            GR_ForRowLetter_UpdateStatusPlayer(g_sCA_CodeMeaning_Correct, iRow, iC)
            GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Correct, iRow, iC)
        }
        else
        {
            if ( cAnswerPlayer != '' && cAnswerPlayer != ' ' && cAnswerPlayer != '-' )
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Incorrect, iRow, iC)
            }
            else
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
            }
        }
    }
    else
    {
        GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
        GR_ForRowLetter_ForStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
    }
    GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iC, cAnswer);
}

function GR_ForRowLetter_ForStatusPlayer(cStatus, iRow, iLetter)
{
    elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
    sClassName = elem.className;
    sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
    elem.className = sClassName;
// now we set the backgroundImage correctly
    if ( cStatus == g_sCharMeaningNotSet )
        return;
    var cNumbering = g_sGridNumbering.charAt(iRow*g_iGridWidth+iLetter);
    if ( cNumbering == '.')
        return;
    var sStatusImage = g_sGR_Status_Normal_Image;
    if ( cStatus == g_sGR_CodeMeaning_Incorrect )
        sStatusImage = g_sGR_Status_Incorrect_Image;
    else if ( cStatus == g_sGR_CodeMeaning_Corrected )
        sStatusImage = g_sGR_Status_Corrected_Image;
    else if ( cStatus == g_sGR_CodeMeaning_Correct )
        sStatusImage = g_sGR_Status_Correct_Image;
// now combine this with the grid number
    var iNumber = parseInt(cNumbering) + 1;
    var sNumber = iNumber.toString();
    if ( sNumber.length == 1 )
        sNumber = '0' + sNumber;
    sStatusImage += ', url("images/No-' + sNumber + '.png")';
    elem.style.backgroundImage = sStatusImage;
}

function GR_isThisSquareABlackSquare(sId)
{
    var sClassName = document.getElementById(sId).className;
    if ( sClassName != g_sGR_Class_BlackSquare )
        return false;
    return true;
}

function GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    return GR_isThisSquareABlackSquare(GR_MakeTag_Id(iRow, iLetter))
}
function GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cForceLetter)
{
    var cStatusFinal = GR_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatusFinal == g_sGR_CodeMeaning_Corrected || cStatusFinal == g_sGR_CodeMeaning_Correct )
    {
        var sIdTD = GR_MakeTag_TD(iRow, iLetter);
        MakeInputReadOnlyForceValue(sIdTD, cForceLetter);
    }
}        

function GR_ForRowLetter_SetStatusPlayer_AndSetClassOfCurrent(cAnswerPlayer, iRow, iLetter)
{
    GR_ForRowLetter_UpdateAnswersPlayer(cAnswerPlayer, iRow, iLetter);
    var cStatus = GR_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_sCA_CodeMeaning_Incorrect )
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        cStatus = g_sGR_CodeMeaning_Normal;
        GR_ForRowLetter_UpdateStatusPlayer(cStatus, iRow, iLetter);
        GR_ForRowLetter_ForStatusPlayer(cStatus, iRow, iLetter);
    }
    var cAnswer = GR_ForRowLetter_GetAnswer(iRow, iLetter);
    if ( cAnswerPlayer == cAnswer )
        cStatus = g_sGR_CodeMeaning_Correct;
    GR_ForRowLetter_UpdateStatusPlayer(cStatus, iRow, iLetter);
//var sRow = g_aGridStatusPlayer[iRow];
//var sNewRow = replaceAt(sRow, iLetter, cStatus);
//g_aGridStatusPlayer[iRow] = sNewRow;
//GR_SetStatusPlayer();

    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GR_ForRowLetter_ForStatusPlayer(cStatus, iRow, iLetter);
//        elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
//        sClassName = elem.className;
//        sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
//        elem.className = sClassName;
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        if ( g_GR_bAcross )
        {
            var sAnswers = g_aGridAnswers[iRow];
            var sAnswersPlayer = g_aGridAnswersPlayer[iRow];
            if ( sAnswersPlayer == sAnswers )
            {
                GR_ForRow_SetClassToStatusCorrect(iRow);
            }
        }
        else
        {
// need to get the answers for a column
            var bMatch = true;
            for ( var iR = 0; iR < g_iGridHeight; iR++ )
            {
                if ( ! GR_isThisSquareABlackSquare(GR_MakeTag_Id(iR, iLetter)) )
                {
                    sA = GR_ForRowLetter_GetAnswer(iR, iLetter);
                    sAP= GR_ForRowLetter_GetAnswerPlayer(iR, iLetter);
                    if ( sA != sAP )
                        bMatch = false;
                }
            }
            if ( bMatch )
            {
                GR_ForLetter_SetClassToStatusCorrect(iLetter);
            }
        }
    }
    GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cAnswerPlayer)
    Status_Check();
    StoreCookie_Puzzle()
}

function GR_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aGridAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aGridAnswersPlayer[iRow] = sNew;
    GR_SetAnswersPlayer();
}


function GR_ForRowLetter_UpdateStatusPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerStatus = g_aGridStatusPlayer[iRow];
    var sNew = replaceAt(sPlayerStatus, iLetter, cAnswer);
    g_aGridStatusPlayer[iRow] = sNew;
    GR_SetStatusPlayer();
}

function GR_ForRow_SetClassToStatusCorrect(iRow)
{
    for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++)
    {
// need to ignore black squares
if ( ! GR_isThisSquareABlackSquare(GR_MakeTag_Id(iRow, iLetter)) )
{
    var cStatus = g_sCA_CodeMeaning_Correct;
    GR_ForRowLetter_UpdateStatusPlayer(cStatus, iRow, iLetter);
    elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
    sClassName = elem.className;
    sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
    elem.className = sClassName;
}
    }
}

function GR_ForLetter_SetClassToStatusCorrect(iLetter)
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        if ( ! GR_isThisSquareABlackSquare(GR_MakeTag_Id(iRow, iLetter)) )
        {
            var cStatus = g_sCA_CodeMeaning_Correct;
            CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter);
            elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
            sClassName = elem.className;
            sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
            elem.className = sClassName;
        }
    }
}


function GR_SetAnswersPlayer()
{
    g_sGridAnswersPlayer = g_aGridAnswersPlayer.join('');
}

function GR_SetStatusPlayer()
{
    g_sGridStatusPlayer = g_aGridStatusPlayer.join('');
}

function GR_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_aGridAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function GR_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_aGridAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function GR_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    var sRow = g_aGridStatusPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function GR_MakeTag_HTMLId(iRow, iLetter)
{
    var s = 'Id=GR_' + iRow + '_A_' + iLetter;
    return s;
}

function GR_MakeTag_Id(iRow, iLetter)
{
    var s = 'GR_' + iRow + '_A_' + iLetter;
    return s;
}

function GR_MakeTag_TD(iRow, iLetter)
{
    var s = 'TD_GR_' + iRow + '_A_' + iLetter;
    return s;
}

function GR_LetterFromId(sid)
{
    return parseInt(sid.charAt(7));
}

function GR_RowFromId(sid)
{
    return parseInt(sid.charAt(3));
}

