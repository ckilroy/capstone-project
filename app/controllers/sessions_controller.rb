class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email or password"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

  def omniauth
    @user = User.find_user_by_auth_hash(auth_hash)


    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      @user = User.create!(
              provider: auth_hash[:provider],
              uid: auth_hash[:uid],
              email: auth_hash[:info][:name],
              name: auth_hash[:info][:name],
              password: SecureRandom::urlsafe_base64)
      @user.user_setup!
      sign_in!(@user)
      redirect_to root_url
    end
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
