// misc.js

function LoadValues()
{
    getResolution(); 
    var g_bLocal = false;
    if (window.location.protocol === "file:")
       g_bLocal = true;
    HandleCookiesOnStart();
    var bLoadedFromFile = false;
    if ( !g_bLocal )
    {   
        bLoadedFromFile = LoadPuzzleFromFile();
    }
    if ( !bLoadedFromFile )
        TC_Puzzle_Load_AsJS();
//
    if ( g_iGridWidth == 4 )
    {
        g_GR_Grid_iSize = 50;
        g_GR_Grid_sClass = 'GRB_Base_50';
        g_GR_Grid_Div_sClass = 'GRB_Div_50'
        g_GR_Draggable_iSize = 50;
        g_GR_Draggable_sClass = 'GRB_Base_50';
        g_GR_Draggable_Div_Across_sClass = 'Place_Draggable_Across_50'
        g_GR_Draggable_Div_Down_sClass = 'Place_Draggable_Down_50'
//
        g_CAB_Button_iSize = 50;
        g_CAB_Button_sClass = 'CAB_Base_50';
        g_CAB_Button_Div_sClass = 'CAB_Div_50'
    }
    else
    {
        g_GR_Grid_iSize = 40;
        g_GR_Grid_sClass = 'GRB_Base_40';
        g_GR_Grid_Div_sClass = 'GRB_Div_40'
        g_GR_Draggable_iSize = 40;
        g_GR_Draggable_sClass = 'GRB_Base_40';
        g_GR_Draggable_Div_Across_sClass = 'Place_Draggable_Across_40'
        g_GR_Draggable_Div_Down_sClass = 'Place_Draggable_Down_40'
//
        g_CAB_Button_iSize = 40;
        g_CAB_Button_sClass = 'CAB_Base_40';
        g_CAB_Button_Div_sClass = 'CAB_Div_40'
    }
    MakeItAll();
    TopRowButtons_Setup();
    LoadInnerHTML();
    Status_Check();
    SetInitialSelection();
    if ( g_bSettings_ShowInfoOnStart )
    {
        Button_Info_Click();
        g_bSettings_ShowInfoOnStart = false;    
        StoreCookie_Settings();
    }


}

function MakeItAll()
{
    var sAllOfIt = '';
    sAllOfIt += '<DIV Id="TopRowControl" class="TopRowControlClass">This Row for Controls</DIV>';
    sAllOfIt += '<TABLE Id="AllTable" width=450 height=800 BGCOLOR="#FFFFFF" border=0 cellspacing=0 cellpadding=0>';
    sAllOfIt += '<TR class="NewTitle_S"><TD Id="TCT" class="NewTitle_S">TwistiCross(TM) with SketchiToons® by Sketchi Bill</TD></TR>';
    sAllOfIt += '<TR height=4% width=100%><TD>';
    sAllOfIt += '<TABLE height="100%" width="100%" padding="0" cellspacing="0">';
    sAllOfIt += '<TR height="100%">';
    sAllOfIt += '<TD width="5%" class="TopRowControlClass_StatusIndicators_S" bgcolor=#FFFFFF>Progress&nbsp&nbsp</TD>';
    sAllOfIt += '<TD width="25%" class="TopRowControlClass_StatusIndicators"><div Id="Status_GR" class="TopRowControlClass_StatusIndicators_DivForBorder">0 of 8</div></TD>';
    sAllOfIt += '<TD width="25%" class="TopRowControlClass_StatusIndicators"><div Id="Status_CA" class="TopRowControlClass_StatusIndicators_DivForBorder">0 0f 8</div></TD>';
    sAllOfIt += '<TD width="45%">&nbsp;</TD>';
    sAllOfIt += '</TR>';
    sAllOfIt += '</TABLE>';
    sAllOfIt += '</TD></TR>';
    sAllOfIt += '<TR><TD Id="PT"     class="NewTitle">PuzzleTitle</TD></TR>';
    sAllOfIt += '<TR><TD bgcolor="#FFFFFF" Id="Popup_SketchiToonsFull" height=0 align=center></TD></TR>';
    sAllOfIt += '<TR><TD bgcolor="#FFFFFF" Id="Popup_Button_Settings" height=0 align=center></TD></TR>';
    sAllOfIt += '<TR><TD bgcolor="#FFFFFF" Id="Popup_Button_More" height=0 align=left></TD></TR>';
    sAllOfIt += '<TR><TD bgcolor="#FFFFFF" Id="Popup_SuccessWindow" height=0 align=center></TD></TR>';
    sAllOfIt += '<TR ><TD>';
    sAllOfIt += '<TABLE border=0 cellspacing=0 width="100%">';
    sAllOfIt += '<TR valign=center>';
    sAllOfIt += '<TD Id="GRB_GridRows" align=center valign=center width=250px>';
    sAllOfIt += '</TD>';
    sAllOfIt += '<TD align=center width=50% Id="TwistiCrossImage"></TD>';
    sAllOfIt += '</TR>';
    sAllOfIt += '</TABLE>';
    sAllOfIt += '</TD></TR>';
    sAllOfIt += '<TR><TD Id="CA01CI" align=center class="CAB_Row_DualClue_S CA_Color_InActive" >Intro</TD></TR>';
    sAllOfIt += '<TR><TD Id="CA01C"  align=center class="CAB_Row_DualClue CA_Color_InActive" >ClueItself</TD></TR>';
    sAllOfIt += '<TR cellspacing=1 cellpadding=0 Id="CA_01_R" align=center  class="CAB_Row_DualClue CA_Color_InActive" width="100%"><TD align="center" Id="CA_01">IIIIII</TD></TR>';
// now the rows
    var iLastRow = g_aClues.length;
    for ( iR = 2; iR < iLastRow; iR++ )
        sAllOfIt += CAB_MakeRowEntry2toN(iR);
// now the end
    sAllOfIt += '<DIV Id="CA_ROWS_2_N"></DIV>';
    sAllOfIt += '<TR width=100%><TD Id="CA_2ToN"></TD></TR>';
    sAllOfIt += '<TR class="KB_Area"><TD id=KB name=KB>notset</TD></TR>';
    sAllOfIt += '<TR><TD Id="Popup_Button_Info" height=0 align=center></TD></TR>';
    sAllOfIt += '</TABLE>';
    sAllOfIt += '<DIV Id="Messages"></DIV>';
    if ( g_Place_bDirectPlaceSupport )    
    {
        sAllOfIt += '<Div Id="Div_Place_Direct_Across" class="Div_Place_Direct_Across">Div_Place_Direct_Across</Div>';
        sAllOfIt += '<Div Id="Div_Place_Direct_Down"   class="Div_Place_Direct_Down">  Div_Place_Direct_Down</Div>';    
    }
    document.getElementById("AllOfIt").innerHTML=sAllOfIt;
}

function SetInitialSelection()
{
    var elem = document.getElementById(CAB_MakeId(0,0));
    CAB_onfocus(elem);
}


function LoadInnerHTML()
{
	LoadTwistiCrossAndPopup();
	LoadSuccessWindowPopup();	
	document.getElementById('PT').innerHTML = g_sPuzzleTitle;
	document.getElementById('CA01CI').innerHTML = g_ST_sClue_Intro;
	document.getElementById('CA01C').innerHTML = g_ST_sClue_Itself;
	GRB_MakeGridAsButtons();
	CAB_LoadClueAnswerSection();
	KB_Set_innerHTML();
	CA_Place_Popup_Setup();
}



