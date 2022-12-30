class ApplicationController < ActionController::API
  include ActionController::Cookies

  private
  
  def current_user
    debugger
    User.find_by(id: session[:user_id])
  end
end
