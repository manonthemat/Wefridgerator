class StaticPagesController < ApplicationController
  def index
  end

  def welcome
  	@user  = User.new
  end
end
