AsanaClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  //comparator by priority

  parse: function (response) {
    if (response.workspaces) {
      this.workspaces().set(response.workspaces, {parse: true});
      delete response.workspaces;
    }
    if (response.tasks) {
      this.tasks().set(response.tasks, {parse: true});
      delete response.tasks;
    }

    return response;
  },

  workspaces: function () {
    if (!this._workspaces) {
      this._workspaces = new AsanaClone.Collections.Workspaces ([], {user: this})
    }

    return this._workspaces;
  },

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new AsanaClone.Collections.Tasks ([], {user: this})
    }

    return this._tasks;
  },
})
