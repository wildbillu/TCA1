// Surf and Turf
function TC_Puzzle_Load_AsJS()
{
    g_sPuzzleDate     = '2022-09-16';
    g_sPuzzleName     = 'SurfAndTurf';
    g_sPuzzleTitle    = "Dinner Anyone?";
    g_ST_sClue_Itself = 'Rhyming Restaurant Choice';
    g_ST_sClue_Intro = 'SketchiToons Clue to Dual Answers';
    g_ST_sFilename_Success = 'images/Puzzle-SurfAndTurf-Solved.jpg';
    g_ST_sFilename = 'images/Puzzle-SurfAndTurf.jpg';
    g_sDualClueBefore = '  '; 
    g_sDualClueMiddle = 'and'; 
    g_sDualClueEnd = ' '; 
    g_sPuzzleCreditAuthor = 'Puzzle By Sketchi Bill, Images By Sketchi Bill'
    g_sPuzzleCreditDate = 'September 25, 2022'
// CA Stuff
    var sClues  = 'A|And|Switch Position|Also|Apt name for a worrier|Unfit to be eaten, not Kosher|One might have green filling for St. Pat\'s|Craft for ET';
    var sAnswers                    = 'SURF|TURF|OFF|TOO|STU|TREF|OREO|UFO';
    var sAnswersPlayer             = '-U--|-U--|---|---|---|----|----|---';
    var sStatusPlayer              = 'NCNN|NCNN|NNN|NNN|NNN|NNNN|NNNN|NNN';
    CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer);
// GR_Stuff
    var iGridWidth      = 4;
    var iGridHeight     = 4;
    var sGridAnswers                = '.TOOSURFTREFUFO.';
    var sGridAnswersPlayer          = '.----U---------.';
    var sGridStatusPlayer           = '.NNNNCNNNNNNNNN.';
    var sGridNumbering              = '-0123---4---5---';
    GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
}
