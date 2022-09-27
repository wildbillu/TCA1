// TC-ClueAnserHelpers-Setup.js
//

function CA_SetRow(iRow)
{
    var sRowElement = 'CA_' + iRow + '_R';
    var sClass = CA_SetColorsToClass_InActive(document.getElementById(sRowElement).className);
    document.getElementById(sRowElement).className = sClass;
    var sClue = g_aClues[iRow];
    var sClueElement = 'CA_' + iRow + '_C'
    document.getElementById(sClueElement).innerHTML = sClue;
    var sInnerHTML = '';
    var iAnswerLength = CA_ForRow_GetLength(iRow);
    var aRowId = new Array(iAnswerLength);
    for ( i = 0; i < iAnswerLength; i++ )
    {
        aRowId[i] = 'Id="' + CA_MakeTag_Id(iRow, i) + '"';
    }
    var sInnerHTML = '';
    sInnerHTML += '<TABLE border=0 cellspacing=0 padding=0 rowspacing=0><TR>'
    for ( iAE = 0; iAE < iAnswerLength; iAE++ )
    {
        var sPlayerAnswer = g_aAnswersPlayer[iRow];
        var cPlayerAnswer = sPlayerAnswer.charAt(iAE);
        var sDisplayAnswer = ' ';
        if ( cPlayerAnswer != g_sCharMeaningNotSet )
            sDisplayAnswer = cPlayerAnswer;
        var sFunctionsToCall = ''; 
        sFunctionsToCall += ' onkeypress="return ProcessCA_onkeypress(event);"';
        sFunctionsToCall += ' onkeyup="return ProcessCA_onkeydown(event.key,' + iRow + ',' + iAE + ');"';
        sFunctionsToCall += ' onfocus="ProcessCA_onfocus(this);"';
        var sClass = g_sCA_Class_InActive;
        cStatus = g_aAnswersStatusPlayer[iRow].charAt(iAE);
        sClass = CA_SetStatusToClass_FromCode(cStatus, sClass)
        var sTDId = 'Id="TD_' + CA_MakeTag_Id(iRow, iAE) + '"';
        var sLine =  '<TD ' + sTDId + ' class="CA_TD_border_collapse"><INPUT class="' + sClass + '" type="text" ' + aRowId[iAE] + ' value="' + sDisplayAnswer + '" maxlength="1" ' + sFunctionsToCall + '></TD>';
        sInnerHTML += sLine;
    }
    sInnerHTML += CA_PlaceButton_Setup(iRow);
    sInnerHTML += '</TR>'
    sInnerHTML += '</TABLE>'
    var sAnswerElement = 'CA_' + iRow + '_A'
    document.getElementById(sAnswerElement).innerHTML = sInnerHTML;
}

function Clues1And2Entries_MakeInnerHTML_NoImage()
{
    var s = '';
		s+='<TABLE class="Row_DualClue">';
    	s+='<TR align=center><TD>' + TableForDualAnswer() + '</TD></TR>';
        s+='</TABLE>';
    return s;
}

function TableForDualAnswer()
{
    var sInnerHTML = '';
    sInnerHTML += '<TABLE cellspacing=0 padding=0><TR width=100%>';
    sInnerHTML += CA_PlaceButton_Setup(0);
    sInnerHTML += '<TD>' + g_sDualClueBefore + '</TD>';
    for ( iRow = 0; iRow < 2; iRow++ )
    {
        var sAnswer = g_aAnswers[iRow];
        var iAnswerLength = CA_ForRow_GetLength(iRow);
        var aRowId = new Array(iAnswerLength);
        for ( i = 0; i < iAnswerLength; i++ )
        {
            aRowId[i] = 'Id="' + CA_MakeTag_Id(iRow, i) + '"';
        }
        sInnerHTML += '<TD><TABLE border=0 cellspacing=0 padding=0 rowspacing=0><TR>'
        for ( iAE = 0; iAE < iAnswerLength; iAE++ )
        {
            var sPlayerAnswer = g_aAnswersPlayer[iRow];
            var cPlayerAnswer = sPlayerAnswer.charAt(iAE);
            var sDisplayAnswer = ' ';
            if ( cPlayerAnswer != g_sCharMeaningNotSet )
                sDisplayAnswer = cPlayerAnswer;
            var sFunctionsToCall = ''; 
            sFunctionsToCall += '     onkeypress="return ProcessCA_onkeypress(event);"';
            sFunctionsToCall += '     onkeyup="return ProcessCA_onkeydown(event.key,' + iRow + ',' + iAE + ');"';
            sFunctionsToCall += '     onkeyup="return ProcessCA_onkeyup(event.key,' + iRow + ',' + iAE + ');"';
            sFunctionsToCall += '     onfocus="ProcessCA_onfocus(this);"';
            var sClass = g_sCA_Class_InActive;
            cStatus = g_aAnswersStatusPlayer[iRow].charAt(iAE);
            sClass = CA_SetStatusToClass_FromCode(cStatus, sClass);
            var sTDId = 'Id="TD_' + CA_MakeTag_Id(iRow, iAE) + '"';
            var sReadonly = '';
            var cStatusPlayer = CA_ForRowLetter_GetStatusPlayer(iRow, iAE);
            if ( cStatusPlayer == g_sCA_CodeMeaning_Corrected || cStatusPlayer == g_sCA_CodeMeaning_Correct )
            {
                sReadonly = ' readonly '
            }
            var sLine =  '<TD ' + sTDId + ' class="CA_TD_border_collapse"><INPUT class="' + sClass + '" type="text" ' + aRowId[iAE] + ' value="' + sDisplayAnswer + '" maxlength="1" ' + sFunctionsToCall + sReadonly + '></TD>';
            sInnerHTML += sLine;
        }
        if ( iRow == 0)
            sInnerHTML += '<TD>' + g_sDualClueMiddle + '</TD>';

        sInnerHTML += '</TR></TABLE></TD>'
    }
    sInnerHTML += '<TD>' + g_sDualClueEnd + '</TD>';
    sInnerHTML += CA_PlaceButton_Setup(1);
    sInnerHTML += '</TR></TABLE>';
    return sInnerHTML;
}




