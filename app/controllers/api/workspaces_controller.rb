module Api
  class WorkspacesController < ApplicationController
    #for now, not worrying about whether user belongs to board, just creating...

    def create
      @workspace = current_user.workspaces.new(workspace_params)

      if @workspace.save
        # **********Need to insert into join table
        # new UserWorkspace(user_id: current_user.id, workspace_id: @workspace_id)
        render json: @workspace
      else
        render json: @workspace.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @workspace = current_user.workspaces.find(params[:id])
      @workspace.try(:destroy)
      #reminder: try lets you call method without worrying about whether the object's nil
      render json: {}
    end

    def index
      @workspaces = current_user.workspaces

      render json: @workspaces
    end

    def show
      @workspace = Workspace.includes(:users, :projects, :tasks).find(params[:id])

      if @workspace.is_member?(current_user)
        render :show
      else
        render json: ["You do not belong to this workspace."], status: 403
      end
    end


    private

    def workspace_params
      params.require(:workspace).permit(:name)
    end

  end
end
