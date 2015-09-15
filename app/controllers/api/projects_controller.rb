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

    def index
      @projects = Project.all

      render json: @projects
    end

    def show
      @project = Project.find(params[:id])

      render json: @project
    end


    private

    def project_params
      params.require(:workspace).permit(:name)
    end

  end
end
