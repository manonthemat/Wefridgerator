class FreezersController < ApplicationController
  @@fresh = 67
  @@freezer = 60

  def getTemp
    # get the Temperature from redis (later)
    fresh = @@fresh
    freezer = @@freezer
    render json: "{fresh: #{fresh}, freezer: #{freezer}}"
  end

  def postTemp
    fresh = params["fresh"]
    freezer = params["freezer"]
    @@fresh = fresh
    @@freezer = freezer
    render json: "{fresh: #{fresh}, freezer: #{freezer}}"
  end
end