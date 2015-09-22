# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([{email: "ckilroy", password: "password"}, {email: "not-me", password: "password"}])
workspaces = Workspace.create([{name: "Personal Workspace"}, {name: "Team Workspace"}])

#ckilroy is associated with both
UserWorkspace.create({user_id: users[0].id, workspace_id: workspaces[0].id})
UserWorkspace.create({user_id: users[0].id, workspace_id: workspaces[1].id})
#not-me is only associated with the team workspace
UserWorkspace.create({user_id: users[1].id, workspace_id: workspaces[1].id})

shared_projects =  Project.create([{name: "Team Project One", workspace_id: workspaces[1].id},
{name: "Team Project Two", workspace_id: workspaces[1].id}])

#private project
Project.create({name: "Personal Project", workspace_id: workspaces[0].id})

Task.create(name: "Assigned To CKilroy 1" priority: "today" :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id
Task.create(name: :completed :priority :creator_id :assignee_id :project_id

#Project One
#task assigned to me
#task assigned to not-me
#completed task (should show up in all tasks)

#Project Two
#task assigned to me
#task assigned to not-me
#completed task (should show up in all tasks)

#No Project
#task assigned to me
#task assigned to not-me(will he see it even though I don't)

#1) Project show should only have uncompleted project tasks, any assignment
#2) My tasks should have only tasks assigned to me, and any unassigned tasks I CREATED with no project
#3) All tasks should have completed and uncompleted for workspace.

#??? don't think i need a users/projects table, other logic should take care of that....

#in Rails:
Project - > Workspace
Project -> Tasks
Task -> Workspace
Task -> Project
Task -> Creator
Task -> Assignee
Workspace -> Users
Workspace -> Projects
User -> Workspaces
User -> CreatedTasks
User -> Assigned Tasks

#BackboneAssociations
Workspace.projects()
Project.tasks()
User.Workspaces()
