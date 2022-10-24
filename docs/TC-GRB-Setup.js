// TC-GRB-Setup.js

function GRB_MakeGridAsButtons()
{
    var sInner = '';
    for ( var iR = 0; iR < g_iGridHeight; iR++ )
    { 
        sInner += '<DIV class="';
        sInner += g_GR_Grid_Div_sClass;
        sInner += '" Id="GRB_Div' + iR + '">aa</DIV>'
    }
    sInner += '<DIV Id="Place_Popup_Locator" height=0 align=left></DIV>'
    document.getElementById("GRB_GridRows").innerHTML = sInner;
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
        GRB_MakeGridRowAsButtons(iRow);
}
    
function GRB_MakeGridRowAsButtons(iRow)
{
    var sInnerRowHTML = '';
    for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        sFunctionsToCall = '';
        sFunctionsToCall += ' ondrop="TC_Place_Drop(event,' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' ondragover="TC_Place_AllowDrop(event,' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onMouseDown="return GRB_onmousedown(' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onkeypress="return GRB_onkeypress(event);"';
        sFunctionsToCall += ' onkeyup="return GRB_onkeydown(event.key,' + iRow + ',' + iLetter + ');"';
        sFunctionsToCall += ' onfocus="GRB_onfocus(this);"';
        sInnerRowHTML += '<BUTTON '
        sInnerRowHTML += GRB_MakeHTMLId(iRow, iLetter);
        sInnerRowHTML += ' class="';
        sInnerRowHTML += g_GR_Grid_sClass + '" ';
        sInnerRowHTML += sFunctionsToCall;
        sInnerRowHTML += '>';
    }
    var sDiv = 'GRB_Div' + iRow;
    document.getElementById(sDiv).innerHTML=sInnerRowHTML;
//
for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {
        GRB_ForRowLetter_SetButton(iRow, iLL, g_TC_cCodeMeaning_Inactive)
    }
}
