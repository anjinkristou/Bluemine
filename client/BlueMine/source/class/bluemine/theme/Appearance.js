/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("bluemine.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
    "app-header" :
    {
      style : function(states)
      {
        return {
          font : "headline",
          textColor : "text-selected",
          backgroundColor: "background-selected-dark",
          decorator: "app-header",
          padding : [10, 10, 0, 10]
        };
      }
    },

    "modeButton" :
    {
      include : "tabview-page/button",
      alias : "tabview-page/button",

      style : function(states, superStyles)
      {
        return {
          font: states.checked ? "bold" : "default",
          textColor: "white",
          decorator : states.checked ? "mode-select-tab" : null,
          padding: [2, 15, 6, 15],
          marginBottom: -5,
          marginTop: 8
        };
      }
    }
  }
});