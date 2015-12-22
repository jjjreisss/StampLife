class StaticPagesController < ApplicationController

  def root
    redirect_to new_user_url unless current_user
  end

end
