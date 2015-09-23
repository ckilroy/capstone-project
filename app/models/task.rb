class Task < ActiveRecord::Base
  validates :name, :creator_id, presence: true

  belongs_to :project

  has_one :workspace, :through => :project, source: :workspace

  belongs_to :creator,
  class_name: "Task",
  foreign_key: "creator_id"

  belongs_to :assignee,
  class_name: "Task",
  foreign_key: "assignee_id"

  def assigned_to_user? (user)
    return true if self.assignee == user
    return false;
  end

  def unassigned?
    return true if self.assignee == nil
    return false
  end

  def assigned_to_project?
    return false if self.project == nil
    return true
  end


end
