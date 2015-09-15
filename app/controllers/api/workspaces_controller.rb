module Api
  class WorkspacesController < ApplicationController
    #for now, not worrying about whether user belongs to board, just creating...

    def create
      @workspace = Workspace.new(workspace_params)

      if @workspace.save
        render json: @workspace
      else
        render json: @workspace.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @workspace = Workspace.find(params[:id])
      @workspace.try(:destroy)
      #reminder: try lets you call method without worrying about whether the object's nil
      render json: {}
    end

    def index
      @workspaces = Workspace.all

      render json: @workspaces
    end

    def show
      @workspace = Workspace.find(params[:id])

      render :show
      #eventually will render :show and then in views/api/workspaces/show.json.jbuilder extract data
    end


    private

    def workspace_params
      params.require(:workspace).permit(:name)
    end

  end
end
