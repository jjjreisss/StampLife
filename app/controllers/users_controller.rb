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
    if /guest\d\d\d/.match(current_user.username)
      current_user.update_attributes(
        params[:user]
        .permit(:tour_one_completed, :tour_two_completed, :tour_three_completed, :tour_four_completed)
      )
    end

    render json: {}
  end

  private
  def user_params
    if (params[:user][:username] == "guest")
      guest_username = "guest"
      until User.find_by(username: guest_username).nil?
        guest_username = "guest" + rand(100).to_s.rjust(3, '0')
      end
      return {
        username: guest_username,
        password: "password"
      }
    else
      return params.require(:user).permit(:password, :username)
    end
  end
end
