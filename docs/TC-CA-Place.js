// TC=CA-Place.js
var g_bPlaceWindow_Active = false;

var CA_Place_bAcross = true;
var CA_Place_iRowActual = 0;
var CA_Place_iGridNumber = 0;

function CA_PlaceButton_Setup(iRow)
{
    var sFunctionsToCall = ''; 
    sFunctionsToCall += ' onclick="return CA_Place(' + iRow + ');"';
    var sButton = '';
    sButton += '<TD><BUTTON ' + sFunctionsToCall + '>Place</BUTTON></TD>'
    return sButton;
}

function CA_Place_Down(iLetter, sSetTo)
{
    CA_Place_bAcross = false;
    CA_Place_iRowActual = iLetter;
    GR_ForLetterSetAnswerTo(iLetter, sSetTo);
}

function CA_Place_Across(iRow, sSetTo)
{
    CA_Place_bAcross = true;
    CA_Place_iRowActual = iRow;
    GR_ForRowSetAnswerTo(iRow, sSetTo)
}

function CA_Place(iRow_CA)
{
    if ( !Dropdown_CanOpen() )
        return;
    var sWordBeingPlaced = g_aAnswersPlayer[iRow_CA];
    var iWordBeingPlacedLength = sWordBeingPlaced.length;
    var sWordBeingPlaced_Title = 'Placing : ' + sWordBeingPlaced;
    elem = document.getElementById("Place_WordBeingPlaced");
    elem.innerHTML = sWordBeingPlaced_Title;
    var sAcrossinnerHTML = '<TABLE><TR>';
    for ( iR = 0; iR < g_iGridHeight; iR++)
    {
        var sGridAnswer = g_GR_aAcrossAnswers[iR];
        var iGridAnswerLength = sGridAnswer.length
        if ( iGridAnswerLength == iWordBeingPlacedLength )
        {
            var iNumber = parseInt(g_GR_aAcrossAnswersNumber[iR]);
            iNumber += 1;
            var sAcrossChoice = iNumber.toString(); 
            var sAcrossChoiceRow = iR.toString();
            var sFunctionsToCall = 'CA_Place_Across(' + sAcrossChoiceRow + ', \'' + sWordBeingPlaced + '\');';
            sAcrossinnerHTML += '<TD><BUTTON class="Place_SetBox" onclick="' + sFunctionsToCall + '">' + sAcrossChoice + ' Across</TD>'            
        }
    }
    sAcrossinnerHTML += '</TR></TABLE>';
    elem = document.getElementById("Place_Across_Row_Controls");
    elem.innerHTML = sAcrossinnerHTML;
//
    var sDowninnerHTML = ''; 
    for ( iL = 0; iL < g_iGridWidth; iL++)
    {
        var sGridAnswer = g_GR_aDownAnswers[iL];
        var iGridAnswerLength = sGridAnswer.length
        if ( iGridAnswerLength == iWordBeingPlacedLength )
        {
            var iNumber = parseInt(g_GR_aDownAnswersNumber[iL]);
            iNumber += 1;
            var sDownChoice = iNumber.toString(); 
            var sDownChoiceLetter = iL.toString();
            var sFunctionsToCall = 'CA_Place_Down(' + sDownChoiceLetter + ', \'' + sWordBeingPlaced + '\');';
            sDowninnerHTML += '<TD><BUTTON class="Place_SetBox_Down" onclick="' + sFunctionsToCall +'">' + sDownChoice + ' D o w n</TD>';
        }
    }
    elem = document.getElementById("Place_Down_Row_Controls");
    elem.innerHTML = sDowninnerHTML;
//
    Place_Popup_Toggle()
}

function CA_Place_Popup_Setup()
{
    var sPopupWindow = '';
    sPopupWindow += '<div width="100%" id="Place_DivBorder" class="Place_Popup Place_BackgroundColor">';
    sPopupWindow += '<span width="100%" class="Place_Popup_Text Place_BackgroundColor" Id="Place">';
    sPopupWindow += '<div class=Place_DivBorder>';     
    sPopupWindow += '<TABLE class="Place_TableBorder" width="100%">'
    sPopupWindow += '      <TR class="Place_CloseBoxRow"><TD>'
    sPopupWindow += '          <TABLE width="100%"><TR><TD width="95%" Id="Place_WordBeingPlaced" class="Place_CloseBoxRow">Place</TD><TD width="5%"><BUTTON Id="Place_CloseBox" class="Place_CloseBox" onclick="Place_Popup_Toggle();">Quit</TD></TR></TABLE>';
    sPopupWindow += '      </TD></TR>'
    sPopupWindow += '      <TR>'
    sPopupWindow += '      <TD Id="Place_Across_Row_Controls">fixme</TD>'
    sPopupWindow += '      </TR>'
    sPopupWindow += '      <TR>'
    sPopupWindow += '      <TD Id="Place_Down_Row_Controls">fixme</TD>'
    sPopupWindow += '      </TR>'
    sPopupWindow += '       <TR><TD><DIV class="Place_Center" Id="Place_Hints"><textarea class="Place_Content_Common_Multiline Place_BackgroundColor" readonly disabled rows="2" cols="40" border=1px>some hints</textarea></DIV></TD></TR>'
    sPopupWindow += '</TABLE>'
    sPopupWindow += '</div>';
    sPopupWindow += '</span>';
    sPopupWindow += '</div>';
    document.getElementById('Place_Popup').innerHTML = sPopupWindow;
}

function Place_Popup_Toggle()
{
    var popup = document.getElementById("Place");
    popup.classList.toggle("show");
    g_bPlaceWindow_Active = !g_bPlaceWindow_Active;
}
