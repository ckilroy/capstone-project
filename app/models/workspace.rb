class Workspace < ActiveRecord::Base
  validates :name, presence: true

  has_many :user_workspaces
  has_many :users, :through => :user_workspaces

  has_many :projects, dependent: :destroy
end
