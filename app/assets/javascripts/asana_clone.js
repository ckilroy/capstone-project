window.AsanaClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AsanaClone.Routers.Router({
      $rootEl: $('#app-container'),
      $navEl: $('#header-links'),
      workspaces: new AsanaClone.Collections.Workspaces()
    })
    Backbone.history.start();
  }
};
