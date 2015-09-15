module Api
  class ProjectsController < ApplicationController

    def create
      @project = Project.new(project_params)

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
      params.require(:workspace).permit(:name, :workspace_id)
    end

  end
end
