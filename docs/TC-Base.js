// misc.js
// 
// this function allows for closing popup style windows
window.onclick = function(event) 
{
	var sTargetId = event.target.id;
	if ( g_bButton_Info_Active && ( sTargetId != "Button_Info_Image") )
	{
    	dropdown = document.getElementById('Button_Info');
    	dropdown.classList.toggle('show'); 
		g_bButton_Info_Active= false;
	}
/*
	if ( g_bButton_Settings_Active && (sTargetId != "Button_Settings_Image") )
	{
		var popup = document.getElementById("Button_Settings");
		popup.classList.toggle("show");
		g_bButton_Settings_Active = !g_bButton_Settings_Active;
	}
*/	
	if ( g_bDropdown_Menu_Active && ( sTargetId != "Button_More_Image") )
	{
    	dropdown = document.getElementById('Dropdown_More_Content');
    	if (dropdown.classList.contains('show')) 
    	{
    		dropdown.classList.remove('show');
    	}
		g_bDropdown_Menu_Active = !g_bDropdown_Menu_Active;
   }
}

function SetInitialSelection()
{
//    var sNextBox = CA_MakeTag_Id(0, 0);
    var sNextBox = GR_MakeTag_Id(0, 1);
	document.getElementById(sNextBox).focus();
}


function LoadInnerHTML()
{
	LoadTwistiCrossAndPopup();
	LoadSuccessWindowPopup();	
	document.getElementById('PuzzleTitle').innerHTML = g_sPuzzleTitle;
//
	LoadGridInnerHTML();
//
	document.getElementById('CA_01_CI').innerHTML = g_sSketchiToonsClueIntro
	document.getElementById('CA_01_C').innerHTML = g_sSketchiToonsClueItself
	var s01 = Clues1And2Entries_MakeInnerHTML_NoImage();
	document.getElementById('CA_01').innerHTML = s01;

// here we make a table the rest of the rows
	var iLastRow = g_aClues.length;
	for ( iX = 2; iX < iLastRow; iX++ )
	{
		CA_SetRow(iX);
	}
	KB_Set_innerHTML();
	CA_Place_Popup_Setup();
	SetInitialSelection();
}



