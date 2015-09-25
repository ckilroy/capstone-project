AsanaClone.Collections.Tasks = Backbone.Collection.extend({
  model: AsanaClone.Models.Task,
  url: "/api/tasks",

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
  }
});
