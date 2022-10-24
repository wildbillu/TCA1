// TC-GeneralFunctions
// 
var sToDisplay = '';

var g_iScreen_Width = 800;
var g_iScreen_Height= 450;
function getResolution() 
{
g_iScreen_Width = Math.round(screen.width * window.devicePixelRatio);
g_iScreen_Height= Math.round(screen.height * window.devicePixelRatio);
}


function MakePixelString(i)
{
    var s = i.toString() + 'px';
    return s;
}

function RectAsString(sName, rect)
{
    var s = sName + ':' + rect.top + '|' + rect.left + '|' + rect.height + '|' + rect.width;
    return s;
}

function ScreenSizes() 
{
    setline('W:' + g_iScreen_Width + " H:" + g_iScreen_Height);
    g_iBody_Width = Math.round(document.body.getBoundingClientRect().width);
    g_iBody_Height= Math.round(document.body.getBoundingClientRect().height);
    setlineAdd(' Body.W:' + g_iBody_Width + " H:" + g_iBody_Height);
    g_iHTML_Width = Math.round(document.documentElement.getBoundingClientRect().width);
    g_iHTML_Height= Math.round(document.documentElement.getBoundingClientRect().height);
    setlineAdd(' HTML.W:' + g_iHTML_Width + " H:" + g_iHTML_Height);
}

function CharValidEntry(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_TC_cCharMeaningNotSet )
        return true;
    return false;
}

function IfCharNotSet(cLetter) 
{
    if ( cLetter != '' && cLetter !=' ' && cLetter != g_TC_cCharMeaningNotSet )
        return true;
    return false;
}

function setlineAdd(sAdd)
{
    if ( !g_bDisplayMessages)
        return;
    sToDisplay += sAdd;
    var elem = document.getElementById("Messages");
    if ( elem )
        elem.innerHTML = sToDisplay;
}

function setline(sAdd)
{
    if ( !g_bDisplayMessages)
        return;
    var elem = document.getElementById("Messages");
    if ( !elem )
        return;
    sToDisplay = sAdd;
    elem.innerHTML = sToDisplay;
}

function replaceAt(sOriginal, index, sReplacement) 
{
    var sNew = sOriginal.substring(0, index);
    sNew += sReplacement
    sNew += sOriginal.substring(index + sReplacement.length);
    return sNew;
}