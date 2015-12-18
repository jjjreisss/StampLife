class Api::StampsController < ApplicationController

  def index
    @stamps = Stamp.all

    render json: @stamps
  end

  def show
    @stamp = Stamp.find(params[:id])

    render json: @stamp
  end

end
