class FreezersController < ApplicationController
  require 'm2x'
  @@feed = '38dcdb5b1685de295f5bba72fe6569a0'
  @@m2x = M2X.new('960e2f4da5d1cee68a17b65eb2127cba')

  def getTemp
    fresh = @@m2x.feeds.streams(@@feed).json['streams'].first['value']
    freezer = @@m2x.feeds.streams(@@feed).json['streams'].last['value']
    result = "#{fresh} #{freezer}"
    result = result.to_json
    render json: result
  end
end
