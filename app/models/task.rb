class Task < ActiveRecord::Base
  validates :name, :creator_id, :project_id, presence: true

  belongs_to :project

  belongs_to :creator,
  class_name: "Task",
  foreign_key: "creator_id"

  belongs_to :assignee,
  class_name: "Task",
  foreign_key: "assignee_id"

end
