AsanaClone.Collections.Projects = Backbone.Collection.extend({
  model: AsanaClone.Models.Project,
  url: "/api/projects",

  initialize: function (model, options) {
    this.workspace = options.workspace;
  },

  getOrFetch: function (id) {
    var collection = this;
    var project = collection.get(id);

    if (project) {
      project.fetch();
    } else {
      project = new AsanaClone.Models.Project({id: id});
      collection.add(project)
      project.fetch({
        error: function () {
          collection.remove(project);
        },
      });
    }

    return project;
  }
});
