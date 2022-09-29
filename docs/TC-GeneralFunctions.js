// TC-GeneralFunctions
// 
var sToDisplay = '';

function MakeInputNotReadOnly(sId)
{
    var elem = document.getElementById(sId);
    var sInner = elem.innerHTML;
    var iReadonly = sInner.indexOf("readonly");
    if ( iReadonly == -1 ) // not readonly
        return;
    sInner = sInner.replace('readonly=""', '');
    sInner = sInner.replace('readonly', '');
    elem.innerHTML = sInner;
}

function MakeInputReadOnlyForceValue(sId, sForceLetter)
{
    var elem = document.getElementById(sId);
    var sInner = elem.innerHTML;
// if it is already read only dont do this
    var iReadonly = sInner.indexOf("readonly");
    if ( iReadonly != -1 )
        return;
    var iValue = sInner.indexOf("value=");
    if ( iValue != -1 )
        sInner = replaceAt(sInner, iValue+6, '"' + sForceLetter + '" ');
    sInner = sInner.replace(">", " readonly>");
    elem.innerHTML = sInner;
}

function setlineAdd(sAdd)
{
    if ( !g_bDisplayMessages)
        return;
    sToDisplay += sAdd;
    document.getElementById("Messages").innerHTML = sToDisplay;
}

function setline(sAdd)
{
    if ( !g_bDisplayMessages)
        return;
    sToDisplay = sAdd;
    document.getElementById("Messages").innerHTML = sToDisplay;
}

function replaceAt(sOriginal, index, sReplacement) 
{
    var sNew = sOriginal.substring(0, index);
    sNew += sReplacement
    sNew += sOriginal.substring(index + sReplacement.length);
    return sNew;
}