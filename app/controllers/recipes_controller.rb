class RecipesController < ApplicationController
  @@api_key = "65e4b128b9dbb66270e2680470eb5b87"
  @@base_url = "http://food2fork.com/api/"
  @@cache = {}

  def search_with_items_in_wefridgerator
    milksay
    ingredients = Item.where(user: current_user).all.map(&:name)
    if @@cache.include?ingredients
      result = @@cache[ingredients]
    else
      r = HTTParty.get(@@base_url + "search?key=" + @@api_key + "&q=" + ingredients.join(','))
      result = JSON.parse(r)
      @@cache[ingredients] = result
    end
    milksay
    puts "============================="
    puts "#{params[:post]}"
    puts "============================="
    puts r
    render json: result
  end

  def get_recipe
    id = params[:id]
    if @@cache.include?id
      result = @@cache[id]
    else
      r = HTTParty.get(@@base_url + "get?key=" + @@api_key + "&rId=" + id)
      result = JSON.parse(r)
      @@cache[id] = result
    end
    milksay
    puts "============================="
    puts r
    puts "============================="
    render json: result
  end

  def index
  end
end
