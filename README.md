# Asana clone

[Heroku link][heroku]

[heroku]: https://lit-lake-4637.herokuapp.com/

## Minimum Viable Product
NameTBD is a clone of Asana built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

Minimal MVP:
Users can create accounts
Users can sign in and out
Users can create Workspaces
Users can create Projects within Workspaces
Users can create Tasks within Projects
Users Dashboard show page displays all Projects
User's Task show page displays all tasks
Project's show page displays only tasks associated with Project
Tasks can be marked and ordered as "Today," "Upcoming," or "Later"
Tasks can be drag/dropped
Tasks can be marked as completed and moved to trash
Tasks, Projects, and Workspaces can be permanently deleted (with dependents deleted).

Sharing Features:
Workspaces can be private or shared with other users
Projects can be private or shared with other users
Projects show page displays all Project tasks to any user associated with Project.
Tasks can be assigned to users
User's Tasks show page displays tasks assigned to that user and any tasks not associated with a project(i.e., personal) tasks
Users can follow tasks
Users have an inbox
Changes to shared or followed projects/tasks arrive as inbox messages to other users


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Workspace/Projects/Tasks Creation (~2 days)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create workspaces, projects, and tasks that are linked to one another in Rails. The setup will be similar
to the music app we created by the end of this phase.

[Details][phase-one]

### Phase 2: Viewing Workspaces, Projects, Tasks (~4-5 days)
I will add API routes to serve workspace, project, and task data as JSON, then add Backbone models and collections to fetch data from those routes. By the end of this
phase, users will be able to create, update, destroy and view their workspaces, projects and tasks. They will be able to select their workspace (eventually from a drop-down menu, but probably via an index page at this stage). They will be able to access an index of thier projects, i.e. the dashboard. There will be two ways of viewing tasks via nested routes: 1) a project/tasks index page, which will display all tasks associated with a particular project (i.e. Project Show). 2) A user/tasks index page to display all of a user's tasks.

[Details][phase-two]

### Phase 3: Task Details (~1 day)
User tasks can be ordered by priority (Today, Upcoming or Later). I will also create a task show page so users can view information about and individual task.

[Details][phase-three]

### Phase 4: Implementation of Sharing Features (~1-2 days)
Allow workspaces and projects to be labeled as private or shared with other users.
Change visibility in show pages according to privacy settings. Allow tasks to be
assigned to users.

[Details][phase-four]

### Phase 5: Adding an Inbox (~2 days)
Tasks can be followed. Changes made by other users to shared projects or followed
task arrive as messages in user's inbox.


[Details][phase-five]

### Bonus Features (TBD)
Add flying unicorns to celebrate productivity! (a real Asana feature I just discovered!)
Subtasks
Project stats and progress charts
Calendar, Attachments, or Message Board features

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
