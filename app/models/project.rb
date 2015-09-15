class Project < ActiveRecord::Base
  validates :name, :workspace, presence: true

  belongs_to :workspace
end
