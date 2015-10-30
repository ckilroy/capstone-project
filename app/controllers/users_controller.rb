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
      render :new
    end
  end

  def show
    @current_user = current_user
    render json: @current_user
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name, :provider, :uid)
  end
end
