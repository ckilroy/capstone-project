AsanaClone.Models.Workspace = Backbone.Model.extend({
  urlRoot: "api/workspaces",

  parse: function (response) {
    if (workspace.projects) {
      this.projects().set(response.projects, {parse: true});
      delete response.projects;
    }

    return response;
  },

  projects: function () {
    if (!this._projects) {
      this._projects = new AsanaClone.Collections.Projects([], {workspace: this})
    }

    return this._projects;
  }
})
