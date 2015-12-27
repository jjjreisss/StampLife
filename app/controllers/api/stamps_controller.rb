class Api::StampsController < ApplicationController

  def index
    if params[:username]
      @stamps = User.where(username: params[:username]).first.stamps
    else
      @stamps = Stamp.all
    end

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


  def destroy
    @stamp = Stamp.find(params[:id])

    if current_user.username == "canada"
      @stamp.destroy
    else
      render json: {message: "improper authorization"}
    end
  end

private
  def stamp_params
    params.require(:stamp).permit(:name, :image_url)
  end

end
