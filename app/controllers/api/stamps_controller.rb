class Api::StampsController < ApplicationController

  def index
    @stamps = Stamp.all

    render json: @stamps
  end

  def show
    @stamp = Stamp.find(params[:id])

    render json: @stamp
  end

  def create
    @stamp = Stamp.new(stamp_params)
    @stamp.author_id = current_user.id

    @stamp.save!

    render json: @stamp
  end

  def stamp_params
    params.require(:stamp).permit(:name, :image_url)
  end

end
