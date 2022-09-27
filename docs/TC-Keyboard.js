// TC-keyboard.js
// 
function HandleKeyboardPress(sLetter)
{
    GR_HandleKeyboardPress(sLetter);
    CA_HandleKeyboardPress(sLetter);
}

function KB_SetButtonRow(sLetters)
{
    var sButtonRow = '<TABLE><TR><TD>';
    var iLetters = sLetters.length;
    for ( iLetter = 0; iLetter < iLetters; iLetter++ )
    {
        sButtonRow += KB_Set_TDButton(sLetters.charAt(iLetter));
    }
    sButtonRow += '</TD></TR></TABLE>'
    return sButtonRow;
}

function KB_Set_TDButton(sLetter)
{
    var sText = sLetter;
    var sClass = '"KB_Button KB_Button_Letter"';
    var sCC = String.fromCharCode(8);
    if ( sLetter == sCC )
    {
        sClass = '"KB_Button KB_Button_Backspace"'
        sText = 'BKS';
    }
    var sButton = '<TD><BUTTON class=' + sClass + ' value=\'' + sLetter + '\' onclick="HandleKeyboardPress(\'';
    sButton += sLetter +'\');">';
    sButton += sText;
    sButton += '</TD>';
    return sButton;
}

function KB_Set_innerHTML()
{
    var sInner = '<TABLE align=center>';
// first row has letters QWERTYUIOP
    sInner += '<TR align=center><TD>';
    sInner += KB_SetButtonRow('QWERTYUIOP');
    sInner += '</TD></TR>';    
// secondrow has ASDFGHJKL
    sInner += '<TR align=center><TD>';
    sInner += KB_SetButtonRow('ASDFGHJKL');
    sInner += '</TD></TR>';    
// third has ZXCVBNM and backspace
    sInner += '<TR align=center><TD>';
    var sThisRow = 'ZXCVBNM';
    var sCC = String.fromCharCode(8);
    sThisRow += sCC;
    sInner += KB_SetButtonRow(sThisRow);
    sInner += '</TD></TR>';    
    sInner += '</TR>';    
    sInner += '</TABLE>';
    document.getElementById('KB').innerHTML = sInner;
}

function GR_HandleKeyboardPress(keypressed)
{
    if ( g_GR_sFocus == "")
        return;
    iRow = GR_RowFromId(g_GR_sFocus);
    iLetter = GR_LetterFromId(g_GR_sFocus);
    var sToSet = keypressed;
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    document.getElementById(g_GR_sFocus).value = sToSet;
    ProcessGR_onkeydown(keypressed, iRow, iLetter);
}

function CA_HandleKeyboardPress(keypressed)
{
    if ( g_sCAidWithFocus == "")
        return;
    iRow = CA_RowFromId(g_sCAidWithFocus);
    iLetter = CA_LetterFromId(g_sCAidWithFocus);
    var sToSet = keypressed;
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    document.getElementById(g_sCAidWithFocus).value = sToSet;
    ProcessCA_onkeydown(keypressed, iRow, iLetter);
}


