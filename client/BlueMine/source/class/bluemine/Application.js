/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bluemine/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "BlueMine"
 */
qx.Class.define("bluemine.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // UI Components
    __header : null,
    __mode : null,
    
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      this.getRoot().add(this._getLayout(), {edge:0});
    },
    
    _getLayout: function() {
      // container layout
      var layout = new qx.ui.layout.VBox();

      // main container
      var mainContainer = new qx.ui.container.Composite(layout);
      
      this.__header = new bluemine.view.Header();　
      this.__header.addListener("changeMode", this._onChangeMode, this);
      
      this.__desktop = new bluemine.view.Desktop();
     
      mainContainer.add(this.__header);
      mainContainer.add(this.__desktop, { flex : 1 });
      
      return mainContainer;
    },
    
    
    
    // ***************************************************
    // MODE HANDLING
    // ***************************************************
    /**
     * Event handler for changing the mode of the palyground.
     * @param e {qx.event.type.Data} The data event containing the mode.
     */
    _onChangeMode : function(e) {
      var mode = e.getData();
      // ignore setting the same mode
      if (mode == this.__mode) {
        return;
      }

      if (!this.setMode(mode)) {
        this.__header.setMode(e.getOldData());
      } else {
        // select the first sample
        this.setCurrentSample(this.__samples.getFirstSample(mode));
      }
    },
    
    /**
     * Setter and dispatcher for the current mode the playground is in.
     * @param mode {String} The mode to use.
     */
    setMode : function(mode) {
      // check if the mode is supported
      if (!this.__supportsMode(mode)) {
        throw new Error("Mode '" + mode + "' not supported");
      }

      // only set new mode if not already set
      if (this.__mode == mode) {
        return true;
      }

      // only change the mode if no code gets lost
      if (this.__discardChanges()) {
        return false;
      }

      // store the mode
      qx.bom.Cookie.set("currentMode", mode, 100);
      this.__mode = mode;

      // update the views
      //confirm(this.tr("Click OK to discard your changes.");

      return true;
    },
    
    // ***************************************************
    // UPDATE & RUN & COMPARE
    // ***************************************************
    /**
     * Checcks if the code is changed. If that is the case, the user will be
     * prompted to discard the changes.
     *
     * @lint ignoreDeprecated(confirm)
     * @return {Boolean} <code>true</code> if the code has been modified
     */
    __discardChanges : function() {
    /*
      var userCode = this.__editor.getCode();
      if (userCode && this.__isCodeNotEqual(userCode, this.getOriginCode()))
      {
        if (!confirm(this.tr("Click OK to discard your changes.")))
        {
          return true;
        }
      }
    */
      return false;
    }
  }
});
