//MyTasks will load on sign in, eventually
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function (options) {
    // TODO: refactor to just have current user object up her... will affect a few functions
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
    //renders the basic page layout
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.attachSubviews();

    if (this._middlePane === undefined) {
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

    this._middlePane && this._middlePane.remove();
    this._rightPane && this._rightPane.remove();
    this._middlePane = view;
    this.addSubview('#project-show', view);
  },

  userTaskShow: function () {
    var user = this.users.getOrFetch(this.current_user_id);

    var userTaskShow = new AsanaClone.Views.UserTaskShow({
      model: user, workspace: this.model 
    })

    this._middlePane && this._middlePane.remove();
    this._rightPane && this._rightPane.remove();
    this._middlePane = userTaskShow;
    this.addSubview('#project-show', userTaskShow)
  },
  // TODO: change #project-show to something more semantic like middle-pane

  renderTaskDetail: function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var taskID = $target.data('task-id');
    var tasks;

    //sets either user.tasks or project.tasks as the collection
    if ($target.data('project-id') !== "") {
      var project = this.collection.get($target.data('project-id'))
      tasks = project.tasks();
    } else {
      var user = this.users.getOrFetch(this.current_user_id);
      tasks = user.tasks();
    }

    var subview = new AsanaClone.Views.TaskShow({
      collection: tasks,
      taskID: taskID,
      project: project
    });

    this._rightPane && this._rightPane.remove();
    this._rightPane = subview;
    this.addSubview('#task-detail-show', subview);
  },
})
