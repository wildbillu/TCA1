// CA-ClueAnswerHelpers-Process.js
// 
var g_CA_sLastCharacterRejected = '';

function CA_SetToInActive(iRow)
{
    if ( iRow == 0 || iRow == 1)
    {
        document.getElementById('CA_01_R').className = CA_SetColorsToClass_InActive(document.getElementById('CA_01_R').className);
        document.getElementById('CA01C').className = CA_SetColorsToClass_InActive(document.getElementById('CA01C').className);
        document.getElementById('CA01CI').className = CA_SetColorsToClass_InActive(document.getElementById('CA01CI').className);
    }
    else
    {
        var sRowElement = 'CA_' + iRow + '_R'
        document.getElementById(sRowElement).className = CA_SetColorsToClass_InActive(document.getElementById(sRowElement).className);
    }
    for ( iOL = 0; iOL < CA_ForRow_GetLength(iRow); iOL++ )
    {
        var sID = CA_MakeTag_Id(iRow, iOL);
        var sClass = document.getElementById(sID).className;
        sClass = CA_SetColorsToClass_InActive(sClass);
        sClass = CA_SetStatusToClass_FromCode(g_aAnswersStatusPlayer[iRow].charAt(iOL), sClass)
        document.getElementById(sID).className = sClass;
    }
}

function ProcessCA_FocusLostSetActiveToInActive()
{
    if ( g_sCAidWithFocus == '' ) 
    {
        setlineAdd('CAFocusAlreadyLost')
        return;
    }
    var iActiveRow        = CA_RowFromId(g_sCAidWithFocus);
    CA_SetToInActive(iActiveRow)
    var sRowElement = 'CA_' + iRow + '_R';
    document.getElementById(sRowElement).className = CA_SetColorsToClass_InActive(document.getElementById(sRowElement).className);
    g_sCAidWithFocus = '';
}

function ProcessCA_SetActive(iRow, iActiveCharacter)
{
    if ( iRow == 0 || iRow == 1)
    {
        var sClass = '';
        sClass = CA_SetColorsToClass_Active(document.getElementById('CA_01_R').className);
        document.getElementById('CA_01_R').className = sClass;
        sClass = CA_SetColorsToClass_Active(document.getElementById('CA01C').className);
        document.getElementById('CA01C').className = sClass;
        sClass = CA_SetColorsToClass_Active(document.getElementById('CA01CI').className);
        document.getElementById('CA01CI').className = sClass;
    }
    else
    {    
        var sRowElement = 'CA_' + iRow + '_R';
        document.getElementById(sRowElement).className = CA_SetColorsToClass_Active(document.getElementById(sRowElement).className);
    }
//
    var iLength = CA_ForRow_GetLength(iRow);
    for ( iC = 0; iC < iLength; iC++ )
    {
        var sid = CA_MakeTag_Id(iRow, iC);
        if ( iC == iActiveCharacter )
        {
            var elem = document.getElementById(sid);
            var sClass = elem.className;
            sClass = CA_SetColorsToClass_Focus(sClass);
            var sStatus = g_aAnswersStatusPlayer[iRow];
            var cStatus = sStatus.charAt(iC);
            sClass = CA_SetStatusToClass_FromCode(cStatus, sClass);
            elem.className = sClass;
            elem.setSelectionRange(0,1);
        }
        else
        {
            var elem = document.getElementById(sid);
            var sClass = elem.className;
            sClass = CA_SetColorsToClass_Active(sClass);
            sClass = CA_SetStatusToClass_FromCode(g_aAnswersStatusPlayer[iRow].charAt(iC), sClass)
            elem.className = sClass;
        }
    }
}

function ProcessCA_onfocus(x)
{
    var sThisId = x.id;
    if ( g_GR_sFocus != '')        
    {
        ProcessGR_FocusLostSetActiveToInActive();
    }
    if ( sThisId == g_sCAidWithFocus )
        return;
    var iThisRow        = CA_RowFromId(sThisId);
    var iThisCharacter  = CA_LetterFromId(sThisId);
       // deal with changes to the new focus
    ProcessCA_SetActive(iThisRow, iThisCharacter);
    if ( g_sCAidWithFocus != '' )
    {
        var iOldRow = CA_RowFromId(g_sCAidWithFocus);
        if ( iThisRow != iOldRow )
        { // need to change the old row to inactive
            CA_SetToInActive(iOldRow);        
        }
    }
    g_sCAidWithFocus = sThisId;
}

function ProcessCA_onkeypress(event)
{
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    g_CA_sLastCharacterRejected = ekey;
    if ( event.code == 8 || event.code == 46 )
        return false;
    setlineAdd('KPNotHandled:' + ekey + '-Code:' + event.code);
    return false;
}

