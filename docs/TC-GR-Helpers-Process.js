// TC-GridHelpers-Process.js
var iCount=0;
function ProcessGR_onkeypress(event, iRow, iLetter)
{
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
    {
        return true; // so character will be processed
    }
    g_GR_sLastCharacterRejected = ekey;
    if ( event.code == 8 || event.code == 46 )
        return false;
    setline('KPNotHandled:' + ekey + '-Code:' + event.code);
    return false;
}

function ProcessGR_onkeydown(key, iRow, iLetter)
{
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        GR_ForRowLetter_SetStatusPlayer_AndSetClassOfCurrent(sUpper, iRow, iLetter);
        ProcessGR_SetFocusToNext(iRow, iLetter);
        return true;
    }
// if last key rejected is number, then we fixup things
    if ( g_GR_sLastCharacterRejected >= '0' && g_GR_sLastCharacterRejected <= '9' )
    {
        g_CA_sLastCharacterRejected = ' ';
        var sFixThisBox = GR_MakeTag_Id(iRow, iLetter);
        document.getElementById(sFixThisBox).focus();
        document.getElementById(sFixThisBox).setSelectionRange(0,1);
        return false;
        }
    // trap the arrow keys
    if ( key.startsWith('Arrow') )
    {
        if ( key.match('Up') )
        {
            var sNext = ProcessGR_GoUpToNext(iRow, iLetter);
            ProcessGR_MoveFocus(iRow, iLetter, parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else if ( key.match('Down') )
        {
            var sNext = ProcessGR_GoDownToNext(iRow, iLetter);
            ProcessGR_MoveFocus(iRow, iLetter, parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else if ( key.match('Right') )
        {
            var sNext = ProcessGR_GoRightToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            ProcessGR_MoveFocus(iRow, iLetter, parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else 
        { // must be left
            var sNext = ProcessGR_GoLeftToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            ProcessGR_MoveFocus(iRow, iLetter, parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
    }
    else
    {
        setline('keydown:' + key + 'notprocessed');
    }
    var sFixThisBox = GR_MakeTag_Id(iRow, iLetter);
    document.getElementById(sFixThisBox).focus();
    document.getElementById(sFixThisBox).setSelectionRange(0,1);
    return false;
}

function GR_UpdateAnswersPlayer(cNew, iRow, iLetter)
{
    sNew = replaceAt(g_aGridAnswersPlayer[iRow], iLetter, cNew)
    g_aGridAnswersPlayer[iRow] = sNew;
    g_sGridAnswersPlayer = g_aGridAnswersPlayer.join('');
// now update the status
    GR_ForRowLetter_UpdateStatusPlayer(cNew, iRow, iLetter)
}

function ProcessGR_ChangeDirection()
{
    if ( g_GR_sFocus == '')
    {
        g_GR_bAcross = !g_GR_bAcross;
        if ( g_sCAidWithFocus != '')
            document.getElementById(g_sCAidWithFocus).focus();
        if ( g_GR_sFocus != '')
            document.getElementById().focus();
        return;
    }
    var iRow = GR_RowFromId(g_GR_sFocus);
    var iLetter = GR_LetterFromId(g_GR_sFocus);
    ProcessGR_onmousedown(iRow, iLetter);
    document.getElementById(g_GR_sFocus).focus()
    if ( g_sCAidWithFocus != '')
        document.getElementById(g_sCAidWithFocus).focus();
    if ( g_GR_sFocus != '')
        document.getElementById(g_GR_sFocus).focus();
}

function ProcessGR_onmousedown(iRow, iCharacter)
{
    var sMouseDownLocation = GR_MakeTag_Id(iRow, iCharacter)
    if ( sMouseDownLocation == g_GR_sFocus )
    {
        if ( g_GR_bAcross )
        {
            g_GR_bAcross = false;
            GR_SetRowToInActive(iRow);
            GR_SetColumnToActive(iCharacter, iRow);
        }
        else
        {
            g_GR_bAcross = true;
            GR_SetColumnToInActive(iCharacter);
            GR_SetRowToActive(iRow, iCharacter);
        }
        return false;
    }
    return true;
}

function ProcessGR_FocusLostSetActiveToInActive()
{
    if ( g_GR_sFocus == '' )
    {
        setline('GRAlreadyLostFocus');
        return;
    }
    var iRow        = GR_RowFromId(g_GR_sFocus);
    var iCharacter  = GR_LetterFromId(g_GR_sFocus);
    if ( g_GR_bAcross )
        GR_SetRowToInActive(iRow);
    else
        GR_SetColumnToInActive(iCharacter);
    g_GR_sFocus = '';
}

function GR_SetRowToActive(iRow, iCharacterWithFocus)
{
    for ( iC = 0; iC < g_iGridWidth; iC++ )
    {
        var sidInRow = GR_MakeTag_Id(iRow, iC);
        if ( iC != iCharacterWithFocus )
        {
            if ( !GR_isThisSquareABlackSquare(sidInRow) )
            {
                var sClass = document.getElementById(sidInRow).className;
                document.getElementById(sidInRow).className = GR_SetColorsToClass_Active(sClass);
            }
        }
        else
        {
            if ( !GR_isThisSquareABlackSquare(sidInRow) )
            {
                var sClass = document.getElementById(sidInRow).className;
                document.getElementById(sidInRow).className = GR_SetColorsToClass_Focus(sClass);
                document.getElementById(sidInRow).setSelectionRange(0,1);
            }
        }
    }
}

function GR_SetColumnToInActive(iCharacter)
{
    for ( iR = 0; iR < g_iGridWidth; iR++ )
    {
        var sidInRow = GR_MakeTag_Id(iR, iCharacter);
        if ( !GR_isThisSquareABlackSquare(sidInRow) )
        {
            var sClass = document.getElementById(sidInRow).className;
            var sNewClass = GR_SetColorsToClass_InActive(sClass);
            document.getElementById(sidInRow).className = sNewClass;
        }
    }
}

function GR_SetRowToInActive(iRow)
{
    for ( iC = 0; iC < g_iGridWidth; iC++ )
    {
        var sidInRow = GR_MakeTag_Id(iRow, iC);
        if ( !GR_isThisSquareABlackSquare(sidInRow) )
        {
            var sClass = document.getElementById(sidInRow).className;
            document.getElementById(sidInRow).className = GR_SetColorsToClass_InActive(sClass);
        }
    }
}

function GR_SetColumnToActive(iCharacter, iRowWithFocus)
{
    for ( iR = 0; iR < g_iGridWidth; iR++ )
    {
        var sidInRow = GR_MakeTag_Id(iR, iCharacter);
        if ( iR != iRowWithFocus )
        {
            if ( !GR_isThisSquareABlackSquare(sidInRow) )
            {
                var sClass = document.getElementById(sidInRow).className;
                document.getElementById(sidInRow).className = GR_SetColorsToClass_Active(sClass);
            }
        }
        else
        {
            if ( !GR_isThisSquareABlackSquare(sidInRow) )
            {
                var sClass = document.getElementById(sidInRow).className;
                var sNewClass = GR_SetColorsToClass_Focus(sClass);
                document.getElementById(sidInRow).className = sNewClass;
                document.getElementById(sidInRow).setSelectionRange(0,1);
            }
        }
    }
}

function ProcessGR_onfocus(x)
{
    var sThisId = x.id;
    if ( g_sCAidWithFocus != '')        
    {
        ProcessCA_FocusLostSetActiveToInActive();
    }
    if ( GR_isThisSquareABlackSquare(sThisId) )
    {
        setline('noBSFocus');
        return;
    }
    var iThisRow        = GR_RowFromId(sThisId);
    var iThisCharacter  = GR_LetterFromId(sThisId);
    // deal with changes to the new focus
    if ( g_GR_bAcross )
        GR_SetRowToActive(iThisRow, iThisCharacter );
    else       
        GR_SetColumnToActive(iThisCharacter, iThisRow);
        
    if ( g_GR_sFocus != '' )
    {    
        var iOldRow        = GR_RowFromId(g_GR_sFocus);
        var iOldCharacter  = GR_LetterFromId(g_GR_sFocus);        
        if ( g_GR_bAcross )
        { // fixing to oldrows
            if ( iThisRow != iOldRow)
                GR_SetRowToInActive(iOldRow)
        }
        else
        { // fixing to oldcolumns
            if ( iThisCharacter != iOldCharacter)
            {
                GR_SetColumnToInActive(iOldCharacter);
            }                
        }
    }
    g_GR_sFocus = sThisId;
    return true;
}


function ProcessGR_GoUpToNext(iRow, iLetter)
{
    var iNewLetter = iLetter;
    var iNewRow = iRow - 1;
    if ( iNewRow < 0 )
        iNewRow = g_iGridHeight - 1;
    var sNewId = GR_MakeTag_Id(iNewRow, iNewLetter);
    if ( GR_isThisSquareABlackSquare(sNewId) )
    {
        return ProcessGR_GoUpToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessGR_GoDownToNext(iRow, iLetter)
{
    var iNewLetter = iLetter;
    var iNewRow = iRow + 1;
    if ( iNewRow > g_iGridHeight - 1 )
    {
        iNewRow = 0;
    }        
    var sNewId = GR_MakeTag_Id(iNewRow, iNewLetter);
    if ( GR_isThisSquareABlackSquare(sNewId) )
    {
        return ProcessGR_GoDownToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessGR_GoLeftToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter - 1;
    if ( iNewLetter < 0 )
        iNewLetter = g_iGridWidth - 1;
    var sNewId = GR_MakeTag_Id(iNewRow, iNewLetter);
    if ( GR_isThisSquareABlackSquare(sNewId) )
    {
        return ProcessGR_GoLeftToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessGR_GoRightToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter + 1;
    if ( iNewLetter >= g_iGridWidth )
        iNewLetter = 0;
    var sNewId = GR_MakeTag_Id(iNewRow, iNewLetter);
    if ( GR_isThisSquareABlackSquare(sNewId) )
    {
        return ProcessGR_GoRightToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessGR_MoveFocus(iRow, iLetter, iNewRow, iNewLetter)
{
    var sNextBoxID = GR_MakeTag_Id(iNewRow, iNewLetter);
	var sNextLetter = document.getElementById(sNextBoxID).value;
	document.getElementById(sNextBoxID).focus();
	if ( sNextLetter.length == 1 )
		document.getElementById(sNextBoxID).setSelectionRange(0,1);
}

function ProcessGR_SetFocusToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter;
    if ( g_GR_bAcross )
    {
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
    var sNewId = GR_MakeTag_Id(iNewRow, iNewLetter);
    if ( GR_isThisSquareABlackSquare(sNewId) )
    {
        ProcessGR_SetFocusToNext(iNewRow, iNewLetter);
        return;
    }
    ProcessGR_MoveFocus(iRow, iLetter, iNewRow, iNewLetter)
}
