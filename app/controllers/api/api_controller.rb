module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_signed_in!
      unless signed_in?
        render json: ["Please sign in"]
      end
    end

    def require_workspace_member!
      redirect_to new_session_url unless current_workspace.is_member?(current_user)
    end
  end
end
