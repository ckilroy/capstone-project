class Workspace < ActiveRecord::Base
  validates :title, presence: true
  
  has_many :user_workspaces
  has_many :users, :through => :user_workspaces
end
