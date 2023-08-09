class TasksController < ApplicationController
  before_action :authenticate_user!, :set_task, only: %i[ show edit update destroy ]

  # GET /tasks or /tasks.json
  def index
    # @tasks = Task.all
    begin
      @project = Project.find(params[:project_id])
      @tasks = @project.tasks
    rescue ActiveRecord::RecordNotFound
      redirect_to projects_path
    end
  end

  # GET /tasks/1 or /tasks/1.json
  def show
    @task = Task.find(params[:id])
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html { redirect_to task_url(@task), notice: "Task was successfully created." }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to task_url(@task), notice: "Task was successfully updated." }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy

    respond_to do |format|
      format.html { redirect_to project_tasks_path(project_id: @task.project_id), notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def update_elapsed_time
    @task = Task.find(params[:id])
    elapsed_time = params[:total_time_elapsed].to_i || 0

    if elapsed_time.positive?
      @task.total_time_elapsed = elapsed_time
      puts "Inside elapsed_time.positive? total_time_elapsed: #{@task.total_time_elapsed}"
      if @task.save
        render json: { total_time_elapsed: @task.total_time_elapsed }
        puts "After Save total_time_elapsed: #{@task.total_time_elapsed}"
        puts "JSON Response: #{response.body}"
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        puts "*Error*: #{@task.total_time_elapsed}"
      end
    else
      render json: { errors: ["Elapsed time must be a positive integer"] }, status: :unprocessable_entity
      puts "*Error*: #{@task.total_time_elapsed}"
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :project_id, :total_time_elapsed)
    end
end
