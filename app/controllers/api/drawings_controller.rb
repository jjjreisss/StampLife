class Api::DrawingsController < ApplicationController

  def index
    if params[:username]
      @drawings = User.where(username: params[:username]).first.drawings
    else
      @drawings = Drawing.all
    end

    render json: @drawings
  end

  def create
    @drawing = Drawing.new(drawing_params)
    @drawing.user_id = current_user.id

    @drawing.save!

    render :show
  end

  def show
    @drawing = Drawing.find(params[:id])
  end

  private
  def drawing_params
    params.require(:drawing).permit(:content, :caption, :image_url);
  end
end
