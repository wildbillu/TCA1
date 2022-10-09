// TC-GridHelpers-Basic.js
//

function GR_ForRowLetter_Across_IsLastLetter(iRow, iLetter)
{ // cannot use the 'answers' because they don't have the . and we count location
    if ( iLetter == g_iGridWidth - 1 )
        return true;
    for ( iL = iLetter+1; iL < g_iGridWidth; iL++ )        
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iL) )
            return false;    
    }
    return true;
}

function GR_ForRowLetter_Down_IsLastLetter(iRow, iLetter)
{
    if ( iRow == g_iGridHeight - 1 )
        return true;
    for ( iR = iRow+1; iR < g_iGridHeight; iR++ )        
    {
        if ( !GR_ForRowAndLetter_isThisSquareABlackSquare(iR, iLetter) )
            return false;    
    }
    return true;
}

function GR_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var cAnswerPlayer = g_sGridAnswersPlayer.charAt(iRow*(g_iGridWidth)+iLetter);
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(cStatus, iRow, iLetter)
{
    elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
    sClassName = elem.className;
    sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
    elem.className = sClassName;
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

function GR_ForRowLetter_UpdateStatusPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerStatus = g_aGridStatusPlayer[iRow];
    var sNew = replaceAt(sPlayerStatus, iLetter, cAnswer);
    g_aGridStatusPlayer[iRow] = sNew;
    GR_SetStatusPlayer();
}

function GR_ClearPuzzle()
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( var iC = 0; iC < g_iGridWidth; iC++ )
        {
            GR_ForRowLetterClearSquare(iRow, iC);
        }
    }
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
        GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Normal, iRow, iC);
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
        var index = iRow*g_iGridWidth+iC;
        var cAnswer = g_sGridAnswers.charAt(index);
        var cPlayer = g_sGridAnswersPlayer.charAt(index);
        var bSet = CharValidEntry(cPlayer);
        var bCorrect = true;
        var bCorrected = false;
        if ( cAnswer != cPlayer )
            bCorrect = false;
        if ( sToDo == 'Show')
        {
            if ( !bCorrect )
                bCorrected = true;
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
            GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Correct, iRow, iC)
        }
        else
        {
            if ( bCorrected )
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Corrected, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Corrected, iRow, iC)
            }
            else
            {
                if ( bSet )
                {
                    GR_ForRowLetter_UpdateStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
                    GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Incorrect, iRow, iC)
                }
            }
        }
        var cToSet = ' ';
        if ( sToDo == 'Show')
            cToSet = cAnswer;
        else
        {
            if ( bSet )
                cToSet = cPlayer;
        }
        GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iC, cToSet);
    }
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
            if ( IfCharNotSet(cForceCharacter) )
//            if ( cForceCharacter != '' && cForceCharacter !=' ' && cForceCharacter != g_sCharMeaningNotSet )
            {
                var sGridAnswerPlayerRow = g_aGridAnswersPlayer[iRow];
                sGridAnswerPlayerRow = replaceAt(sGridAnswerPlayerRow, iLetter, cForceCharacter )
                g_aGridAnswersPlayer[iRow] = sGridAnswerPlayerRow;
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
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we mus mark it correct and set readonly
                GR_ForRowLetterShowCheckSquare(iRR, iLetter, 'check');
            }
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
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we mus mark it correct and set readonly
                GR_ForRowLetterShowCheckSquare(iRow, iC, 'check');
            }

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
    GR_UpdateAnswersPlayer(cAnswerPlayer, iRow, iC);
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
            GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Correct, iRow, iC)
        }
        else
        {
            if ( cAnswerPlayer != '' && cAnswerPlayer != ' ' && cAnswerPlayer != '-' )
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sCA_CodeMeaning_Incorrect, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Incorrect, iRow, iC)
            }
            else
            {
                GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
                GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Normal, iRow, iC)
            }
        }
    }
    else
    {
        GR_ForRowLetter_UpdateStatusPlayer(g_sGR_CodeMeaning_Normal, iRow, iC)
        GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(g_sGR_CodeMeaning_Normal, iRow, iC)
    }
    GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iC, cAnswer);
}



function GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    var sId = GR_MakeTag_Id(iRow, iLetter);
    var sClassName = document.getElementById(sId).className;
    if ( sClassName != g_sGR_Class_BlackSquare )
        return false;
    return true;
}

function GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cForceLetter)
{
    var cStatusFinal = GR_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatusFinal == g_sGR_CodeMeaning_Corrected || cStatusFinal == g_sGR_CodeMeaning_Correct )
    {
        var sIdTD = GR_MakeTag_TD(iRow, iLetter);
        MakeInputReadOnlyForceValueIfNotAlready(sIdTD, cForceLetter);
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
        GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(cStatus, iRow, iLetter);
    }
    var cAnswer = GR_ForRowLetter_GetAnswer(iRow, iLetter);
    if ( cAnswerPlayer == cAnswer )
        cStatus = g_sGR_CodeMeaning_Correct;
    GR_ForRowLetter_UpdateStatusPlayer(cStatus, iRow, iLetter);
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GR_ForRowLetter_ForStatusPlayer_UpdateClassAndImage(cStatus, iRow, iLetter);
        GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cAnswerPlayer)
        Status_Check();
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        if ( g_GR_bAcross )
        {
            var sAnswers = g_aGridAnswers[iRow];
            var sAnswersPlayer = g_aGridAnswersPlayer[iRow];
            if ( sAnswersPlayer == sAnswers )
            {
                GR_ForRow_SetClassToStatusCorrect(iRow, sAnswers);
            }
        }
        else
        {
// need to get the answers for a column
            var bMatch = true;
            var sAnswer = '';
            for ( var iR = 0; iR < g_iGridHeight; iR++ )
            {
                if ( ! GR_ForRowAndLetter_isThisSquareABlackSquare(iR, iLetter) )
                {
                    sA = GR_ForRowLetter_GetAnswer(iR, iLetter);
                    sAP= GR_ForRowLetter_GetAnswerPlayer(iR, iLetter);
                    if ( sA != sAP )
                        bMatch = false;
                    sAnswer += sAP;
                }
                else
                {
                    sAnswer += ' ';
                }
            }
            if ( bMatch )
            {
                GR_ForLetter_SetClassToStatusCorrect(iLetter, sAnswer);
            }
        }
        Status_Check();
        StoreCookie_Puzzle()
    }
}

function GR_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aGridAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aGridAnswersPlayer[iRow] = sNew;
    GR_SetAnswersPlayer();
}

function GR_ForRow_SetClassToStatusCorrect(iRow, sAnswers)
{

    for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++)
    {
        if ( ! GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            var cStatus = g_sCA_CodeMeaning_Correct;
            GR_ForRowLetter_UpdateStatusPlayer(cStatus, iRow, iLetter);
            elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
            sClassName = elem.className;
            sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
            elem.className = sClassName;
            var cChar = sAnswers.charAt(iLetter);
            GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cChar);
        }
    }
}

function GR_ForLetter_SetClassToStatusCorrect(iLetter, sAnswer)
{
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        if ( ! GR_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            var cStatus = g_sCA_CodeMeaning_Correct;
            CA_ForRowLetter_ReplaceAnswerStatusPlayer(cStatus, iRow, iLetter);
            elem = document.getElementById(GR_MakeTag_Id(iRow, iLetter));
            sClassName = elem.className;
            sClassName = GR_SetStatusToClass_FromCode(cStatus, sClassName)
            elem.className = sClassName;
            var cChar = sAnswer.charAt(iRow);
            GR_ForRowLetter_SetToReadonlyIfNecessary(iRow, iLetter, cChar);
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

