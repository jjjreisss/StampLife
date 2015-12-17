class Api::ImagesController < ApplicationController

  def create
    @image = Cloudinary::Uploader.upload(params[:img])

    render json: @image
  end

end
