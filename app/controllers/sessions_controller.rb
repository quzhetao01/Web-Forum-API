class SessionsController < ApplicationController
  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json:user, status: :ok
    else
      render json: "Invalid Credentials. Try again!", status: :unauthorized 
    end
  end

  def destroy
  end
end
