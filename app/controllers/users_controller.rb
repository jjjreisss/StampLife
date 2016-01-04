class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show

  end

  def update
    current_user.update_attributes(
      params[:user]
      .permit(:tour_one_completed, :tour_two_completed, :tour_three_completed, :tour_four_completed)
    )

    render json: {}
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
