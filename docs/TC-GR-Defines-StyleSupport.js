// GR-Defines-StyleSupport.js 

var g_sGR_Class_Focus           = 'GR_Base GR_Color_Focus';
var g_sGR_Class_InActive        = 'GR_Base GR_Color_InActive GR_Status_Normal';
var g_sGR_Class_ActiveAnswer    = 'GR_Base GR_Color_Active';
var g_sGR_Class_BlackSquare     = 'GR_Base GR_Color_BlackSquare GR_Status_Normal';

var g_sGR_Class_Base                = 'GR_Base';
var g_sGR_Class_Color_Focus         = 'GR_Color_Focus';
var g_sGR_Class_Color_InActive      = 'GR_Color_InActive';
var g_sGR_Class_Color_Active        = 'GR_Color_Active';
var g_sGR_Class_Color_BlackSquare   = 'GR_Color_BlackSquare';

var g_sGR_Status_Normal           = 'GR_Status_Normal';
var g_sGR_Status_Incorrect        = 'GR_Status_Incorrect';
var g_sGR_Status_Corrected        = 'GR_Status_Corrected';
var g_sGR_Status_Correct          = 'GR_Status_Correct';

var g_sGR_Status_Normal_Image           = 'url("images/Button_Empty.png")';
var g_sGR_Status_Incorrect_Image        = 'url("images/Button_RedX.png")';
var g_sGR_Status_Corrected_Image        = 'url("images/Button_OrangeCorner.png")';
var g_sGR_Status_Correct_Image          = 'url("images/Button_Empty.png")';

var g_sGR_CodeMeaning_Normal        = 'N';
var g_sGR_CodeMeaning_Incorrect     = 'I';
var g_sGR_CodeMeaning_Corrected     = 'S';
var g_sGR_CodeMeaning_Correct       = 'C';

function GR_SetStatusToClass_FromCode(s, sClassName)
{
    if ( s == g_sGR_CodeMeaning_Normal) return GR_SetStatusToClass(g_sGR_Status_Normal, sClassName);
    if ( s == g_sGR_CodeMeaning_Incorrect) return GR_SetStatusToClass(g_sGR_Status_Incorrect, sClassName);
    if ( s == g_sGR_CodeMeaning_Corrected) return GR_SetStatusToClass(g_sGR_Status_Corrected, sClassName);
    if ( s == g_sGR_CodeMeaning_Correct) return GR_SetStatusToClass(g_sGR_Status_Correct, sClassName);
    return sClassName;
}

function GR_SetStatusToClass_Normal(sClassName){return GR_SetStatusToClass(g_sGR_Status_Normal, sClassName);}
function GR_SetStatusToClass_Incorrect(sClassName){return GR_SetStatusToClass(g_sGR_Status_Incorrect, sClassName);}
function GR_SetStatusToClass_Corrected(sClassName){return GR_SetStatusToClass(g_sGR_Status_Corrected, sClassName);}
function GR_SetStatusToClass_Correct(sClassName){return GR_SetStatusToClass(g_sGR_Status_Correct, sClassName);}

function GR_SetStatusToClass(sNewStatus, sClassName)
{
    var a = sClassName.split(' ');
    var iSize = a.length;
    var sResult = '';
    for ( iS = 0; iS < iSize; iS++ )
    {
        var sThisClass = a[iS];
        if ( sThisClass.indexOf('Status') == -1 )
        {
            sResult += a[iS] + ' ';
        }
    }
    sResult += sNewStatus;
    return sResult;
}

function GR_SetColorsToClass_Active(sClassName)
{
    var a = sClassName.split(' ');
    var iSize = a.length;
    var sResult = '';
    for ( iS = 0; iS < iSize; iS++ )
    {
        var sThisClass = a[iS];
        if ( sThisClass.indexOf('Color') == -1 )
        {
            sResult += a[iS] + ' ';
        }
    }
    sResult += 'GR_Color_Active';
    return sResult;
}

function GR_SetColorsToClass_InActive(sClassName)
{
    var a = sClassName.split(' ');
    var iSize = a.length;
    var sResult = '';
    for ( iS = 0; iS < iSize; iS++ )
    {
        var sThisClass = a[iS];
        if ( sThisClass.indexOf('Color') == -1 )
        {
            sResult += a[iS] + ' ';
        }
    }
    sResult += 'GR_Color_InActive';
    return sResult;
}

function GR_SetColorsToClass_Focus(sClassName)
{
    var a = sClassName.split(' ');
    var iSize = a.length;
    var sResult = '';
    for ( iS = 0; iS < iSize; iS++ )
    {
        var sThisClass = a[iS];
        if ( sThisClass.indexOf('Color') == -1 )
        {
            sResult += sThisClass + ' ';
        }
    }
    sResult += ' GR_Color_Focus';
    return sResult;
}
