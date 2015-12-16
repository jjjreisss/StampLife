class Api::DrawingsController < ApplicationController

  def new
    content = Array.new(10000){"#eee"}.join

    @drawing = Drawing.new(
      content: content,
      user_id: current_user.id
    )
  end

  def create
    @drawing = Drawing.new(drawing_params)

    @drawing.save!

    render :show
  end

  def show
    @drawing = Drawing.find(params[:id])
  end

  private
  def drawing_params
    params.require(:drawing).permit(:content, :caption, :user_id);
  end
end
