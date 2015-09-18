AsanaClone.Views.TaskShow = Backbone.View.extend({
  template: JST['tasks/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({
      task: this.model,
      tasks: this.collection
    })

    this.$el.html(renderedContent);
    return this;
  }
});
