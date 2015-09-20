window.AsanaClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AsanaClone.Routers.Router({
      $rootEl: $('#app-container'),
      $navEl: $('#workspace-idx'),
      workspaces: new AsanaClone.Collections.Workspaces(),
      users: new AsanaClone.Collections.Users()
    })
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   AsanaClone.initialize();
// });
