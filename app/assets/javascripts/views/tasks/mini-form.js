AsanaClone.Views.TaskMiniForm = Backbone.LinkFormView.extend({
  formTemplate: JST['tasks/mini_form'],
  linkTemplate: JST['tasks/mini_form_link'],

  initialize: function (options) {
    this.workspace = options.workspace,
    this.project = options.project,
    this.current_user_id = options.current_user_id
  },

  createTask: function (event) {
    event.preventDefault();
    if (this.collection === undefined) {
      this.createUserTask(event);
    } else {
      this.createProjectTask(event);
    }
  },

  createUserTask: function (event) {
    event.preventDefault();
      this.collection.create({
        creator_id: this.current_user_id,
        workspace_id: this.workspace.id,
        name: this.$('input').val()
      }, {wait: true});
      this.hideForm();
  },

  createProjectTask: function (event) {
    event.preventDefault();
    debugger
      this.collection.create({
        creator_id: this.current_user_id,
        project_id: this.project.id,
        workspace_id: this.project.get('workspace_id'),
        name: this.$('input').val()
      }, {wait: true});
      this.hideForm();
  },
})
