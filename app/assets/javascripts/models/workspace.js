AsanaClone.Models.Workspace = Backbone.Model.extend({
  urlRoot: "/api/workspaces",

  parse: function (response) {
    if (response.projects) {
      this.projects().set(response.projects, {parse: true});
      delete response.projects;
    }
    if (response.users) {
      this.users().set(response.users, {parse: true});
      delete response.users;
    }

    return response;
  },

  projects: function () {
    if (!this._projects) {
      this._projects = new AsanaClone.Collections.Projects([], {workspace: this})
    }

    return this._projects;
  },


  users: function () {
    if (!this._users) {
      this._users = new AsanaClone.Collections.Users([], {workspace: this})
    }

    return this._users;
  }
})
