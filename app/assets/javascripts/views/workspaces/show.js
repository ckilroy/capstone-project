//MyTasks will load on sign in, eventually
AsanaClone.Views.WorkspaceShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],
  noBarTemplate: JST['workspaces/show_no_side'],

  // TODO: if panes of a project are open, they should not display if the project is deleted
  //but panes stay should still display if a different project is deleted (renderoldpanes)

  initialize: function (options) {
    // TODO: refactor to just have current user object up her... will affect a few functions
    //collection:workspaces
    //model:workspace
    this.users = options.users;
    this.current_user_id = options.current_user_id;
    this.projects = this.model.projects();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderProjectForm);
    this.listenTo(this.projects, "add", this.displayProjectLink);

    this.projects.forEach(function(project) {
      this.displayProjectLink(project);
    }.bind(this));

  },

  events: {
    "click .project-link": "renderProjectShow",
    "click .task-detail": "renderTaskDetail",
    "click .my-tasks": "userTaskShow",
    "click .close": "closeSidebar",
    "click .open": "openSidebar",
    "click .delete-project": "deleteProject"
  },

  getUsers: function () {
    this.collection.forEach(function (workspace) {
      workspace.users().forEach(function (user) {
        this.users.add(user);
      }.bind(this))
    }.bind(this))
  },

  deleteProject: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);

    var project = this.projects.get($target.data('id'));
    project.destroy();
    this.render();
  },

  closeSidebar: function(e) {
    $target = $('#sidebar')
    $target.addClass("closed").removeClass("expanded");
    $target.find('ul').addClass("hide");
    $target.find('section').removeClass("hide");
  },

  openSidebar: function(e) {
    $target = $('#sidebar')
    $target.addClass("expanded").removeClass("closed");
    $target.find('section').addClass("hide");
    $target.find('ul').removeClass("hide");
  },

  render: function () {
    //renders the basic page layout
    renderedContent = this.template();

    this.$el.html(renderedContent);

    this.attachSubviews();

    if (this._middlePane === undefined) {
      this.userTaskShow();
    }

    return this;
  },

  // renderOldPanes: function() {
  //   this.addSubview('#project-show', this._middlePane)
  //   this.addSubview('#task-detail-show', this._rightPane);
  // },

  displayProjectLink: function (project) {
    var subview = new AsanaClone.Views.ProjectLinkItem({
      collection: this.model,
      model: project
    });
    this.addSubview('#projects', subview);
  },

  renderProjectForm: function () {
    var view = new AsanaClone.Views.ProjectForm({
      projects: this.projects
    });
    this.addSubview('#project-form', view);
  },

  renderProjectShow: function (e) {
    e.preventDefault();
    $target = $(e.currentTarget);

    var project = this.projects.get($target.data('id'));
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
    });

    this._middlePane && this._middlePane.remove();
    this._rightPane && this._rightPane.remove();
    this._middlePane = userTaskShow;
    this.addSubview('#project-show', userTaskShow)
  },
  // TODO: change #project-show to something more semantic like middle-pane

  renderTaskDetail: function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var projectID = $target.data('project-id');
    var taskID = $target.data('task-id');
    this.getUsers();

    var subview = new AsanaClone.Views.TaskShow({
       taskID: taskID,
       projectID: projectID,
       projects: this.projects,
       users: this.users
     });

    this._rightPane && this._rightPane.remove();
    this._rightPane = subview;
    this.addSubview('#task-detail-show', subview);
  }
});
