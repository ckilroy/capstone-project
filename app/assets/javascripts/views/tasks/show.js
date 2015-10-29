AsanaClone.Views.TaskShow = Backbone.View.extend({
  template: JST['tasks/show'],

  initialize: function (options) {
    this.taskID = options.taskID;
    this.users = options.users;
    this.projects = options.projects;
    this.tasks = new AsanaClone.Collections.Tasks();
    this.listenTo(this.tasks, "change", this.render);
  },

  events: {
    "click .editable": "editTask",
    "blur .edit-task": "saveTask",
    "keyup .edit-task": "maybeSaveTask",
    "click .close-task": "closeTask",
    // "click .task-check": "completeTask"
  },

  closeTask: function (e) {
    e.preventDefault();
    $(".task-detail-show").addClass("hidden");
  },

  render: function () {
    var task = this.tasks.getOrFetch(this.taskID)

    var renderedContent = this.template({
      task: task,
      projects: this.projects,
      users: this.users
    });

    this.$el.html(renderedContent);
    return this;
  },

  editTask: function(e) {
    var task = this.tasks.getOrFetch(this.taskID);
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field');
    var $input = $("<input class=\"edit-task\">");

    $input.data('field', field);
    $input.val(task.escape(field));
    $target.removeClass('editable');
    $target.html($input);
    $input.focus();
  },

  saveTask: function (e) {
    e.preventDefault();
    var task = this.tasks.getOrFetch(this.taskID);
    var $target = $(e.currentTarget);
    var field = $target.data('field');
    var newVal = $target.val();

    task.set(field, newVal);
    task.save();
    this.render();
  },

  maybeSaveTask: function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.saveTask(e);
    }
  },

  // completeTask: function (e){
  //   e.preventDefault();
  //   //figure out checkboxes later
  // },

});
