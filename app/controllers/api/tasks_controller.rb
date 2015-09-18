module Api
  class TasksController < ApplicationController
    before_action :require_workspace_member!

    def create
      @task = current_project.tasks.new(task_params)

      if @task.save
        render json: @task
      else
        render json: @task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @tasks = Task.all

      render json: @tasks
    end

    def update
      @task = Task.find(params[:id])

      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @task = Task.find(params[:id])
      render json: @task
    end

    def destroy
      @task = Task.find(params[:id])
      @task.try(:destroy)
      render json: {}
    end

    private

    def task_params
      params.require(:task).permit(:name, :creator_id, :project_id, :description,
        :due_date, :completed, :priority, :assignee_id, :created_at, :updated_at)
    end

    def current_project
      if params[:id]
        @task = Task.find(params[:id])
        @project = @task.project;
      elsif params[:task]
        @project = Project.find(params[:task][:project_id])
      end
    end

    def current_workspace
      current_project.workspace
    end
  end
end
