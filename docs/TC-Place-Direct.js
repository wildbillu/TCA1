// TC=Place.js
var g_Place_bDirectPlaceSupport = false;
var g_Place_bPopupPlaceSupport = true;

var g_Place_Direct_bMouseDown = false;
var g_Place_Direct_MM_elemMoving = null;
var g_Place_Direct_MM_sWord = '';
var g_Place_Direct_MM_bAcross = false;
var g_Place_Direct_MM_Mouse_iInitialX = 0;
var g_Place_Direct_MM_Mouse_iInitialY = 0;
var g_Place_Direct_MM_elem_iInitialX = 0;
var g_Place_Direct_MM_elem_iInitialY = 0;

var g_Place_Direct_MM_Found_sId = '';

function TC_Place_Direct_mouseUp(e)
{
    e.preventDefault();
    if ( !g_Place_Direct_bMouseDown )
        return;
    if ( g_Place_Direct_MM_Found_sId != '' )
    { // so iD is valid     
        if ( g_Place_Direct_MM_bAcross )
        {
            var iRowFound = GRB_RowFromId(g_Place_Direct_MM_Found_sId);
            GRB_ForRowSetAnswerTo(iRowFound, g_Place_Direct_MM_sWord);
        }
        else
        {
            var iLetterFound = GRB_LetterFromId(g_Place_Direct_MM_Found_sId);
            GRB_ForLetterSetAnswerTo(iLetterFound, g_Place_Direct_MM_sWord);
        }
    }
// we need to get rid of the item
    elemSA = document.getElementById("Div_Place_Direct_Across");
    elemSA.innerHTML = '';
    g_Place_Direct_bMouseDown = false;
    g_Place_Direct_MM_Found_sId = '';

    return;
}

function TC_Place_Direct_mouseMove(e)
{
    e.preventDefault();
    if ( !g_Place_Direct_bMouseDown )
        return;
    var x = Math.round(e.clientX);
    var y = Math.round(e.clientY);
    var xMoved = x - g_Place_Direct_MM_Mouse_iInitialX;
    var yMoved = y - g_Place_Direct_MM_Mouse_iInitialY;
    g_Place_Direct_MM_elemMoving.style.position = "absolute";
//
    g_Place_Direct_MM_elemMoving.style.left = (g_Place_Direct_MM_elem_iInitialX + xMoved)  + 'px';
    g_Place_Direct_MM_elemMoving.style.top =  (g_Place_Direct_MM_elem_iInitialY + yMoved) + 'px';
    rect = g_Place_Direct_MM_elemMoving.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sIdCandidate = a_elem[iE].id;
        if ( sIdCandidate.startsWith('GRBID_') )
        { // assumes across
            bFound = true;
            if ( g_Place_Direct_MM_bAcross )
            {
                TC_Place_Direct_HandleFind_Across(sIdCandidate);
            }
            else
            {
                 TC_Place_Direct_HandleFind_Down(sIdCandidate);
            }
        }
        iE++;
    }
}

function TC_Place_Direct_HandleFind_Across(sIdCandidate)
{
    if ( sIdCandidate == g_Place_Direct_MM_Found_sId )
        return; // nothing to do
        var iRow = GRB_RowFromId(sIdCandidate);
    var iLetter = GRB_LetterFromId(sIdCandidate)
    var bValidRow = false;
    if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
    {
        var iLengthAnswer = GRB_ForRow_GetAnswerLength(iRow);
        if ( g_Place_Direct_MM_sWord.length == iLengthAnswer )
            bValidRow = true;
    }
// if there is an old location we need to make it inactive (might be in our row, but not our active character)
    if ( g_Place_Direct_MM_Found_sId != '')
    {
        var iRow_Old = GRB_RowFromId(g_Place_Direct_MM_Found_sId);
        setlineAdd('E:' + iRow_Old)
        GRB_ForRow_SetToInactive(iRow_Old);
    }
    if ( bValidRow )
    {
        var iLetter = GRB_LetterFromId(sIdCandidate)
        GRB_ForRow_SetToActive(iRow, iLetter)
        g_Place_Direct_MM_Found_sId = sIdCandidate;
    }
    else
    {
        g_Place_Direct_MM_Found_sId='';
    }
}

function TC_Place_Direct_HandleFind_Down(sIdCandidate)
{
    if ( sIdCandidate == g_Place_Direct_MM_Found_sId )
        return; // nothing to do
    var iRow = GRB_RowFromId(sIdCandidate);
    var iLetter = GRB_LetterFromId(sIdCandidate)
    var bValidRow = false;
    if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
    {
        var iLengthAnswer = GRB_ForLetter_GetAnswerLength(iLetter);
        if ( g_Place_Direct_MM_sWord.length == iLengthAnswer )
            bValidRow = true;
    }
// if there is an old location we need to make it inactive (might be in our row, but not our active character)
    if ( g_Place_Direct_MM_Found_sId != '')
    {
        var iLetter_Old = GRB_LetterFromId(g_Place_Direct_MM_Found_sId);
        GRB_ForLetter_SetToInactive(iLetter_Old);
    }
    if ( bValidRow )
    {
        var iRowValid = GRB_RowFromId(sIdCandidate)
        var iLetterValid = GRB_LetterFromId(sIdCandidate)
        GRB_ForLetter_SetToActive(iRowValid, iLetterValid)
        g_Place_Direct_MM_Found_sId = sIdCandidate;
    }
    else
    {
        g_Place_Direct_MM_Found_sId='';
    }
}

