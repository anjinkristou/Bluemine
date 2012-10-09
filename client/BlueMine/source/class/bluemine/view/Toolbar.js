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
/* ************************************************************************

#asset(playground/images/*)

************************************************************************ */

/**
 * The playground toolbar containing all buttons and menus.
 */
qx.Class.define("bluemine.view.Toolbar",
{
  extend : qx.ui.toolbar.ToolBar,


  construct : function()
  {
    this.base(arguments);

    this.__menuItemStore = {};

    // add button
    var addButton = new qx.ui.toolbar.Button(
      this.tr("Add"), "icon/22/actions/media-playback-start.png"
    );
    this.add(addButton);
    addButton.setToolTipText(this.tr("Add a new module"));
    addButton.addListener("execute", function() {
      this.fireEvent("add");
    }, this);

    // spacer
    this.addSpacer();

    // demobrowser button
    var logoutButton = new qx.ui.toolbar.Button(
      this.tr("Logout"), "icon/22/actions/application-exit.png"
    );
    this.add(logoutButton);
    logoutButton.setToolTipText(this.tr("Exit the application"));
    logoutButton.addListener("execute", function() {
      this.fireEvent("logout");
    }, this);

  },


  events :
  {
    /**
     * Fired if the add button is pressed.
     */
    "add" : "qx.event.type.Event",

    /**
     * Event which will be fired to logout.
     */
    "logout" : "qx.event.type.Event"
  },


  members :
  {
    __menuItemStore : null,
    
    /**
     * Helper for the overflow handling. It is responsible for returning a
     * corresponding menu item for the given toolbar item.
     *
     * @param toolbarItem {qx.ui.core.Widget} The toolbar item to look for.
     * @return {qx.ui.core.Widget} The coresponding menu item.
     */
    _getMenuItem : function(toolbarItem) {
      var cachedItem = this.__menuItemStore[toolbarItem.toHashCode()];

      if (!cachedItem) {
        if (toolbarItem instanceof qx.ui.toolbar.CheckBox) {
          cachedItem = new qx.ui.menu.CheckBox(toolbarItem.getLabel());
        } else {
          cachedItem = new qx.ui.menu.Button(toolbarItem.getLabel(), toolbarItem.getIcon());
        }

        // connect the execute
        cachedItem.addListener("execute", function() {
          toolbarItem.execute();
        });

        this.__overflowMenu.addAt(cachedItem, 0);
        this.__menuItemStore[toolbarItem.toHashCode()] = cachedItem;
      }

      return cachedItem;
    }
  },


  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

  destruct : function() {
  }
});