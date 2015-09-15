class Workspace < ActiveRecord::Base
  has_many :user_workspaces
  has_many :users, :through => :user_workspaces
end
