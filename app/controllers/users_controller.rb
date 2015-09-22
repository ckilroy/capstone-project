class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      default_team_workspace = Workspace.create({name: "Team"})
      UserWorkspace.create({user_id: @user.id, workspace_id: default_team_workspace.id})
      default_personal_workspace = Workspace.create({name: "Personal"})
      UserWorkspace.create({user_id: @user.id, workspace_id: default_personal_workspace.id})
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      redirect_to root_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
