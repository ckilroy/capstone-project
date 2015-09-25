class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, uniqueness: true

  has_many :user_workspaces
  has_many :workspaces, :through => :user_workspaces, source: :workspace

  has_many :created_tasks,
  class_name: "Task",
  foreign_key: "creator_id"

  has_many :assigned_tasks,
  class_name: "Task",
  foreign_key: "assignee_id"

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end
  #refactor, but leave for now?

  def self.find_user_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    user.nil? ? nil : user
  end

  def user_setup!
    default_team_workspace = Workspace.create({name: "Team"})
      UserWorkspace.create({user_id: self.id, workspace_id: default_team_workspace.id})

    default_personal_workspace = Workspace.create({name: "Personal"})
      UserWorkspace.create({user_id: self.id, workspace_id: default_personal_workspace.id})
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
