/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("bluemine.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {
    "mode-select-tab" : {
      include : "tabview-page-button-top",

      style :
      {
        color : "highlight-shade",
        backgroundColor: "background-selected"
      }
    }
  }
});