function ProcessCA_onkeydown(key, iRow, iLetter)
{
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        CA_UpdateAllOnKeyDown(sUpper, iRow, iLetter);
        ProcessCA_SetFocusToNext(iRow, iLetter);
        return true;
    }
// if last key rejected is number, then we fixup things
    if ( g_CA_sLastCharacterRejected >= '0' && g_CA_sLastCharacterRejected <= '9' )
    {
        g_CA_sLastCharacterRejected = ' ';
        var sFixThisBox = CA_MakeTag_Id(iRow, iLetter);
        document.getElementById(sFixThisBox).focus();
        document.getElementById(sFixThisBox).setSelectionRange(0,1);
        return false;
        }
    // trap the arrow keys
    if ( key.startsWith('Arrow') )
    {
        if ( key.match('Up') )
        {
            var iNewRow = iRow - 1;
            if ( iNewRow < 0 )
                iNewRow = g_iClues - 1;
            var iNewLetter = iLetter;
            var iLengthOfNewRow = CA_ForRow_GetLength(iNewRow);
            if ( iNewLetter > iLengthOfNewRow - 1 )
                 iNewLetter = iLengthOfNewRow - 1;
            ProcessCA_MoveFocus(iNewRow, iNewLetter);
            return true;
        }
        else if ( key.match('Down') )
        {
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            var iNewRow = iRow + 1;
            if ( iNewRow > g_iClues - 1 )
                iNewRow = 0;
            var iLengthNewRow = CA_ForRow_GetLength(iNewRow);
            var iNewLetter = iLetter;
            if ( iNewLetter > iLengthNewRow - 1)
                iNewLetter = iLengthNewRow - 1;
            P(iRow, iLetter, iNewRow, iNewLetter);
            return true;
        }
        else if ( key.match('Right') )
        {
            var sNext = ProcessCA_RowLetterNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            ProcessCA_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else 
        { // must be left
            var sNext = ProcessCA_RowLetterPrevious(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            ProcessCA_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
    }
    else
    {
        setline('keydown:' + key + 'notprocessed');
    }
setlineAdd('sfix');
    var sFixThisBox = CA_MakeTag_Id(iRow, iLetter);
    document.getElementById(sFixThisBox).focus();
    document.getElementById(sFixThisBox).setSelectionRange(0,1);
    return false;
}

function ProcessCA_RowLetterNext(iRow, iLetter)
{
    var iNewRow = iRow;
	var iNewLetter = iLetter;
    var iLettersThisRow = CA_ForRow_GetLength(iNewRow);
	if ( iLetter < iLettersThisRow - 1 )
	{
		iNewLetter = iNewLetter + 1;
    }
    else
    {
        iNewLetter = 0;
        iNewRow++;
        if ( iNewRow > g_iAnswers - 1)
            iNewRow = 0;
    }
	if ( iNewRow > g_iClues - 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessCA_RowLetterPrevious(iRow, iLetter)
{
    var iNewRow = iRow;
	var iNewLetter = iLetter;
	if ( iLetter == 0 )
	{
        iNewRow = iRow - 1;
        if ( iNewRow < 0 )
            iNewRow = g_iAnswers - 1;
        iNewLetter = CA_ForRow_GetLength(iNewRow) - 1;
    }
    else
    {
        iNewLetter = iLetter - 1;
    }
	if ( iNewRow < 0  )
    {
        iNewRow = g_iAnswers - 1;
        iNewLetter =  g_aAnswers[iNewRow].length;
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function ProcessCA_MoveFocus(iNewRow, iNewLetter)
{
    if ( iNewRow > iClueAnswers -1 || iNewRow < 0 )
    {
        setline('Invalid Row:'+ iNewRow + 'iNewLetter:' + iNewLetter);
        iNewRow = 0;
    }
    var sNextBox = CA_MakeTag_Id(iNewRow, iNewLetter);
	var sNextLetter = document.getElementById(sNextBox).value;
	document.getElementById(sNextBox).focus();
	if (sNextLetter.length == 1)
		document.getElementById(sNextBox).setSelectionRange(0,1);
}

function ProcessCA_SetFocusToNext(iRow, iLetter)
{
    var iLength = CA_ForRow_GetLength(iRow);
    var iNewRow = iRow;
	var iNewLetter = iLetter;
	if ( iLetter < iLength-1 )
	{
		iNewLetter = iNewLetter + 1;
    }
    else
    {
        iNewLetter = 0;
        iNewRow++;
    }
	if ( iNewRow > g_iAnswers - 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    ProcessCA_MoveFocus(iNewRow, iNewLetter)
}



