AsanaClone.Collections.Tasks = Backbone.Collection.extend({
  model: AsanaClone.Models.Task,
  url: "/api/tasks",

  // initialize: function (model, options) {
  //   if (options.project) {
  //     this.project = options.project;
  //   }
  // },

  getOrFetch: function(id) {
    var collection = this;
    var task = collection.get(id);

    if (task) {
      task.fetch();
    } else {
      task = new AsanaClone.Models.Task({id: id});
      collection.add(task);
      task.fetch({
        error: function () {
          collection.remove(task);
        }
      });
    }

    return task;
  },

});
