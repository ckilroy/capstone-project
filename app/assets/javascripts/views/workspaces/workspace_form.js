AsanaClone.Views.WorkspaceForm = Backbone.View.extend({
  template: JST["workspaces/form"],

  events: {
    "submit form": "submit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      workspace: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = this.$el.find('input').serializeJSON(),
    that = this;

    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
})
