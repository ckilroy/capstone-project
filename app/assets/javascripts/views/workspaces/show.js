//MyTasks will load on sign in, eventually
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function (options) {
    //refactor to just have current user object up her... affects a few functions
    this.users = options.users
    this.current_user_id = options.current_user_id
    this.collection = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderProjectForm);
    this.listenTo(this.collection, "add", this.displayProjectLink);

    this.collection.forEach(function(project) {
      this.displayProjectLink(project);
    }.bind(this));
  },

  events: {
    "click .project-link": "renderProjectShow",
    "click .task-detail": "renderTaskDetail"
  },

  render: function () {
    var renderedContent = this.template({workspace: this.model});

    this.$el.html(renderedContent);
    this.attachSubviews();
    // this.renderProjectForm();
    if (this._currentView === undefined) {
      this.userTaskShow();
    }
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
    this._subCurrentView && this._subCurrentView.remove();
    this._currentView = view;
    this.addSubview('#project-show', view);
  },

  userTaskShow: function () {
    var user = this.users.getOrFetch(this.current_user_id);

    var userTaskShow = new AsanaClone.Views.UserTaskShow({
      model: user
    })

    this._currentView && this._currentView.remove();
    this._subCurrentView && this._subCurrentView.remove();
    this._currentView = userTaskShow;
    this.addSubview('#project-show', userTaskShow)
  },

  renderTaskDetail: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);
    //need the specific task and tasks collection
    var project = this.collection.get($target.data('project-id'))
    var tasks = project.tasks();

    var taskID = $target.data('task-id');

    var subview = new AsanaClone.Views.TaskShow({
      collection: tasks,
      taskID: taskID
    });

    this._subCurrentView && this._subCurrentView.remove();
    this._subCurrentView = subview;
    this.addSubview('#task-detail-show', subview);
  }
})
