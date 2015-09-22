//MyTasks will load on sign in, eventually
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function (options) {
    this.current_user_id = options.current_user_id
    this.collection = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderProjectForm);
    this.listenTo(this.collection, "add", this.displayProjectLink);

    this.collection.forEach(function(project) {
      this.displayProjectLink(project);
    }.bind(this))
  },

  events: {
    "click .project-link": "renderProjectShow"
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    this.attachSubviews();
    // this.renderProjectForm();
    return this;
  },

  displayProjectLink: function (project) {
    var subview = new AsanaClone.Views.ProjectLinkItem({
      collection: this.model,
      model: project
    });
    this.addSubview('#projects', subview);
  },

  renderProjectForm: function () {
    var view = new AsanaClone.Views.ProjectForm({
      collection: this.collection
    });
    this.addSubview('#project-form', view);
  },

  renderProjectShow: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);
    var project = this.collection.get($target.data('id'))
    var view = new AsanaClone.Views.ProjectShow({
      model: project,
      current_user_id: this.current_user_id
    });

    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.addSubview('#project-show', view);
  }
})
