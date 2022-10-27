// TC=Place.js
var g_bPlaceWindow_Active = false;
var g_Place_OnSet_CAB_Focus_sId = '';
var g_Place_OnSet_GRB_Focus_sId = '';

function CA_PlaceButton_Setup(iRow)
{
    var sId = 'Id=Place_' + iRow + ' ';
    var sButton = '';
    sButton = '<DIV>';
    if ( g_Place_bDirectPlaceSupport )    
    {
        sButton += TC_Place_Direct_Buttons(iRow);
    }
    if ( g_Place_bPopupPlaceSupport )
    {
        var sFunctionsToCall = ''; 
        sFunctionsToCall += ' onclick="return CA_Place(' + iRow + ');"';
        sButton += '<BUTTON class="Place_Button" ' + sId + sFunctionsToCall + '>Place</BUTTON>';
    }        
    sButton += '</DIV>';
    return sButton;
}

function CA_Place(iRow_CA)
{
    if ( !Dropdown_CanOpen() )
        return;
    g_TC_Place_Draggable_bActive = false;
    g_TC_Place_Draggable_sWordToPlace = '';
    g_TC_Place_Draggable_sAcrossRowsAllowed = '';
    g_TC_Place_Draggable_sDownLettersAllowed = '';
    // move focus to first character of that row
    var sNextBox = CAB_MakeId(iRow_CA, 0);
    document.getElementById(sNextBox).focus();
    var sWordBeingPlaced = g_aAnswersPlayer[iRow_CA];
    var iWordBeingPlacedLength = sWordBeingPlaced.length;
    for ( iCC = 0; iCC < iWordBeingPlacedLength; iCC++)
    {
        var iCode = sWordBeingPlaced.charCodeAt(iCC);
        if ( iCode == 8 || iCode == 32 || iCode == 46 )
           sWordBeingPlaced = replaceAt(sWordBeingPlaced, iCC,"-")
    }
    var sAcrossinnerHTML = '<TABLE cellspacing=0 cellpadding=0>';
    var aHints = [];
    var sHint = ''
    var iWidthAcross = 0;
    for ( iR = 0; iR < g_iGridHeight; iR++)
    {
        var sGridAnswer = g_GR_aAcrossAnswers[iR];
        var iGridAnswerLength = sGridAnswer.length;
        if ( iGridAnswerLength == iWordBeingPlacedLength )
        {
            g_TC_Place_Draggable_sAcrossRowsAllowed += iR.toString();
            var iNumber = parseInt(g_GR_aAcrossAnswersNumber[iR]);
            iNumber += 1;
            var sAcrossChoice = iNumber.toString(); 
            var sAcrossChoiceRow = iR.toString();
            var sFunctionsToCall = 'CA_Place_Across(' + sAcrossChoiceRow + ', \'' + sWordBeingPlaced + '\');';
            sAcrossinnerHTML += '<TR><TD><BUTTON class="Place_SetBox_Across" onclick="' + sFunctionsToCall + '">' + sAcrossChoice + ' Across</TD></TR>';
//            
            sHint = sAcrossChoice + ' A:' + GRB_ForRowMakeHints(iR, sWordBeingPlaced);
            aHints.push(sHint)
            iWidthAcross += 21;
        }
    }
    sAcrossinnerHTML += '</TABLE>';
    var elemAcrossRow = document.getElementById("Place_Across_Row_Controls");
// now adjust the size of the container
    elemAcrossRow.innerHTML = sAcrossinnerHTML;
//
    var sDowninnerHTML = ''; 
    var iWidthDown = 0;
    for ( iL = 0; iL < g_iGridWidth; iL++)
    {
        var sGridAnswer = g_GR_aDownAnswers[iL];
        var iGridAnswerLength = sGridAnswer.length
        if ( iGridAnswerLength == iWordBeingPlacedLength )
        {
            g_TC_Place_Draggable_sDownLettersAllowed += iL.toString();
            var iNumber = parseInt(g_GR_aDownAnswersNumber[iL]);
            iNumber += 1;
            var sDownChoice = iNumber.toString(); 
            var sDownChoiceLetter = iL.toString();
            var sFunctionsToCall = 'CA_Place_Down(' + sDownChoiceLetter + ', \'' + sWordBeingPlaced + '\');';
            sDowninnerHTML += '<TD><BUTTON class="Place_SetBox_Down" onclick="' + sFunctionsToCall +'">' + sDownChoice + '  D o w n</TD>';
            sHint = sDownChoice + ' D: ' + GRB_ForLetterMakeHints(iL, sWordBeingPlaced);
            aHints.push(sHint)
            iWidthDown += 21;
        }
    }
    var elemDownRow = document.getElementById("Place_Down_Row_Controls")
    elemDownRow.innerHTML = sDowninnerHTML;
    elemDownRow.style.width = MakePixelString(iWidthDown);
    elemDownRow.style.top = MakePixelString(g_GR_Draggable_iSize + 10);
    elemDownRow.style.left = MakePixelString(g_GR_Draggable_iSize + 10);

//    elemAcrossRow.style.width = MakePixelString(iWidthAcross); 
    elemAcrossRow.style.height = MakePixelString(iWidthAcross); 
    elemAcrossRow.style.left = MakePixelString(g_GR_Draggable_iSize + 10 + iWidthDown);
    elemAcrossRow.style.top = MakePixelString(g_GR_Draggable_iSize + 10);



// fill in and place the draggable words
    var elemSD = document.getElementById("Span_Draggable_Down")
    elemSD.innerHTML = TC_Place_Draggable_DownGridInDiv(sWordBeingPlaced);
    var elemPD = document.getElementById("Div_Draggable_Down");

    var elemSA = document.getElementById("Span_Draggable_Across")
    elemSA.innerHTML = TC_Place_Draggable_AcrossGridInDiv(sWordBeingPlaced);
    var elemPA = document.getElementById("Div_Draggable_Across");
//
    var sHintsHTML = ''
    sHintsHTML += '<DIV class="Place_Hints_Div" Id="Place_Hints_Div"><TABLE>'
    for ( i = 0; i < aHints.length; i++ )
    {
        var sThisHint = aHints[i];
        var sClass = 'class="Place_Hints_Errors" '
        if ( sThisHint.includes('No Warnings') )
            sClass = 'class="Place_Hints_NoErrors" '
        sHintsHTML += '<TR><TD ' + sClass + '>';
        sHintsHTML += sThisHint;
        sHintsHTML += '</TR></TD>';
    }
    sHintsHTML += '</TABLE></DIV>';
    var elemHints = document.getElementById("Place_Hints");
    elemHints.innerHTML = sHintsHTML;
// 
    var iSizeDraggable = sWordBeingPlaced.length * g_GR_Draggable_iSize + 2;
//
    var elemPopup = document.getElementById("Place");
// set the width
    var iWidthPopup = 10 + g_GR_Draggable_iSize + iSizeDraggable + 60 + 20;
    elemPopup.style.width = MakePixelString(iWidthPopup);
    var iHeightPopup = 10 + g_GR_Draggable_iSize + iSizeDraggable + 5;
    elemPopup.style.height = MakePixelString(iHeightPopup);
// move the button to a reasonable place
    var iButtonLeft = iWidthPopup - 65;
    document.getElementById('Place_CloseBox').style.left = MakePixelString(iButtonLeft);
// now the draggable words
    var s = iSizeDraggable.toString() + 'px';
    elemSA.style.width = s;
    elemPA.style.width = s;
    elemPA.style.left = MakePixelString(10 + g_GR_Draggable_iSize);

    elemSD.style.height = s;
    elemPD.style.height = s;
    elemPD.style.top = MakePixelString(10 + g_GR_Draggable_iSize);


// now we adjust positions
//    elemDownRow;
elemDownRow.left = MakePixelString(100 + g_GR_Draggable_iSize);
elemDownRow.top = MakePixelString(100 + g_GR_Draggable_iSize);
//    elemAcrossRow
//    elemHints
// first we move the x position of elemAcross row to computed right edge of the down elements
    var iPadding = 2;
    var rectDownRow = CA_Place_RelativeToPlacePopup_rect(elemDownRow);
    var iNewLeft = rectDownRow.left + 21 * g_TC_Place_Draggable_sDownLettersAllowed.length + iPadding;
    elemAcrossRow.style.left = MakePixelString(iNewLeft);



// now we move the hints to the same left and the top as the bottom of the new position of the across
    var rectAcrossRow = CA_Place_RelativeToPlacePopup_rect(elemAcrossRow);
    var elemHintsDiv = document.getElementById("Place_Hints_Div");
    elemHintsDiv.style.left = iNewLeft.toString() + "px";
    var iBottomOfAcrossRow = rectAcrossRow.top + 21 * g_TC_Place_Draggable_sAcrossRowsAllowed.length + 2*iPadding;

    elemHintsDiv.style.top = iBottomOfAcrossRow.toString() + "px";
// now we need to adjust the size of the  hints - right and bottom from the popup size
    var rectPopup = document.getElementById("Place").getBoundingClientRect();
    var iNewWidth = rectPopup.width - iNewLeft - 3 * iPadding;
    elemHintsDiv.style.width = iNewWidth.toString() + "px";
    var iNewHeight = rectPopup.height - iBottomOfAcrossRow - 3 * iPadding;
    elemHintsDiv.style.height = iNewHeight.toString() + "px"
//
    Place_Popup_Toggle();
}

