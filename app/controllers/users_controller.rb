class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      @user.user_setup!
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      redirect_to root_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name, :provider, :uid)
  end
end
