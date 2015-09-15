AsanaClone.Views.WorkspaceShow = Backbone.View.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    return this;
  }
})
