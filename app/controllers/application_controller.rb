# require 'jwt'

class ApplicationController < ActionController::API
  include ActionController::Cookies

  # def encode_token(payload)
  #   jwt_token = JWT.encode(payload, "hello")
  #   cookies[:jwt] = jwt_token
  #   puts cookies[:jwt]
  #   return jwt_token
  # end
  # # include ActionController::Cookies

  # def secret_key 
  #   Rails.application.credentials.secret_key
  # end

  # def decode_token
  #    auth_header = request.headers['Authorization']
  #   #  puts auth_header
  #   #  auth_header comes in the form of "Bearer TOKEN", split method is required to obtain token
  #    if auth_header
  #     token = auth_header.split(' ')[1]
  #     begin
  #       JWT.decode(token, "hello", true, algorithm: 'HS256') 
  #     rescue JWT::DecodeError
  #       nil
  #     end
  #    end 
  # end

  # # authorized_user returns the user given a token which is obtained from the headers of HTTP requests (see decode_token) 
  # def authorized_user 
  #   puts cookies[:jwt]
  #   decoded_token = decode_token()
  #   if decoded_token
  #     user_id = decoded_token[0]['user_id']
  #     @user = User.find_by(id: user_id)
  #   end
  # end

  # def authorize
  #   # authorized_user
  #   render json: { message: 'You have to log in.' }, status: :unauthorized unless authorized_user 
  # end
  def authenticate_cookie
    token = cookies.signed[:jwt]
    decoded_token = JsonWebToken.decode(token)
    if decoded_token
      user = User.find_by(id: decoded_token["user_id"])
    end
    if user then return true else render json: {status: 'unauthorized', code: 401} end
  end

  def current_user
    token = cookies.signed[:jwt]
    decoded_token = JsonWebToken.decode(token)
    if decoded_token
      user = User.find_by(id: decoded_token["user_id"])
    end
    if user then return user else return false end
  end
  
  
end
