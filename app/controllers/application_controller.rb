# require 'jwt'

class ApplicationController < ActionController::API
  def encode_token(payload)
    JWT.encode(payload, 'secret')
  end
  # include ActionController::Cookies

  def decode_token
     auth_header = request.headers['Authorization']
    #  puts auth_header
    #  auth_header comes in the form of "Bearer TOKEN", split method is required to obtain token
     if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'secret', true, algorithm: 'HS256') 
      rescue JWT::DecodeError
        nil
      end
     end 
  end

  # authorized_user returns the user given a token which is obtained from the headers of HTTP requests (see decode_token) 
  def authorized_user 
    decoded_token = decode_token()
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def authorize
    # authorized_user
    render json: { message: 'You have to log in.' }, status: :unauthorized unless authorized_user 
  end
  
end
