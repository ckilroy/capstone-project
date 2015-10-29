module Api
  class UsersController < ApplicationController
    def show
      @user = User.includes(:workspaces).find(params[:id])
      # @user = current_user.includes(:workspaces)
      render :show
    end

    def index
      @users = User.all
      render json: @users
    end

    private
    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end
