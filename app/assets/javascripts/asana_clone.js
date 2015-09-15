window.AsanaClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new AsanaClone.Routers.Router({
      $rootEl: $('#main'),
      workspaces: new AsanaClone.Collections.Workspaces()
    })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  AsanaClone.initialize();
});
