AsanaClone.Collections.Workspaces = Backbone.Collection.extend({
  url: "/api/workspaces",
  model: AsanaClone.Models.Workspace,

  getOrFetch: function (id) {
    var collection = this;
    var workspace = this.get(id);

    if (workspace) {
      workspace.fetch();
    } else {
      workspace = new AsanaClone.Models.Workspace({id: id});
      collection.add(workspace)
      workspace.fetch({
        error: function () {
          collection.remove(workspace);
        }
      });
    }

    return workspace;
  }
});
