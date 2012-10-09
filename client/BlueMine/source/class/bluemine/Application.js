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
      var composite = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0));
      composite.add(this._getHeader(), {edge:'north'});
      composite.add(this._getMenu(), {edge:'north'});
      composite.add(this._getButtons(), {edge:'west'});
      composite.add(this._getTree(), {edge:'center'});
      composite.add(this._getStatusBar(), {edge:'south'});
      return composite;
    },

    _getHeader: function() {
      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      composite.setAppearance('app-header');
      composite.add(new qx.ui.basic.Label('BlueMine'));
      composite.add(new qx.ui.core.Spacer(), {flex: 1});
      composite.add(new qx.ui.basic.Label('v1.0'));
      return composite;
    },

    _getStatusBar: function() {
      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      composite.add(this._getStatusBarTotalTime());
//      composite.add(new qx.ui.core.Spacer(), {flex: 1});
//      composite.add(new qx.ui.basic.Label('v1.0'));
      return composite;
    },

    _getStatusBarTotalTime: function() {
      if (!this._timeLabel) {
        this._timeLabel = new qx.ui.basic.Label('Total Time: 00:00');
      }
      return this._timeLabel;
    },

    _setupStatusBarTotalTime: function() {
    /*
      timetracker.Storage.getInstance().getModel().addListener('updatedTime', function() {
        this._getStatusBarTotalTime().setValue('Total Time: ' + timetracker.Storage.getInstance().getModel().getTotalTime(true));
      }, this);
      this._getStatusBarTotalTime().setValue('Total Time: ' + timetracker.Storage.getInstance().getModel().getTotalTime(true));
    */  
    },

    _getMenu: function() {
      var file  = new qx.ui.menu.Menu();
      /*
      file.add(new qx.ui.menu.Button('Clear Tasks', 'timetracker/time_go.png', this._clearTasksCmd));
      */
      
      var project  = new qx.ui.menu.Menu();
      /*
      project.add(new qx.ui.menu.Button('New', 'timetracker/report_add.png', this._newProjectCmd));
      project.add(new qx.ui.menu.Button('Edit', 'timetracker/report_edit.png', this._editProjectCmd));
      project.add(new qx.ui.menu.Button('Remove', 'timetracker/report_delete.png', this._removeProjectCmd));
      */
      
      var task  = new qx.ui.menu.Menu();
      /*
      task.add(new qx.ui.menu.Button('New', 'timetracker/page_white_add.png', this._newTaskCmd));
      task.add(new qx.ui.menu.Button('Edit', 'timetracker/page_white_edit.png', this._editTaskCmd));
      task.add(new qx.ui.menu.Button('Remove', 'timetracker/page_white_delete.png', this._removeTaskCmd));
      task.add(new qx.ui.menu.Button('Start', 'timetracker/control_play_blue.png', this._startTaskCmd));
      task.add(new qx.ui.menu.Button('Stop', 'timetracker/control_stop_blue.png', this._stopTaskCmd));
      */
//      task.addSeparator();

      var menubar = new qx.ui.menubar.MenuBar();
      menubar.add(new qx.ui.menubar.Button('File', null, file));
      menubar.add(new qx.ui.menubar.Button('Project', null, project));
      menubar.add(new qx.ui.menubar.Button('Task', null, task));
      return menubar;
    },

    _createContextMenu: function(selection) {
      var menu = new qx.ui.menu.Menu();
      /*
      // Project entries
      menu.add(new qx.ui.menu.Button('New Project', 'timetracker/report_add.png', this._newProjectCmd));
      if (selection instanceof BlueMine.model.Project) {
        menu.add(new qx.ui.menu.Button('Edit Project', 'BlueMine/report_edit.png', this._editProjectCmd));
        menu.add(new qx.ui.menu.Button('Remove Project', 'BlueMine/report_delete.png', this._removeProjectCmd));
      }
      menu.addSeparator();

      // Task entries
      menu.add(new qx.ui.menu.Button('New Task', 'BlueMine/page_white_add.png', this._newTaskCmd));
      if (selection instanceof BlueMine.model.Task) {
        menu.add(new qx.ui.menu.Button('Edit Task', 'BlueMine/page_white_edit.png', this._editTaskCmd));
        menu.add(new qx.ui.menu.Button('Remove Task', 'BlueMine/page_white_delete.png', this._removeTaskCmd));
        menu.add(new qx.ui.menu.Button('Start Task', 'BlueMine/control_play_blue.png', this._startTaskCmd));
        menu.add(new qx.ui.menu.Button('Stop Task', 'BlueMine/control_stop_blue.png', this._stopTaskCmd));
      }
      menu.addSeparator();

      menu.add(new qx.ui.menu.Button('Clear Tasks', 'BlueMine/time_go.png', this._clearTasksCmd));
      */
      return menu;
    },

    _getButtons: function() {
      var composite = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

      composite.add(new qx.ui.basic.Label('Project:').set({margin:5}));
      /*
      composite.add(this._getNewProjectButton());
      composite.add(this._getEditProjectButton());
      composite.add(this._getRemoveProjectButton());
      */
      
      composite.add(new qx.ui.basic.Label('Task:').set({margin:5}));
      /*
      composite.add(this._getNewTaskButton());
      composite.add(this._getEditTaskButton());
      composite.add(this._getRemoveTaskButton());
      composite.add(this._getStartTaskButton());
      composite.add(this._getStopTaskButton());
      */
      
      composite.add(new qx.ui.basic.Label('Other:').set({margin:5}));
      //composite.add(this._getClearTasksButton());

      return composite;
    },

    /*
    _getNewProjectButton: function() {
      var button = new qx.ui.form.Button("New", 'BlueMine/report_add.png', this._newProjectCmd).set({margin:5});
      button.setCenter(false);
      return button;
    },

    _getEditProjectButton: function() {
      var button = new qx.ui.form.Button("Edit", 'BlueMine/report_edit.png', this._editProjectCmd).set({margin:5});
      button.setCenter(false);
      return button;
    },

    _getRemoveProjectButton: function() {
      var button = new qx.ui.form.Button("Remove", 'BlueMine/report_delete.png', this._removeProjectCmd).set({margin:5});
      button.setCenter(false);
      return button;
    },

    _getNewTaskButton: function() {
      var button = new qx.ui.form.Button("New", 'BlueMine/page_white_add.png', this._newTaskCmd).set({margin:5});
      button.setCenter(false);
      button.setEnabled(false);
      return button;
    },

    _getEditTaskButton: function() {
      var button = new qx.ui.form.Button("Edit", 'BlueMine/page_white_edit.png', this._editTaskCmd).set({margin:5});
      button.setCenter(false);
      return button;
    },

    _getRemoveTaskButton: function() {
      var button = new qx.ui.form.Button("Remove", 'BlueMine/page_white_delete.png', this._removeTaskCmd).set({margin:5});
      button.setCenter(false);
      return button;
    },

    _getStartTaskButton: function() {
      var button = new qx.ui.form.Button('Start', 'BlueMine/control_play_blue.png').set({margin:5});
      button.setCommand(this._startTaskCmd);
      button.setCenter(false);
      return button;
    },

    _getStopTaskButton: function() {
      var button = new qx.ui.form.Button('Stop', 'BlueMine/control_stop_blue.png').set({margin:5});
      button.setCommand(this._stopTaskCmd);
      button.setCenter(false);
      return button;
    },

    _getClearTasksButton: function() {
      var button = new qx.ui.form.Button('Clear', 'BlueMine/time_go.png').set({margin:5});
      button.setCommand(this._clearTasksCmd);
      button.setCenter(false);
      return button;
    },
    */
    
    _getTree: function() {
      var tree = new qx.ui.tree.Tree();
      /*
      this._tree = new bluemine.ui.Tree();
      var tree = this._tree.getTree();
      
      tree.setContextMenu(this._createContextMenu());
      tree.addListener('changeSelection', function(e) {
        var sel = e.getData();
        var item = sel.length > 0 ? sel[0].getModel() : null;
        var projEnabled = item !== null && item instanceof bluemine.model.Project;
        var taskEnabled = item !== null && item instanceof bluemine.model.Task;
        this._editProjectCmd.setEnabled(projEnabled);
        this._removeProjectCmd.setEnabled(projEnabled);
        this._newTaskCmd.setEnabled(projEnabled || taskEnabled);
        this._editTaskCmd.setEnabled(taskEnabled);
        this._removeTaskCmd.setEnabled(taskEnabled);
        this._startTaskCmd.setEnabled(taskEnabled);

        tree.setContextMenu(this._createContextMenu(item));
      }, this);
      
      return this._tree.getTree();
      */
      return tree;
    }
  }
});
