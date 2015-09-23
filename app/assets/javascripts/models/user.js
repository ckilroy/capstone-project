AsanaClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  //comparator by priority

  parse: function (response) {
    if (response.workspaces) {
      this.workspaces().set(response.workspaces, {parse: true});
      delete response.workspaces;
    }
    if (response.user_tasks) {
      this.user_tasks().set(response.user_tasks, {parse: true});
      delete response.user_tasks;
    }

    return response;
  },

  workspaces: function () {
    if (!this._workspaces) {
      this._workspaces = new AsanaClone.Collections.Workspaces ([], {user: this})
    }

    return this._workspaces;
  },

  user_tasks: function () {
    if (!this._user_tasks) {
      this._user_tasks = new AsanaClone.Collections.Tasks ([], {user: this})
    }

    return this._user_tasks;
  },
})
