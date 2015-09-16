// index of projects
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.collection = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addProjectLinkItem);

    this.collection.forEach(function(project) {
      this.addProjectLinkItem(project);
    }.bind(this))
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  addProjectLinkItem: function (project) {
    var subview = new AsanaClone.Views.ProjectLinkItem({model: project});
    this.addSubview('#projects', subview);
  }

})
