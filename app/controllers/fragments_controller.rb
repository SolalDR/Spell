class FragmentsController < ApplicationController
  before_action :set_fragment, only: [:show, :edit, :update, :destroy]

  # GET /fragments
  # GET /fragments.json
  def index
    @fragments = Fragment.all
  end

  # GET /fragments/1
  # GET /fragments/1.json
  def show
  end

  # GET /fragments/new
  def new
    @fragment = Fragment.new
  end

  # GET /fragments/1/edit
  def edit
  end

  # POST /fragments
  # POST /fragments.json
  def create
    @fragment = Fragment.new(fragment_params)

    respond_to do |format|
      if @fragment.save
        format.html { redirect_to @fragment, notice: 'Fragment was successfully created.' }
        format.json { render :show, status: :created, location: @fragment }
      else
        format.html { render :new }
        format.json { render json: @fragment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fragments/1
  # PATCH/PUT /fragments/1.json
  def update
    respond_to do |format|
      if @fragment.update(fragment_params)
        format.html { redirect_to @fragment, notice: 'Fragment was successfully updated.' }
        format.json { render :show, status: :ok, location: @fragment }
      else
        format.html { render :edit }
        format.json { render json: @fragment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fragments/1
  # DELETE /fragments/1.json
  def destroy
    @fragment.destroy
    respond_to do |format|
      format.html { redirect_to fragments_url, notice: 'Fragment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fragment
      @fragment = Fragment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fragment_params
      params.require(:fragment).permit(:name, :content, :config)
    end
end
