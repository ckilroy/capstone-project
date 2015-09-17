AsanaClone.Collections.Projects = Backbone.Collection.extend({
  model: AsanaClone.Models.Project

  initialize: function (model, options) {
    this.workspace = options.workspace;
  }
});
