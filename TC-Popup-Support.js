// misc.js
// 
// this function allows for closing popup style windows
window.onclick = function(event) 
{
	var sTargetId = event.target.id;
	if ( g_bSuccessWindow_Active && sTargetId != '')
	{
		//SuccessWindowPopup_Toggle(true);
	}
	if ( g_bButton_Info_Active && ( sTargetId != "Button_Info_Image") )
	{
    	dropdown = document.getElementById('Button_Info');
    	dropdown.classList.toggle('show'); 
		g_bButton_Info_Active= false;
	}
//	if ( g_bPlaceWindow_Active && !sTargetId.startsWith('Place_') )
//		Place_Popup_Toggle();

	if ( g_bButton_Settings_Active && sTargetId != '')
	{   
		if (  sTargetId.indexOf('Settings') == -1) 
//		if ( sTargetId == 'Button_Settings_Image' || sTargetId.indexOf('Settings') == -1) 
		{
			var popup = document.getElementById("Button_Settings");
			popup.classList.toggle("show");
			g_bButton_Settings_Active = !g_bButton_Settings_Active;
		}
	}
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

