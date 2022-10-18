// TC-Place-MouseMovable.js

var g_MM_elemMoving = null;
var g_MM_iElementStartLeft = 0;
var g_MM_iElementStartTop = 0;
var g_MM_iInitialX = 0;
var g_MM_iInitialY = 0;
var g_MM_iRowFound = -1;
var g_MM_iLetterFound = -1;
var g_MM_sWordToPlace = '';
var g_MM_sRowsAllowed = '';
var g_MM_sLettersAllowed = '';

function TC_Place_MouseMovable_MakeFunctionString_Across(sWordToPlace)
{
    var sMouseMovableInner = ' onmousedown="mouseDown(event, ';
    sMouseMovableInner += wrap('Div_Draggable_Across') + ', '
    sMouseMovableInner += wrap(sWordToPlace) + ', '
    sMouseMovableInner += wrap(g_TC_Place_Draggable_sAcrossRowsAllowed) + ', '
// since across we are going to allow no letters
    sMouseMovableInner += wrap('') + ');" '
    sMouseMovableInner += ' onmousemove="mouseMove(event);" onmouseUp="mouseUp(event);"';    
    return sMouseMovableInner;
}

function TC_Place_MouseMovable_MakeFunctionString_Down(sWordToPlace)
{
    var sMouseMovableInner = ' onmousedown="mouseDown(event, ';
    sMouseMovableInner += wrap('Div_Draggable_Down') + ', '
    sMouseMovableInner += wrap(sWordToPlace) + ', '
// since down we are going to allow no rows
    sMouseMovableInner += wrap('') + ', '
    sMouseMovableInner += wrap(g_TC_Place_Draggable_sDownLettersAllowed) + ');" '
    sMouseMovableInner += ' onmousemove="mouseMove(event);" onmouseUp="mouseUp(event);"';    
    return sMouseMovableInner;
}

function mouseDown(e, sId, sWord, sValidRows, sValidLetters)
{
    e.preventDefault();
    g_MM_sWordToPlace = sWord;
    g_MM_sRowsAllowed = sValidRows;
    g_MM_sLettersAllowed = sValidLetters;
    g_MM_elemMoving = document.getElementById(sId);
    g_MM_elemMoving.style.cursor="move";
    g_MM_iInitialX = Math.round(e.clientX);
    g_MM_iInitialY = Math.round(e.clientY);
    rect = g_MM_elemMoving.getBoundingClientRect();
    rectBox = document.getElementById("Place_Popup_Window").getBoundingClientRect();
    g_MM_iElementStartLeft = Math.round(rect.left) - Math.round(rectBox.left);
    g_MM_iElementStartTop = Math.round(rect.top) - Math.round(rectBox.top);
}

function mouseUp(ev)
{
    if ( g_MM_iRowFound != -1 && g_MM_iLetterFound != -1 )
    {
        if ( g_MM_sRowsAllowed != '' ) // must be across
            GRB_ForRowSetAnswerTo(g_MM_iRowFound, g_MM_sWordToPlace);
        else
            GRB_ForLetterSetAnswerTo(g_MM_iLetterFound, g_MM_sWordToPlace);
        Place_Popup_Toggle();
    }
    g_MM_elemMoving.style.left = g_MM_iElementStartLeft + 'px';
    g_MM_elemMoving.style.top = g_MM_iElementStartTop + 'px';
    g_MM_elemMoving = null;
    g_MM_iRowFound = -1;
    g_MM_iLetterFound = -1;
    g_MM_sWordToPlace = '';
    g_MM_sRowsAllowed = '';
    g_MM_sLettersAllowed = '';
    ev.preventDefault();
}

function mouseMove(e)
{
    if ( !g_MM_elemMoving )
        return;
    var x = Math.round(e.clientX);
    var y = Math.round(e.clientY);
    var xMoved = x - g_MM_iInitialX;
    var yMoved = y - g_MM_iInitialY;
    g_MM_elemMoving.style.position = "absolute";
    g_MM_elemMoving.style.left = (g_MM_iElementStartLeft + xMoved)  + 'px';
    g_MM_elemMoving.style.top =  (g_MM_iElementStartTop + yMoved) + 'px';
    rect = g_MM_elemMoving.getBoundingClientRect();
    a_elem = document.elementsFromPoint(rect.left, rect.top)
    var bFound = false;
    var iE = 0;
    while ( iE < a_elem.length && !bFound )
    {
        var sId = a_elem[iE].id;
        if ( sId.startsWith('GRBID_') )
        { // assumes across
            var iRow = GRB_RowFromId(sId)
            var iLetter = GRB_LetterFromId(sId)
            if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
            {
                var sRow = iRow.toString();
                var sLetter = iLetter.toString();
                if ( g_MM_sRowsAllowed != '' && g_MM_sRowsAllowed.includes(sRow) )
                {
                    g_GRB_bAcross = true;
                    GRB_MoveFocus(iRow, iLetter);
                    g_MM_iRowFound = iRow;
                    g_MM_iLetterFound = iLetter;
                    bFound = true;
                }
                if ( g_MM_sLettersAllowed != '' && g_MM_sLettersAllowed.includes(sLetter))
                {
                    g_GRB_bAcross = false;
                    GRB_MoveFocus(iRow, iLetter);
                    g_MM_iRowFound = iRow;
                    g_MM_iLetterFound = iLetter;
                    bFound = true;
                }
            }
        }
        iE++;
    }
    e.preventDefault();
}
