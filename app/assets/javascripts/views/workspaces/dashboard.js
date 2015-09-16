AsanaClone.Views.WorkspaceDashboard = Backbone.CompositeView.extend({
  template: JST['workspaces/dashboard'],

  initialize: function () {
    this.collection = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addProjectView);

    this.collection.forEach(function(project) {
      this.addProjectView(project);
    }.bind(this))
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  addProjectView: function (project) {
    var subview = new AsanaClone.Views.ProjectDashItem({model: project});
    this.addSubview('#dash-projects', subview);
  }

})
