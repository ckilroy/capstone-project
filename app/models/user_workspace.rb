class UserWorkspace < ActiveRecord::Base
  belongs_to :user
  belongs_to :workspace
end
