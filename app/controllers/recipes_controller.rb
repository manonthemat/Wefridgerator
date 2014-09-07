class RecipesController < ApplicationController
  @@api_key = "65e4b128b9dbb66270e2680470eb5b87"
  @@base_url = "http://food2fork.com/api/search"
  @@cache = {}
  @@a = 0

  def inc
    @@a += 1
    @a = @@a
  end

  def search_with_items_in_wefridgerator
    ingredients = ['beef', 'basil']
    if @@cache.include?ingredients
      result = @@cache[ingredients]
    else
      r = HTTParty.get(@@base_url + "?key=" + @@api_key + "&q=" + ingredients.join(','))
      result = JSON.parse(r)
      @@cache[ingredients] = result
    end
    puts "============================="
    puts "#{params[:post]}"
    puts "============================="
    puts r
    render json: result
  end

  def index
  end
end
