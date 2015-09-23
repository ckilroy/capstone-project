AsanaClone.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: AsanaClone.Models.User,

  getOrFetch: function (id, callback) {
    var collection = this;
    var user = collection.get(id);

    if (user) {
      user.fetch();
    } else {
      user = new AsanaClone.Models.User({id: id});
      collection.add(user)
      user.fetch({
        error: function () {
          collection.remove(user);
        },
        success: function () {
          callback && callback();
        }
      });
    }

    return user;
  },

  getOrFetchTask: function (userID, taskID) {
    var user = this.get(userID);
    var task;

    if (user) {
      task = user.tasks().getOrFetch(taskID);
    } else {
      task = new AsanaClone.Models.Task({id: taskID});
      task.fetch();
    }

    return task;
  }

})
