AsanaClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.workspaces = options.workspaces;
  },

  routes: {
    "": "index",
    "workspaces/:id": "show"
  },

  index: function () {
    this.workspaces.fetch();
    var indexView = new AsanaClone.Views.WorkspacesIndex({
      collection: this.workspaces
    });

    this._swapView(indexView);
  },

  show: function (id) {
    var workspace = this.workspaces.getOrFetch(id)

    var showView = new AsanaClone.Views.WorkspaceShow({
      model: workspace
    });

    this._swapView(showView);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
