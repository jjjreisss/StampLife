class SessionsController < ApplicationController
  def new

  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    if current_user.username == "guest"
      current_user.update_attributes(
        tour_one_completed: false,
        tour_two_completed: false,
        tour_three_completed: false,
        tour_four_completed: false
      )
    end
    sign_out
    render json: {message: "successfully logged out"}
  end
end
