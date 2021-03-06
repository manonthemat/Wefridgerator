class ItemsController < ApplicationController
  before_action :get_category, only: [:index, :show, :edit, :create, :update, :destroy]
  skip_before_filter  :verify_authenticity_token
  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def new_container_item
    @item = Item.new
    @category = Category.find(params[:id])
  end

  def new_shopping_list_item
    @item = Item.new
    @category = Category.find(params[:id])
  end

  def create
    @item = @category.items.new(item_params)
    @item.user = current_user
    @item.container_type = params[:container_type]
    #This container type refers to the param name we put in the Items show view
    @item.container_type = "Shopping List" if @item.container_type == nil
    #Assigns container type to items dropped in the shopping list

    if @item.save
      
      redirect_to group_categories_path(@category.group_id)
    else
      render 'new'
    end
  end

  def create_speech
    @category = Category.find(params[:id])
    @item = Item.new(item_params)
    @item.user = current_user
    @item.category = @category
    @item.container_type = "Refridgerator"

    if @item.save
      @item_saved = "it saved"
      redirect_to "group_categories_path(@group)"
    else
      @item_saved = "it didn't save"
      redirect_to "new_group_path"
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def update
    @item = Item.find(params[:id])
    if @item.update_attributes(item_params)
      @item.update_attribute(:container_type, change_container(@item))
      redirect_to group_categories_path(@category.group_id)
    else
      render 'edit'
    end
  end

  def update_item
    @category = Category.find(params[:category_id])
    @item = Item.find(params[:id])
    @item.update_attribute(:container_type, change_container(@item))
    @item.update_attribute(:exp_date, nil)
    #change_container(@item)
    redirect_to group_categories_path(@category.group_id)
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    redirect_to group_categories_path(@category.group_id)
  end

  private
  def item_params
    params.require(:item).permit(:name, :category_id, :container_type, :user_id, :exp_date, :quantity, :is_private)
  end

  def get_category
    @category = Category.find(params[:category_id])
  end

  def change_container(item)
    if item.container_type == "Refridgerator" || item.container_type == "Freezer" || item.container_type == "Pantry"
      item.container_type = "Shopping List"
    else
      item.container_type = params[:container_type]
    end
  end

end