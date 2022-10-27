// TC-GRB-MovableSquare.js

var g_GRB_MM_elemMoving = null;
var g_GRB_MM_iElementStartLeft = 0;
var g_GRB_MM_iElementStartTop = 0;
var g_GRB_MM_iInitialX = 0;
var g_GRB_MM_iInitialY = 0;
var g_GRB_MM_iRowFound = -1;
var g_GRB_MM_iLetterFound = -1;
var g_GRB_MM_cLetterToMove = '';

function TC_GRB_MM_MakeFunctionString_Across(cLetterToMove)
{
    var sMMInner = ' onmousedown="mouseDown(event, ';
    sMMInner += wrap('Div_Draggable_Across') + ', '
    sMouseMovableInner += wrap(cLetterToMove) + ', '
    sMouseMovableInner += wrap(g_TC_Place_Draggable_sAcrossRowsAllowed) + ', '
// since across we are going to allow no letters
    sMouseMovableInner += wrap('') + ');" '
    sMouseMovableInner += ' onmousemove="mouseMove(event);" onmouseUp="mouseUp(event);"';    
    return sMouseMovableInner;
}
