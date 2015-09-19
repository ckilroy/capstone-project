window.AsanaClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AsanaClone.Routers.Router({
      $rootEl: $('#content'),
      $navEl: $('#workspace-idx'),
      workspaces: new AsanaClone.Collections.Workspaces()
    })
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   AsanaClone.initialize();
// });
