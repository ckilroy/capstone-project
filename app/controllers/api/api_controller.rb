module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_signed_in!
      unless signed_in?
        render json: ["Please sign in"]
      end
    end
  end
end
