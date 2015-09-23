json.extract! @user, :id ,:email

json.workspaces @user.workspaces do |workspace|
  json.extract! workspace, :id, :name
end

json.user_tasks do
  json.array! @user.assigned_tasks do |task|
    json.extract! task, :id, :name, :description, :due_date, :completed, :priority,
      :creator_id, :assignee_id, :project_id, :created_at, :updated_at
  end
  json.array! @user.created_tasks do |task|
    if task.unassigned?
      json.extract! task, :id, :name, :description, :due_date, :completed, :priority,
        :creator_id, :assignee_id, :project_id, :created_at, :updated_at
    end
  end
end
#
# json.assigned_tasks @user.assigned_tasks do |task|
#   json.extract! task, :id, :name, :description, :due_date, :completed, :priority,
#     :creator_id, :assignee_id, :project_id, :created_at, :updated_at
# end
#
# json.created_tasks @user.created_tasks do |task|
#   if task.unassigned?
#     json.extract! task, :id, :name, :description, :due_date, :completed, :priority,
#       :creator_id, :assignee_id, :project_id, :created_at, :updated_at
#   end
# end
