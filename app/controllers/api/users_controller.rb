module Api
  class UsersController < ApplicationController
    def show
      @user = current_user

      render :show
    end

    private
    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end
