module Api
  class TasksController < ApplicationController

    def create
      @task = Task.new(task_params)

      if @task.save
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
      params.require(:task).permit(:name, :creator_id, project_id)
    end

  end
end
