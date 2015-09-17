class Project < ActiveRecord::Base
  validates :name, :workspace_id, presence: true

  belongs_to :workspace
  has_many :tasks, dependent: :destroy
end
