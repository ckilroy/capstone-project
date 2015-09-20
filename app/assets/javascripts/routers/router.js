AsanaClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$navEl = options.$navEl
    this.workspaces = options.workspaces;
  },

  routes: {
    "": "workIndex",
    "workspaces/new": "workNew",
    "workspaces/:id": "workShow",
    "dashboard/:id": "dashboard"
  },

  workIndex: function () {
    this.workspaces.fetch();
    var indexView = new AsanaClone.Views.WorkspacesIndex({
      collection: this.workspaces
    });

    // QUESTION what if i WANT this to be a zombie? can i do that?
    //right now i have this in a dropdown, so it is always on the page
    //but i will eventually only have it show up on a click - maybe
    //then i can close/remove view manually... i like the url change
    //when you go to view a project and I don't feel like it makes
    //sense to have this be a composite view... 
    this.$navEl.html(indexView.render().$el);
  },

  // "myTasksIndex",
  // myTasksIndex: function () {
  //
  // },

  workShow: function (id) {
    // this will be inserted into .sidebar
    var workspace = this.workspaces.getOrFetch(id)

    var showView = new AsanaClone.Views.WorkspaceShow({
      model: workspace
    });

    this._swapView(showView);
  },

  dashboard: function (id) {
    var workspace = this.workspaces.getOrFetch(id)

    var dashView = new AsanaClone.Views.WorkspaceDashboard({
      model: workspace
    });

    this._swapView(dashView);
  },

  workNew: function () {
    var newWorkspace = new AsanaClone.Models.Workspace();

    var newView = new AsanaClone.Views.WorkspaceForm({
      model: newWorkspace,
      collection: this.workspaces
    });

    this._swapView(newView)
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },
})
