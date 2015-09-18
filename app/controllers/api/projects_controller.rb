module Api
  class ProjectsController < ApplicationController
    # before_action :require_workspace_member!

    def create
      @project = current_workspace.projects.new(project_params)

      if @project.save
        render json: @project
      else
        render json: @project.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @project = Project.find(params[:id])
      @project.try(:destroy)
      render json: {}
    end

    private

    def project_params
      params.require(:project).permit(:name, :description, :workspace_id)
    end

    def current_workspace
      if params[:id]
        @project = Project.find(params[:id])
        @workspace = @project.workspace
      elsif params[:project]
        @workspace = Workspace.find(params[:project][:workspace_id])
      end
    end

  end
end
