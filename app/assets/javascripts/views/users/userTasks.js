AsanaClone.Views.UserTaskShow = Backbone.View.extend({
  template: JST["users/taskshow"],

  render: function () {
    var renderedContent = this.template({user: this.model});

    this.$el.html(renderedContent);
    return this;
  }
})
