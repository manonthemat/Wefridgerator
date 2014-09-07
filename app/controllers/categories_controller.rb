class CategoriesController < ApplicationController


  def index 
    @shopping_list_items = Item.where(:container_type => "Shopping List")
    @group = Group.find(params[:group_id])
    @categories = Category.where(:group_id => @group)
    @items = Item.where(category_id: @categories.map(&:id))
    @category_array = @categories.all.map { |f|
        { id: f.id, name: f.name, image: f.image} }.to_json
    # new objects breated on that page
    @message = Message.new
    @item = Item.new

    # items json to get item counts for container_type
    @all_items = @items.all.map(&:id).to_json
    @refridgerator_items = @items.where(container_type: "Refridgerator").all.map(&:id).to_json
    @freezer_items = @items.where(container_type: "Freezer").all.map(&:id).to_json
    @pantry_items = Item.where(container_type: "Pantry").all.map(&:id).to_json
    @shopping_items = Item.where(container_type: "Shopping List").all.map(&:id).to_json
    
    # response for message board
    respond_to do |format|
      format.html
      format.js
    end
  end
  
  def show
  end

  def new
    @category = Category.new
    @item = Item.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end


  def item_json
    # @container = Container.find(params[:id])
    @categories = Category.where(:group_id => @group)
    @items = render json: Item.where(category_id: @categories.map(&:id))
  end


end
