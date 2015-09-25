AsanaClone.Views.TaskShow = Backbone.View.extend({
  template: JST['tasks/show'],

  initialize: function (options) {
    this.taskID = options.taskID;
    this.project = options.projects.get(options.projectID);
    this.tasks = new AsanaClone.Collections.Tasks([], {project: this.project});
    this.listenTo(this.tasks, "sync", this.render);
  },

  events: {
    "click .editable": "editTask",
    "blur .edit-task": "saveTask",
    "keyup .edit-task": "maybeSaveTask",
    // "click .task-check": "completeTask"
  },

  render: function () {
    var task = this.tasks.getOrFetch(this.taskID);

    var renderedContent = this.template({
      task: task,
      project: this.project
    });

    this.$el.html(renderedContent);
    return this;
  },

  editTask: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field');
    var $input = $("<input class=\"edit-task\">");

    $input.data('field', field);
    $input.val(this.model.escape(field));
    $target.removeClass('editable');
    $target.html($input);
    $input.focus();
  },

  saveTask: function (e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var field = $target.data('field');
    var newVal = $target.val();

    this.model.set(field, newVal);
    this.model.save();
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
