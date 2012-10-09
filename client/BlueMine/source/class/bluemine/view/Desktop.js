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
qx.Class.define("bluemine.view.Desktop",
{
  extend : qx.ui.container.Composite,

  /**
   * @lint ignoreUndefined(qxc)
   */
  construct : function()
  {
    this.base(arguments, new qx.ui.layout.Dock(0, 0));
      
    this.__toolbar = new bluemine.view.Toolbar();
    this.__toolbar.addListener("add", this._addModule, this);

    this.add(this.__toolbar, {edge:'north'});
      
    // mainsplit, contains the editor splitpane and the info splitpane
    var mainsplit = new qx.ui.splitpane.Pane("horizontal");
    mainsplit.setAppearance("app-splitpane");
    
    var modules1 = new bluemine.view.Modules();
    var modules2 = new bluemine.view.Modules();
    mainsplit.add(modules1, 5);
    mainsplit.add(modules2, 5);
      
    this.add(mainsplit, {edge:'center'});
    this.add(this._getStatusBar(), {edge:'south'});
  },


  properties : {
  },


  members : {
    /**
     * Add a new module.
     *
     * @param e {qx.event.type.Event} A possible events (unused)
     */
    _addModule : function(e)
    {

    },
    
    _getStatusBar: function() {
      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox());
//      composite.add(this._getStatusBarTotalTime());
//      composite.add(new qx.ui.core.Spacer(), {flex: 1});
      composite.add(new qx.ui.basic.Label('v1.0'));
      return composite;
    }
  }
});