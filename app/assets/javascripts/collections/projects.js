AsanaClone.Collections.Projects = Backbone.Collection.extend({
  model: AsanaClone.Models.Project,
  url: "/api/projects",

  initialize: function (model, options) {
    this.workspace = options.workspace;
  }
});
