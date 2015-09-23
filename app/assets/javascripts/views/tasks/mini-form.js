AsanaClone.Views.TaskMiniForm = Backbone.LinkFormView.extend({
  formTemplate: JST['tasks/mini_form'],
  linkTemplate: JST['tasks/mini_form_link'],

  initialize: function (options) {
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
        name: this.$('input').val() //add other values like description later...
      }, {wait: true}); //adding new task to collection, (attrs, options),
      //waits for server before setting attributes
      this.hideForm();
  },

  createProjectTask: function (event) {
    event.preventDefault();
      this.collection.create({
        creator_id: this.current_user_id,
        project_id: this.collection.project.id,
        name: this.$('input').val() //add other values like description later...
      }, {wait: true}); //adding new task to collection, (attrs, options),
      //waits for server before setting attributes
      this.hideForm();
  },
})
