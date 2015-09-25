AsanaClone.Views.WorkspaceItem = Backbone.View.extend({
  template: JST['workspaces/item'],
  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var renderContent = this.template({workspace: this.model});
    this.$el.html(renderContent);

    return this;
  }
});
