// Defines-CA-StyleSupport.js 

var g_sCA_Class_Base            = 'CA_Base';
var g_sCA_Class_Color_Focus     = 'CA_Color_Focus';
var g_sCA_Class_Color_InActive  = 'CA_Color_InActive';
var g_sCA_Class_Color_Active    = 'CA_Color_Active';

var g_sCA_Class_Focus           = 'CA_Base CA_Color_Focus';
var g_sCA_Class_InActive        = 'CA_Base CA_Color_InActive CA_Status_Normal';
var g_sCA_Class_ActiveAnswer    = 'CA_Base CA_Color_Active';

var g_sCA_Status_Normal           = 'CA_Status_Normal';
var g_sCA_Status_Incorrect        = 'CA_Status_Incorrect';
var g_sCA_Status_Corrected        = 'CA_Status_Corrected';
var g_sCA_Status_Correct          = 'CA_Status_Correct';

var g_sCA_CodeMeaning_Normal        = 'N';
var g_sCA_CodeMeaning_Incorrect     = 'I';
var g_sCA_CodeMeaning_Corrected     = 'S';
var g_sCA_CodeMeaning_Correct       = 'C';


function CA_SetStatusToClass_FromCode(s, sClassName)
{
    if ( s == g_sCA_CodeMeaning_Normal) return CA_SetStatusToClass(g_sCA_Status_Normal, sClassName);
    if ( s == g_sCA_CodeMeaning_Incorrect) return CA_SetStatusToClass(g_sCA_Status_Incorrect, sClassName);
    if ( s == g_sCA_CodeMeaning_Corrected) return CA_SetStatusToClass(g_sCA_Status_Corrected, sClassName);
    if ( s == g_sCA_CodeMeaning_Correct) return CA_SetStatusToClass(g_sCA_Status_Correct, sClassName);
    return sClassName;
}

function CA_SetStatusToClass_Normal(sClassName){return CA_SetStatusToClass(g_sCA_Status_Normal, sClassName);}
function CA_SetStatusToClass_Incorrect(sClassName){return CA_SetStatusToClass(g_sCA_Status_Incorrect, sClassName);}
function CA_SetStatusToClass_Corrected(sClassName){return CA_SetStatusToClass(g_sCA_Status_Corrected, sClassName);}
function CA_SetStatusToClass_Correct(sClassName){return CA_SetStatusToClass(g_sCA_Status_Correct, sClassName);}

function CA_SetStatusToClass(sNewStatus, sClassName)
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


function CA_SetColorsToClass_Active(sClassName)
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
    sResult += ' CA_Color_Active';
    return sResult;
}

function CA_SetColorsToClass_InActive(sClassName)
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
    sResult += ' CA_Color_InActive';
    return sResult;
}

function CA_SetColorsToClass_Focus(sClassName)
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
    sResult += ' CA_Color_Focus';
    return sResult;
}
