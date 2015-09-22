AsanaClone.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  parse: function (response) {
    if (response.workspaces) {
      this.workspaces().set(response.workspaces, {parse: true});
      delete response.workspaces;
    }
    if (response.assigned_tasks) {
      this.assigned_tasks().set(response.assigned_tasks, {parse: true});
      delete response.assigned_tasks;
    }
    if (response.created_tasks) {
      this.created_tasks().set(response.created_tasks, {parse: true});
      delete response.created_tasks;
    }

    return response;
  },

  workspaces: function () {
    if (!this._workspaces) {
      this._workspaces = new AsanaClone.Collections.Workspaces ([], {user: this})
    }

    return this._workspaces;
  },

  assigned_tasks: function () {
    if (!this._assigned_tasks) {
      this._assigned_tasks = new AsanaClone.Collections.Tasks ([], {user: this})
    }

    return this._assigned_tasks;
  },

  created_tasks: function () {
    if (!this._created_tasks) {
      this._created_tasks = new AsanaClone.Collections.Tasks ([], {user: this})
    }

    return this._created_tasks;
  }
})
