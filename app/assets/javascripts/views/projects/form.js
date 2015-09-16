AsanaClone.Views.ProjectForm = Backbone.LinkFormView.extend({
  formTemplate: JST['projects/form'],
  linkTemplate: JST['projects/form_link'],

  create: function (event) {
    event.preventDefault();
    this.collection.create({
      workspace_id: this.collection.workspace.id,
      name: this.$('input').val() //add other values like description later...
    }, {wait: true}); //adding new project to collection, (attrs, options),
    //waits for server before setting attributes
    this.hideForm();
  }
})
