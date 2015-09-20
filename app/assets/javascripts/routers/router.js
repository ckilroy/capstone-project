AsanaClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.workspaces = options.workspaces;
    this.current_user_id = options.$rootEl.data('user');
    this.users = options.users;
  },

  routes: {
    "": "workShow",
    "workspaces/new": "workNew",
    "workspaces/:id": "workShow",
    "dashboard/:id": "dashboard"
  },

  // workIndex: function () {
  //   this.workspaces.fetch();
  //   var indexView = new AsanaClone.Views.WorkspacesIndex({
  //     collection: this.workspaces
  //   });
  //
  //   // QUESTION what if i WANT this to be a zombie? can i do that?
  //   //right now i have this in a dropdown, so it is always on the page
  //   //but i will eventually only have it show up on a click - maybe
  //   //then i can close/remove view manually... i like the url change
  //   //when you go to view a project and I don't feel like it makes
  //   //sense to have this be a composite view...
  //   this.$navEl.html(indexView.render().$el);
  // },

  // "myTasksIndex",
  // myTasksIndex: function () {
  //
  // },

  getCurrentUser: function (callback) {
    debugger
    var currentUser = this.users.getOrFetch(this.current_user_id)
    callback(currentUser);
  },

//getCurrentUser(userWorkspaces) will become list of workspaces

call workspaceID on the above

  userWorkspaces: function (user) {
    debugger
    var workspaces = user.workspaces();
  },

  workspaceID: function (workspaces) {
    debugger
    return workspaces.shift().id
  },

  workShow: function (id) {
    if (id === null) {
      var workspace = this.workspaces.getOrFetch(this.getCurrentUser(this.userWorkspaces()))
    } else {
      var workspace = this.workspaces.getOrFetch(id)
    }

    debugger
    var showView = new AsanaClone.Views.WorkspaceShow({
      model: workspace
    });

    this._swapView(showView);
  },
  //
  // dashboard: function (id) {
  //   var workspace = this.workspaces.getOrFetch(id)
  //
  //   var dashView = new AsanaClone.Views.WorkspaceDashboard({
  //     model: workspace
  //   });
  //
  //   this._swapView(dashView);
  // },
  //
  // workNew: function () {
  //   var newWorkspace = new AsanaClone.Models.Workspace();
  //
  //   var newView = new AsanaClone.Views.WorkspaceForm({
  //     model: newWorkspace,
  //     collection: this.workspaces
  //   });
  //
  //   this._swapView(newView)
  // },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },
})
