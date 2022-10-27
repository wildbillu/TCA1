//TC-GRB-MoveFocus.js

function GRB_ChangeDirection()
{
    if ( g_GRB_Focus_sId == '')
    {
        g_GRB_bAcross = !g_GRB_bAcross;
        if ( g_CAB_Focus_sId != '')
            document.getElementById(g_CAB_Focus_sId).focus();
        return;
    }
// so we know GRB has focus and there fore CA does not    
    var iRow = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    GRB_onmousedown(iRow, iLetter);
    document.getElementById(g_GRB_Focus_sId).focus()
}

function GRB_MoveFocus(iNewRow, iNewLetter)
{
    var sNextBoxID = GRB_MakeId(iNewRow, iNewLetter);
	document.getElementById(sNextBoxID).focus();
}
function GRB_StopHere(iRow, iLetter)
{
    var bPlayerSet = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter);
    var bBlackSquare = GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter);
    var cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var bIsIncorrect = false;
    if ( cStatus == g_TC_cCodeMeaning_Incorrect) bIsIncorrect = true;
    var bIsCorrect = false;
    if ( cStatus == g_TC_cCodeMeaning_Correct) bIsCorrect = true;
    var bStopHere = true;
    if ( bIsCorrect )   bStopHere = false;
    if ( bPlayerSet )   bStopHere = false;    
    if ( bIsIncorrect ) bStopHere = true;
    if ( bBlackSquare ) bStopHere = false;
    return bStopHere;
}

function GRB_SetFocusToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter;
    if ( g_GRB_bAcross )
    {
        var bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( !bLastLetterAcross && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
        {
            for ( iL = iLetter+1; iL < g_iGridWidth; iL++)
            {
                var bStopHere = GRB_StopHere(iRow, iL)
                if ( bStopHere )
                {
                    GRB_MoveFocus(iRow, iL);
                    return;
                }
                iLetter = iL;
            }
        }
        bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( bLastLetterAcross && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
        { 
            for ( iL = 0; iL < iLetter; iL++)
            {
                var bStopHere = GRB_StopHere(iRow, iL)
                if ( bStopHere )
                {
                    GRB_MoveFocus(iRow, iL);
                    return;
                }
            }
        }
        bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( bLastLetterAcross && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
        {
            return;
        }
        if ( iLetter < g_iGridWidth - 1 )
        {
            iNewLetter = iNewLetter + 1;
        }
        else
        {
            iNewLetter = 0;
            iNewRow++;
        }
        if ( iNewRow > g_iGridHeight - 1 )
        {
            iNewRow = 0;
            iNewLetter = 0;
        }
    }
    else
    {
    // starts the down stuff
        var bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
    if ( !bLastLetterDown && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
        {
            for ( iR = iRow+1; iR < g_iGridHeight; iR++)
            {
                var bStopHere = GRB_StopHere(iR, iLetter)
                if ( bStopHere )
                {
                    GRB_MoveFocus(iR, iLetter);
                    return;
                }
                iRow = iR;
            }
        }
        bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
        if ( bLastLetterDown && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
        { 
            for ( iR = 0; iR < g_iGridHeight-1; iR++)
            {
                var bStopHere = GRB_StopHere(iR, iLetter)
                if ( bStopHere )
                {
                    GRB_MoveFocus(iR, iLetter);
                    return;
                }
            }
        }
        bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
        if ( bLastLetterDown && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
        {
            return;
        }
        var iNewRow = iRow;
        var iNewLetter = iLetter;
        if ( iRow == g_iGridHeight - 1 && iLetter == g_iGridWidth - 1)
        {
            iNewRow = 0;
            iNewLetter = 0;
        }
        else
        {
            if ( iRow < g_iGridHeight - 1)
            {
                iNewRow = iRow + 1;
                iNewLetter = iLetter;
            }
            else
            {
                iNewRow = 0;
                iNewLetter = iNewLetter + 1;
            }
        }
    }
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iNewRow, iNewLetter) )
    {
        GRB_SetFocusToNext(iNewRow, iNewLetter);
        return;
    }
    GRB_MoveFocus(iNewRow, iNewLetter)
}