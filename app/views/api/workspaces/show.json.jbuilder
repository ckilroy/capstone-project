json.extract! @workspace, :id, :name

json.projects @workspace.projects do |project|
  json.extract! project, :id, :name, :description, :created_at, :updated_at

  json.tasks project.tasks do |task|
    json.extract! task , :id, :name, :description, :due_date, :completed, :priority,
      :creator_id, :assignee_id, :created_at, :updated_at
  end
end
