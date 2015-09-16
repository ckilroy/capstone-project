AsanaClone.Views.WorkspacesIndex = Backbone.View.extend({
  template: JST['workspaces/index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.collection.each(function(workspace){
      var indexItem = new AsanaClone.Views.WorkspaceItem({
        model: workspace
      });
      this.$('ul').append(indexItem.render().$el);
    }.bind(this));
    
    return this;
  }
})
