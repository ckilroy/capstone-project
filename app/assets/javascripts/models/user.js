AsanaClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function (response) {
    if (response.workspaces) {
      this.workspaces().set(response.workspaces, {parse: true});
      delete response.workspaces;
    }

    return response;
  },

  workspaces: function () {
    if (!this._workspaces) {
      this._workspaces = new AsanaClone.Collections.Workspaces ([], {user: this})
    }

    return this._workspaces;
  }
})
