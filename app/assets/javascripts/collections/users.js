AsanaClone.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: AsanaClone.Models.User,

  getOrFetch: function (id) {
    var collection = this;
    var user = this.get(id);

    if (user) {
      user.fetch();
    } else {
      user = new AsanaClone.Models.User({id: id});
      collection.add(user)
      user.fetch({
        error: function () {
          collection.remove(user);
        }
      });
    }

    return user;
  }
})
