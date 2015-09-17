AsanaClone.Views.TaskLinkItem = Backbone.View.extend({
  template: JST['tasks/link-item'],

  render: function () {
    var renderedContent = this.template({
      task: this.model,
      projects: this.collection //do I need this?
    });

    this.$el.html(renderedContent);
    return this;
  }
})
