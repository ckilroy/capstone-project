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

#1
Task.create({name: "Assigned To CKilroy 1 - today", priority: 1, creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#2
Task.create({name: "Assigned To CKilroy 1 - upcoming", priority: 2, creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#3
Task.create({name: "Assigned To CKilroy 1 - later", priority: 3, creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#4
Task.create({name: "Assigned To CKilroy 1 - no priority", creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#5
Task.create({name: "CKilroy 1 created - assigned to NOT-ME", creator_id: users[0].id, assignee_id: users[1].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#6
Task.create({name: "CKilroy 1 created - unassigned", creator_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})
#7
Task.create({name: "Assigned To CKilroy 1 - completed", completed: true, creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[0].id, workspace_id: workspaces[1].id})

#8
Task.create({name: "Assigned To CKilroy 2", creator_id: users[0].id, assignee_id: users[0].id, project_id: shared_projects[1].id, workspace_id: workspaces[1].id})
#9
Task.create({name: "CKilroy 2 created - assigned to NOT ME", creator_id: users[0].id, assignee_id: users[1].id, project_id: shared_projects[1].id, workspace_id: workspaces[1].id})

#10
Task.create({name: "CKilroy assigned - no project", creator_id: users[0].id, assignee_id: users[0].id, workspace_id: workspaces[1].id})
#11
Task.create({name: "NOT-ME assigned - no project", creator_id: users[0].id, assignee_id: users[1].id, workspace_id: workspaces[1].id})
#12
Task.create({name: "Unassigned - no project", creator_id: users[0].id, workspace_id: workspaces[1].id})


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
# Project - > Workspace
# Project -> Tasks
# Task -> Workspace
# Task -> Project
# Task -> Creator
# Task -> Assignee
# Workspace -> Users
# Workspace -> Projects
# User -> Workspaces
# User -> CreatedTasks
# User -> Assigned Tasks
#
# My Tasks:
# User -> Asssigned Tasks +
# User -> CreatedTasks if Task->Project = null?
# completed = false
#
# All Tasks:
# *use jbuilder for Workspaces
# each project, all tasks;
#
#
# #BackboneAssociations
# Workspace.projects()
# Project.tasks()
# User.Workspaces()
