/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Application header widget.
 */
qx.Class.define("bluemine.view.Header",
{
  extend : qx.ui.container.Composite,

  /**
   * @lint ignoreUndefined(qxc)
   */
  construct : function()
  {
    this.base(arguments, new qx.ui.layout.HBox());
    this.setAppearance('app-header');
          // EVIL HACK
    this.addListener("appear", function() {
      var el = this.getContentElement();
      el.setStyle("top", (parseInt(el.getStyle("top")) + 1) + "px");
    }, this);
    // /////////
    
    var desktopButton = new qx.ui.form.RadioButton(this.tr("Desktop"));
    desktopButton.set({
      model: "desktop",
      appearance: "modeButton"
    });
    
    var adminButton = new qx.ui.form.RadioButton(this.tr("Admin"));
    adminButton.set({
      model: "admin",
      appearance: "modeButton"
    });
    
    this.__buttons = [desktopButton, adminButton];

    this.__group = new qx.ui.form.RadioGroup(desktopButton, adminButton);
    this.__group.bind("modelSelection[0]", this, "mode");
    
    this.add(new qx.ui.basic.Label("Bluemine"));
        this.add(new qx.ui.core.Spacer(30));
    this.add(desktopButton);
    this.add(adminButton);
    this.add(new qx.ui.core.Spacer(), {flex: 1});
    this.add(new qx.ui.basic.Label("v1.0"));
  },


  properties : {
    /** The mode the header should be currently in. */
    mode : {
      event : "changeMode",
      check : "String",
      init : "desktop",
      apply : "_applyMode"
    }
  },


  members : {
    __buttons : null,
    __group : null,


    // property apply
    _applyMode : function(value) {
      if (this.__group.getModelSelection().getItem(0) != value) {
        this.__group.setModelSelection([value]);
      }
    },


    /**
     * Enables or disabled the button for the given mode.
     * @param mode {String} the mode to change the enabled state.
     * @param value {boolean} <code>true</true> if the button should be enabled.
     */
    setEnabledMode : function(mode, value) {
      for (var i=0; i < this.__buttons.length; i++) {
        if (this.__buttons[i].getModel() == mode) {
          var button = this.__buttons[i];
          break;
        }
      };
      button.setEnabled(value);
    }
  }
});