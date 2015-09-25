class Workspace < ActiveRecord::Base
  validates :name, presence: true

  has_many :user_workspaces
  has_many :users, :through => :user_workspaces, source: :user

  has_many :projects, dependent: :destroy

  has_many :tasks

  def is_member?(user)
    return true if users.any? { |workspace_user| workspace_user.id == user.id}
    user_workspaces.where(user_id: user.id).exists?
  end
end
