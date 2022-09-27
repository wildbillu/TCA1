// TC-Settings-Setup.js
//
var g_bButton_Settings_Active = false;

function MakeCheckBox(bChecked, sid, stitle )
{
    var sChecked = ''
    if ( bChecked )
        sChecked = ' checked ';
    var sCheckBox = ''
    sCheckBox += '      <TR align=center><TD>'
    sCheckBox += '          <TABLE class="Settings_TableBorder" width="90%"><TR> <TD width="95%" class="Settings_CheckBoxRowTitle">' + stitle + '</TD><TD width="5%" class="RowBox"><INPUT type="checkbox" ' + sChecked +' class="Settings_CheckBox" Id="' + sid + '" onclick="Button_Settings_GetAllAndSaveCookie();"></TD></TR></TABLE>';
    sCheckBox += '      </TD></TR>'
    return sCheckBox;
}

function MakeSubTitleRow(sSubTitle)
{
    var sTitleRow = '';
    sTitleRow += '      <TR align=center><TD>'
    sTitleRow += '          <TABLE class="Settings_TableBorder Settings_Center" width="90%"><TR class="Settings_Center" align=center > <TD width="100%" class="Settings_SubtitleRow">' + sSubTitle + '</TD></TR></TABLE>';
    sTitleRow += '      </TD></TR>'
    return sTitleRow;
}

function Load_Button_Settings_Popup()
{
    var sPopupWindow = '';

    sPopupWindow += '<div width="100%" id="Button_Settings_Div" class="Settings_Popup Settings_BackgroundColor">';
    sPopupWindow += '<span width="100%" class="Settings_Popup_Text Settings_BackgroundColor" Id="Button_Settings">';
sPopupWindow += '<div class=Settings_DivBorder>';     
sPopupWindow += '<TABLE class="Settings_TableBorder" width="100%">'
sPopupWindow += '      <TR class="Settings_CloseBoxRow"><TD>'
sPopupWindow += '          <TABLE width="100%"><TR><TD width="95%" class="Settings_CloseBoxRow">Settings</TD><TD width="5%"><BUTTON Id="Settings_CloseBox" class="Settings_CloseBox" onclick="Button_Settings_Toggle();">Done</TD></TR></TABLE>';
sPopupWindow += '      </TD></TR>'
sPopupWindow += MakeSubTitleRow('Check and Show Correct Items')
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_CheckRow, 'CAGR_Answers_CheckRow', 'Check each answer and mark when correct');
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_ShowCorrectLetters, 'CAGR_Answers_ShowCorrectLetters', 'Mark each square when correct');
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_CheckOverall, 'CAGR_Answers_CheckOverall', 'Check Grid and Clue Answers and signal correct');
sPopupWindow += MakeSubTitleRow('Actions On Add Letter')
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares, 'CAGR_Navigation_WithinWord_SkipFilledSquares', 'Skip Filled Squares')
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare, 'CAGR_Navigation_EndOfWord_JumpBackToEmptySquare', 'Jump to empty square at end of word')
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue, 'CAGR_Navigation_EndOfWord_JumpToNextClue', 'Jump to next word at completed word')
sPopupWindow += MakeSubTitleRow('Progress Indicators')
sPopupWindow += MakeCheckBox(g_bSettings_CA_Display_ShowProgress, 'CA_Display_ShowProgress', 'Show progress for clue answers')
sPopupWindow += MakeCheckBox(g_bSettings_GR_Display_ShowProgress, 'GR_Display_ShowProgress', 'Show progress for grid answers')
sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Display_Complete, 'CAGR_Display_Complete', 'Show Puzzle (grid and clue answers) Solved')
sPopupWindow += '</TABLE>'
sPopupWindow += '</div>';
sPopupWindow += '</span>';
    sPopupWindow += '</div>';
    document.getElementById('Popup_Button_Settings').innerHTML = sPopupWindow;
}

function Button_Settings_GetAllAndSaveCookie()
{
    g_bSettings_CAGR_Answers_CheckRow = document.getElementById('CAGR_Answers_CheckRow').checked;
    g_bSettings_CAGR_Answers_CheckOverall = document.getElementById('CAGR_Answers_CheckOverall').checked;
    g_bSettings_CAGR_Answers_ShowCorrectLetters = document.getElementById('CAGR_Answers_ShowCorrectLetters').checked;
    g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = document.getElementById('CAGR_Navigation_WithinWord_SkipFilledSquares').checked;
    g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = document.getElementById('CAGR_Navigation_EndOfWord_JumpBackToEmptySquare').checked;
    g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = document.getElementById('CAGR_Navigation_EndOfWord_JumpToNextClue').checked;
    g_bSettings_CA_Display_ShowProgress = document.getElementById('CA_Display_ShowProgress').checked;
    g_bSettings_GR_Display_ShowProgress = document.getElementById('GR_Display_ShowProgress').checked;
    g_bSettings_CAGR_Display_Complete = document.getElementById('CAGR_Display_Complete').checked;
    StoreCookie_Settings();
}

var g_sCAOnSettingsClick = '';
var g_sGROnSettingsClick = '';


function Button_Settings_Toggle()
{
    var popup = document.getElementById("Button_Settings");
    popup.classList.toggle("show");
    if ( !g_bButton_Settings_Active )
    {
        g_sCAOnInfoClick = g_sCAidWithFocus;
        g_sGROnInfoClick = g_GR_sFocus;
    }
    else
    {
        if ( g_sCAOnInfoClick != '')
            document.getElementById(g_sCAOnInfoClick).focus();
        if ( g_sGROnInfoClick != '')
            document.getElementById(g_sGROnInfoClick).focus();
        g_sCAOnInfoClick = '';
        g_sGROnInfoClick = '';
    }
    g_bButton_Settings_Active = !g_bButton_Settings_Active;
}


