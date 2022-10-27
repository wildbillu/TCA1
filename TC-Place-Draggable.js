 // TC-Place-Draggable.js
var g_TC_Place_Draggable_bActive = false;
var g_TC_Place_Draggable_sWordToPlace = '';
var g_TC_Place_Draggable_bPlaceAcross = true;
var g_TC_Place_Draggable_sAcrossRowsAllowed = '';
var g_TC_Place_Draggable_sDownLettersAllowed = '';

 function TC_Place_Draggable_BackgroundImage(cLetter)
 {
     var sStatusImage = '';
     sStatusImage  += "url('" + g_sImagePath_General + "Button_Frame.png')";
     if ( CharValidEntry(cLetter) )
     {
         var sLetterImage = g_sImagePath_Letters + 'L_' + cLetter + '_N.png';
         if ( sStatusImage != '' )
             sStatusImage += ', '
         sStatusImage += "url('" + sLetterImage + "')";
     }
     if ( sStatusImage != '' )
         sStatusImage += ', '
    sStatusImage += "url('" + g_sImagePath_General + "Button_Inactive.png')";
    return sStatusImage;
 }

 function TC_Place_AllowDrop(ev, iRow, iLetter)
 {
    if ( !g_TC_Place_Draggable_bActive )
        return;
    if ( g_TC_Place_Draggable_bPlaceAcross )
    {
        var sRow = iRow.toString();
        if ( !g_TC_Place_Draggable_sAcrossRowsAllowed.includes(sRow) )
            return;
        ev.preventDefault();
        return;
    }
    var sLetter = iLetter.toString();
    if ( !g_TC_Place_Draggable_sDownLettersAllowed.includes(sLetter) )    
        return;
    ev.preventDefault();
}
 
function TC_Place_Drop(ev, iRow, iLetter)
{
    if ( !g_TC_Place_Draggable_bActive )
        return;
    if ( g_TC_Place_Draggable_bPlaceAcross )
    { //  shouldn't get here unless can change, but....
        var sRow = iRow.toString();
        if ( !g_TC_Place_Draggable_sAcrossRowsAllowed.includes(sRow) )
            return;
            GRB_ForRowSetAnswerTo(iRow, g_TC_Place_Draggable_sWordToPlace);
            ev.preventDefault();
        return;
    }
//  shouldn't get here unless can change, but....
    var sLetter = iLetter.toString();
    if ( !g_TC_Place_Draggable_sDownLettersAllowed.includes(sLetter) )    
        return;
    GRB_ForLetterSetAnswerTo(iLetter, g_TC_Place_Draggable_sWordToPlace);
}
 
function TC_PlaceDrag_H_Start(ev, sWordToPlace)
{
    g_TC_Place_Draggable_bActive = true;
    g_TC_Place_Draggable_sWordToPlace = sWordToPlace;
    g_TC_Place_Draggable_bPlaceAcross = true;
}

function TC_PlaceDrag_D_Start(ev, sWordToPlace)
{
    g_TC_Place_Draggable_bActive = true;
    g_TC_Place_Draggable_sWordToPlace = sWordToPlace;
    g_TC_Place_Draggable_bPlaceAcross = false;
}

function ReturnFalse(e)
{
    e.preventDefault();
    return false;
}

function wrap(s)
{
    var sWrapped = '\'' + s + '\'';
    return sWrapped;
}

// Draggable version that works for desktop without touch capability
function TC_Place_Draggable_AcrossGridInDiv(sWordToPlace)
{ // a div with buttons with letters etc
    var sDraggableInner = ' draggable="false" ondragstart="TC_PlaceDrag_H_Start(event, \'' + sWordToPlace + '\');" ';
    var sTouchMovableInner = TC_Place_TouchMovable_MakeFunctionString_Across(sWordToPlace);
    var sMouseMovableInner = TC_Place_MouseMovable_MakeFunctionString_Across(sWordToPlace);
    var sInner = '';
    sInner += '<DIV class="'
    sInner += g_GR_Draggable_Div_Across_sClass;
    sInner += '" Id="Div_Draggable_Across" ' + sDraggableInner + sMouseMovableInner + sTouchMovableInner + '>';
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

 function TC_Place_Draggable_DownGridInDiv(sWordToPlace)
{ // a div with buttons with letters etc
    var sInner = '';
    var sDraggableInner = ' draggable="false" ondragstart="TC_PlaceDrag_D_Start(event, \'' + sWordToPlace + '\');" ';
    var sTouchMovableInner = TC_Place_TouchMovable_MakeFunctionString_Down(sWordToPlace);
    var sMouseMovableInner = TC_Place_MouseMovable_MakeFunctionString_Down(sWordToPlace);

    sInner += '<DIV class="'
    sInner += g_GR_Draggable_Div_Down_sClass;
    sInner += '" Id="Div_Draggable_Down" ' + sDraggableInner + sTouchMovableInner + sMouseMovableInner + '>';
    sInner += '<TABLE CELLSPACING=0 cellpadding=0 padding=0 margin=0 border=0>'
    for ( var iL = 0; iL < sWordToPlace.length; iL++ )
    {
        var cLetter = sWordToPlace.charAt(iL);
        var sBackgroundImage = TC_Place_Draggable_BackgroundImage(cLetter);
        sInner += '<TR padding=0 margin=0 border=0><TD padding=0 margin=0 border=0><BUTTON class="';
        sInner += g_GR_Draggable_sClass + '" ';
        sInner += 'style="background-image:' + sBackgroundImage + '"></BUTTON></TD></TR>';
    }
    sInner += '</TABLE>'
    sInner += '</DIV>';
    return sInner;
}

