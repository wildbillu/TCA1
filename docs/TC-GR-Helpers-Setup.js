// TC-GridHelpers-Setup.js
// 
function LoadGridInnerHTML()
{
    var sGrid = '';
    sGrid += '<TABLE width="100%" class="GR_Table_collapse">';
    for ( ii = 0; ii < g_iGridHeight; ii++ )
    {
        var sInner = GridRow_MakeInnerHTML(ii);
        sGrid += sInner;
    }
    sGrid += '<TR><TD bgcolor="#FFFFFF" colspan=' + g_iGridWidth + ' width=200 Id="Place_Popup" height=0 align=center></TD></TR>'
    sGrid += '</TABLE>';
    document.getElementById('GridVersion').innerHTML = sGrid;
    for ( iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( iL = 0; iL < g_iGridWidth; iL++ )
        {
            var cStatus = GR_ForRowLetter_GetStatusPlayer(iR, iL)
            GR_ForRowLetter_ForStatusPlayer(cStatus, iR, iL)
        }
    }
}

function GridRow_MakeInnerHTML(iRow)
{
    var sInnerHTML ='';
    sInnerHTML += '<TR>';
    for ( iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        var cAnswer       = GR_ForRowLetter_GetAnswer(iRow, iLetter);
        var cAnswerPlayer = GR_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
        var cStatusPlayer = GR_ForRowLetter_GetStatusPlayer(iRow, iLetter);
        //
        var sDisplayAnswer = ' ';
        if ( IfCharNotSet(cAnswerPlayer ) )
            sDisplayAnswer = '' + cAnswerPlayer;
        var sClassName = g_sGR_Class_InActive;
        sClassName = GR_SetStatusToClass_FromCode(cStatusPlayer, sClassName);
        var sReadonly = '';
        if ( cStatusPlayer == g_sGR_CodeMeaning_Corrected || cStatusPlayer == g_sGR_CodeMeaning_Correct )
        {
            sReadonly = ' readonly '
        }
        if ( cAnswer == g_cCharacterDenotingBlackSquare )
            sClassName = g_sGR_Class_BlackSquare;
        var sFunctionsToCall = ''; 
        sFunctionsToCall += ' onMouseDown="return GR_onmousedown(' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onkeypress="return GR_onkeypress(event,' + iRow + ',' + iLetter + ');"';
        sFunctionsToCall += ' onkeyup="return GR_onkeydown(event.key,' + iRow + ',' + iLetter + ');"';
        sFunctionsToCall += ' onfocus="GR_onfocus(this);"';
        var sTId = 'Id="TD_' + GR_MakeTag_Id(iRow, iLetter) + '"';
        var sInput = '<TD ' + sTId + ' class="GR_TD_border_collapse"><INPUT class="' + sClassName + '" type="text" ' + GR_MakeTag_HTMLId(iRow, iLetter) + ' value="' + sDisplayAnswer + '" maxlength="1" ' + sFunctionsToCall + ');" ' + sReadonly + '></TD>'
        sInnerHTML += sInput;
    }  
    sInnerHTML += '</TR>';
    return sInnerHTML;
}
