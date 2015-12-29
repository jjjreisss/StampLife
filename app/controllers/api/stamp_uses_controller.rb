class Api::StampUsesController < ApplicationController

  def create
    indexes = params[:stamps_used]

    indexes.each do |stamp_index|
      Stamp.find(stamp_index).stamp_uses.create!(user_id: current_user.id)
    end

    render json: {message: "successfully created stamp_uses"}

  end

end