function TC_Place_Direct_mouseDown(e, sId, sWord, sAcross)
{
    e.preventDefault();
    g_Place_Direct_MM_elemMoving = document.getElementById(sId);
    g_Place_Direct_MM_sWord = sWord;
    g_Place_Direct_MM_bAcross = false;
    if ( sAcross == 'true')
        g_Place_Direct_MM_bAcross = true;
    g_Place_Direct_MM_Mouse_iInitialX = Math.round(e.clientX);
    g_Place_Direct_MM_Mouse_iInitialY = Math.round(e.clientY);
    g_Place_Direct_MM_elemMoving.style.cursor="move";
    g_Place_Direct_bMouseDown = true;
    rect = g_Place_Direct_MM_elemMoving.getBoundingClientRect();
    g_Place_Direct_MM_elem_iInitialX = rect.left;
    g_Place_Direct_MM_elem_iInitialY = rect.top;
}

function TC_Place_Direct_MouseMovable_MakeFunctionString_Down(sWordToPlace)
{
    var sTouchMovableInner = ' onmouseDown="TC_Place_Direct_mouseDown(event, ';
    sTouchMovableInner += wrap('Div_Place_Direct_Across_Inner') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', \'false\');" '
    sTouchMovableInner += ' onmousemove="TC_Place_Direct_mouseMove(event);" onmouseUp="TC_Place_Direct_mouseUp(event);"';    
    return sTouchMovableInner;
}

function TC_Place_Direct_MouseMovable_MakeFunctionString_Across(sWordToPlace)
{
    var sTouchMovableInner = ' onmouseDown="TC_Place_Direct_mouseDown(event, ';
    sTouchMovableInner += wrap('Div_Place_Direct_Across_Inner') + ', '
    sTouchMovableInner += wrap(sWordToPlace) + ', \'true\');" '
    sTouchMovableInner += ' onmousemove="TC_Place_Direct_mouseMove(event);" onmouseUp="TC_Place_Direct_mouseUp(event);"';    
    return sTouchMovableInner;
}

function TC_Place_Direct_MakeButtons(sWordToPlace, bAcross)
{ // a div with buttons with letters etc
    var sTouchMovableInner = '';//TC_Place_Direct_TouchMovable_MakeFunctionString_Across(sWordToPlace);
    var sMouseMovableInner = '';
    if ( bAcross )
        sMouseMovableInner = TC_Place_Direct_MouseMovable_MakeFunctionString_Across(sWordToPlace);
    else        
        sMouseMovableInner = TC_Place_Direct_MouseMovable_MakeFunctionString_Down(sWordToPlace);

    var sInner = '';
    sInner += '<DIV class="'
    sInner += g_GR_Draggable_Div_Across_sClass;
    sInner += '" Id="Div_Place_Direct_Across_Inner" ' + sMouseMovableInner + sTouchMovableInner + '>';
    for ( var iL = 0; iL < sWordToPlace.length; iL++ )
    {
        var cLetter = sWordToPlace.charAt(iL);
        var sBackgroundImage = TC_Place_Draggable_BackgroundImage(cLetter);
        sInner += '<BUTTON class="'
        sInner += g_GR_Draggable_sClass + '" ';
        sInner += ' style="background-image:' + sBackgroundImage + '">';
        sInner += '</BUTTON>';
    }
    sInner += '</DIV>';
    return sInner;
 }
 
function TC_Place_Direct_Across(iRow)
{
    var elemSA = document.getElementById("Div_Place_Direct_Across");
    var sWordBeingPlaced = CAB_ForRow_GetPlayerAnswer(iRow);
    var sPlaceinnerHTML = TC_Place_Direct_MakeButtons(sWordBeingPlaced, true);
    elemSA.innerHTML = sPlaceinnerHTML;
    var elemInner = document.getElementById("Div_Place_Direct_Across_Inner");
    elemInner.style.width = g_GR_Draggable_iSize * sWordBeingPlaced.length;
// find the bottom of the grid
    var sId='GRB_Div' + (g_iGridHeight-1);
    var rectGrid = document.getElementById(sId).getBoundingClientRect();
    elemInner.style.top = MakePixelString(rectGrid.bottom);
    elemInner.style.left = MakePixelString(rectGrid.right);
}

function TC_Place_Direct_Down(iRow)
{
    var elemSA = document.getElementById("Div_Place_Direct_Across");
    var sWordBeingPlaced = CAB_ForRow_GetPlayerAnswer(iRow);
    var sPlaceinnerHTML = TC_Place_Direct_MakeButtons(sWordBeingPlaced, false);
    elemSA.innerHTML = sPlaceinnerHTML;
    var elemInner = document.getElementById("Div_Place_Direct_Across_Inner");
    elemInner.style.width = g_GR_Draggable_iSize;
    elemInner.style.height = g_GR_Draggable_iSize * sWordBeingPlaced.length;
// find the bottom of the grid
    var sId='GRB_Div' + (g_iGridHeight-1);
    var rectGrid = document.getElementById(sId).getBoundingClientRect();
    elemInner.style.top = MakePixelString(rectGrid.bottom);
    elemInner.style.left = MakePixelString(rectGrid.right);
}

function TC_Place_Direct_Buttons(iRow)
{
    var sButton = '';
    sButton += '<BUTTON class="CA_Place_Across_Button" onclick="return TC_Place_Direct_Across(' + iRow + ')"></BUTTON>'
    sButton += '<BUTTON class="CA_Place_Down_Button"   onclick="return TC_Place_Direct_Down(' + iRow + ')"></BUTTON>'
    return sButton;
}

