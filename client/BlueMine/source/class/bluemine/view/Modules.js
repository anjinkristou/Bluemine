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
qx.Class.define("bluemine.view.Modules",
{
  extend : qx.ui.container.Composite,

  /**
   * @lint ignoreUndefined(qxc)
   */
  construct : function(){
    this.base(arguments, new qx.ui.layout.VBox());
    this.setDecorator("main");

    // caption
    var caption = new qx.ui.basic.Label(this.tr("Modules")).set({
      font       : "bold",
      padding    : 5,
      allowGrowX : true,
      allowGrowY : true
    });
    this.add(caption);

    this.add(this.__createTable(), {flex: 1});
        
    this.setBackgroundColor("white");
  },


  properties : {
  },


  members : {
    __createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = new qx.ui.table.Table(tableModel);

      table.set({
        width: 600,
        height: 400,
        decorator : null
      });

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));
      

      return table;
    },
    
    createRandomRows: function(rowCount) {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      var nextId = 0;
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      return rowData;
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