function CA_Place_RelativeToPlacePopup_rect(elem)
{
    var rectElem = elem.getBoundingClientRect();
    var rectPopup = document.getElementById("Place").getBoundingClientRect();
    var iTop_R = rectElem.top - rectPopup.top;
    var iLeft_R = rectElem.left - rectPopup.left;
    var iWidth = rectElem.width;
    var iHeight = rectElem.height;
    var rect = new DOMRect(iLeft_R, iTop_R, iWidth, iHeight)
    return rect;
}

function CA_Place_Popup_Setup()
{
    var sPopupWindow = '';
    sPopupWindow += '<div width=250 height=200 id="Place_Popup_Window" class="Place_Popup Place_BackgroundColor">';
    sPopupWindow += '<span class="Place_Popup_Text Place_BackgroundColor" Id="Place">';
    sPopupWindow += '<SPAN Id="Span_Draggable_Across">Span_Draggable_Across</SPAN>';
    sPopupWindow += '<span Id="Span_Draggable_Down">Span_Draggable_Down</span>';
    sPopupWindow += '<BUTTON Id="Place_CloseBox" class="Place_CloseBox" onclick="Place_Popup_Toggle();">Quit</BUTTON>';
    sPopupWindow += '<SPAN Id="Place_Hints">HintsGoHere</SPAN>'
    sPopupWindow += '<SPAN Id="Place_DragInstruction" class="Place_DragInstruction">Drag To Grid</SPAN>';
    sPopupWindow += '<SPAN Id="Place_Down_Row_Controls" class="Place_Down_Row_Controls">fixme</SPAN>'
    sPopupWindow += '<SPAN Id="Place_Across_Row_Controls" class="Place_Across_Row_Controls">fixme</SPAN>'
    sPopupWindow += '</span>';
    sPopupWindow += '</div>';
    document.getElementById('Place_Popup_Locator').innerHTML = sPopupWindow;
}

function Place_Popup_Toggle()
{
    var popup = document.getElementById("Place");
    popup.classList.toggle("show");
    if ( !g_bPlaceWindow_Active )
    {
        g_Place_OnSet_CAB_Focus_sId = g_CAB_Focus_sId;
        g_Place_OnSet_GRB_Focus_sId = g_GRB_Focus_sId;
    }
    else
    {
        if ( g_Place_OnSet_CAB_Focus_sId != '')
            document.getElementById(g_Place_OnSet_CAB_Focus_sId).focus();
        if ( g_Place_OnSet_GRB_Focus_sId != '')
            document.getElementById(g_Place_OnSet_GRB_Focus_sId).focus();
        g_Place_OnSet_CAB_Focus_sId = '';
        g_Place_OnSet_GRB_Focus_sId = '';
    }

    g_bPlaceWindow_Active = !g_bPlaceWindow_Active;
}
