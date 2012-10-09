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
qx.Class.define("bluemine.view.Search",
{
  extend : qx.ui.container.Composite,

  /**
   * @lint ignoreUndefined(qxc)
   */
  construct : function(){
    this.base(arguments, new qx.ui.layout.VBox());
    this.setDecorator("main");

    this.add(this.__createSearch(), {flex: 1});
        
    //this.setBackgroundColor("white");
  },


  properties : {
  },


  members : {
    __createSearch : function()
    {
      // search
      var searchComposlite = new qx.ui.container.Composite();
      searchComposlite.setLayout(new qx.ui.layout.HBox(3));
      searchComposlite.setAppearance("textfield");
  
      var searchIcon = new qx.ui.basic.Image("icon/16/actions/edit-find.png");
      searchComposlite.add(searchIcon);
  
      this._searchTextField = new qx.ui.form.TextField();
      this._searchTextField.setLiveUpdate(true);
      this._searchTextField.setAppearance("widget");
      this._searchTextField.setPlaceholder("Filter...");
  
      var filterTimer = new qx.event.Timer(500);
      filterTimer.addListener("interval", function(ev) {
        this.filter(this._searchTextField.getValue());
        filterTimer.stop();
      }, this);
  
      this._searchTextField.addListener("changeValue", function(ev) {
        filterTimer.restart();
      }, this);
  
      searchComposlite.add(this._searchTextField, {flex: 1});
  
      // create the status of the tree
      this._status = new qx.ui.basic.Label("");
      this._status.setAppearance("widget");
      this._status.setWidth(80);
      this._status.setTextAlign("right");
      searchComposlite.add(this._status);

      return searchComposlite;
    }
  },
    
  /*
  ****************************************************************************
    DESTRUCT
  ****************************************************************************
  */

  destruct : function(){
  }
});