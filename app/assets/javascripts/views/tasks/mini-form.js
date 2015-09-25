AsanaClone.Views.TaskMiniForm = Backbone.LinkFormView.extend({
  formTemplate: JST['tasks/mini_form'],
  linkTemplate: JST['tasks/mini_form_link'],

  initialize: function (options) {
    this.workspace = options.workspace
    this.current_user_id = options.current_user_id;
  },

  create: function (event) {
    event.preventDefault();
    if (this.collection.project === undefined) {
      this.createUserTask(event);
    } else {
      this.createProjectTask(event);
    }
  },

  createUserTask: function (event) {
    event.preventDefault();
      this.collection.create({
        creator_id: this.current_user_id,
        workspace_id: this.workspace_id,
        name: this.$('input').val()
      }, {wait: true});
      this.hideForm();
  },

  createProjectTask: function (event) {
    event.preventDefault();
      this.collection.create({
        creator_id: this.current_user_id,
        project_id: this.collection.project.id,
        name: this.$('input').val()
      }, {wait: true});
      this.hideForm();
  },
})
