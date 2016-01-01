class Api::LikesController < ApplicationController

  def create
    drawing_id = params[:drawing_id]
    user_id = current_user.id

    like = Like.where('user_id = ? AND drawing_id = ?', user_id, drawing_id).first


    unless like
      Like.create!(drawing_id: drawing_id, user_id: user_id)
    end

    render json: {}
  end

  def destroy
    like = Like.find(params[:id])

    like.destroy

    render json: {}
  end
end
