AsanaClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$navEl = options.$navEl;
    this.workspaces = options.workspaces;
    this.current_user_id = options.$rootEl.data('user');
    this.users = new AsanaClone.Collections.Users();
    // TODO: initialize users collection in router too?
  },

  routes: {
    "_=_": "workShow",
    "": "workShow",
    "workspaces/new": "workNew",
    "workspaces/:id": "workShow",
    "dashboard/:id": "dashboard"
  },

  workIndex: function () {
    this.workspaces.fetch();
    var indexView = new AsanaClone.Views.WorkspacesIndex({
      collection: this.workspaces
    });

    this.$navEl.find('#workspace-idx').html(indexView.render().$el);
  },


  workShow: function (id) {
    //will get user's first workspace if none selected
    if (id === null) {
      this.workspaceID(this.workShow.bind(this, id))
      return;
    }

    if (this._userWorkspaces === undefined) {
      this.userWorkspaces(this.workShow.bind(this, id))
      return;
    }

    var workspace = this._userWorkspaces.getOrFetch(id)

    var showView = new AsanaClone.Views.WorkspaceShow({
      model: workspace,
      collection: this._userWorkspaces,
      current_user_id: this.current_user_id,
      users: this.users,
    });

    var itemView = new AsanaClone.Views.WorkspaceItem({model: workspace})

    this.workIndex();
    this.$navEl.find('#current-workspace').html(itemView.render().$el)
    this._swapView(showView);
  },


  // dashboard: function (id) {
  //   var workspace = this.workspaces.getOrFetch(id)
  //
  //   var dashView = new AsanaClone.Views.WorkspaceDashboard({
  //     model: workspace
  //   });
  //
  //   this._swapView(dashView);
  // },

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

  //below, callbacks to get default workShow page
  currentUser: function (callback) {
    this._currentUser = this.users.getOrFetch(this.current_user_id, callback);
  },

  userWorkspaces: function (callback) {
    if (this._currentUser === undefined){
      this.currentUser(this.userWorkspaces.bind(this, callback));
      return;
    };

    this._userWorkspaces = this._currentUser.workspaces();
    callback && callback();
  },

  workspaceID: function (callback) {
    if (this._userWorkspaces === undefined) {
      this.userWorkspaces(this.workspaceID.bind(this, callback))
      return;
    }

    var id = this._userWorkspaces.shift().id
    this.workShow(id);
  },
})
