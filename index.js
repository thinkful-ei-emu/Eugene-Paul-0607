
/*eslint-env jquery*/
'use strict';
const store={
  displayChecked:true,
  searchTerm:'',
  items:[{id: cuid(), name: 'apples', check:false},
    {id: cuid(), name: 'oranges', check:false},
    {id: cuid(), name: 'milk', check:true},
    {id: cuid(), name: 'bread', check:false}]
};

function handleSearch(){
  $('#js-shopping-search-form').on('submit',e=>{
    e.preventDefault();
    console.log($('#search-input').val());
    store.searchTerm=$('#search-input').val();
    renderShoppingList();
  });
}

function getLiHtml(object,index){
  if(object.name.includes(store.searchTerm)){
    return `
      <li>
        <span class="shopping-item ${object.check? 'shopping-item__checked':''} " data-item-id="${object.id}" data-item-index="${index}">${object.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button> <br>
          <label for="shopping-edit-entry">Edit item</label>
          <input id="edit-input" type="text" name="shopping-edit-entry" class="js-shopping-edit-entry">
          <button class="shopping-item-edit", type="submit">
            edit
          </button>
        </div>
      </li>
      `;
  }
  return '';
}

function getStoreHtml(){
  if(store.displayChecked===true){
    return store.items.map((object,index)=>{
      return getLiHtml(object,index);
    });
  }
  else{
    return store.items.map((object,index)=>{
      if(object.check===false){
        return getLiHtml(object,index);
      }
      return '';
    });
  }
  
  
}

function renderShoppingList(){
  const html=getStoreHtml();
  $('.shopping-list').html(html);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').on('submit',e=>{
    e.preventDefault();
    let newItem = $('#add-input').val();
    store.items.push({id: cuid(), name: newItem, check:false});
    renderShoppingList();
  });
}
function handleItemCheckClicked(){
  $('.shopping-list').on('click','.shopping-item-toggle',e=>{
    e.preventDefault();
    const realTarget= $(e.target).closest('li').find('.shopping-item');
    const index=parseInt(realTarget.attr('data-item-index'));
    store.items[index].check=!(store.items[index].check);
    renderShoppingList();
  });
}
function handleDeleteItemClicked(){
  $('.shopping-list').on('click','.shopping-item-delete',e=>{
    e.preventDefault();
    store.items.splice(parseInt($(e.target).closest('li').find('.shopping-item').attr('data-item-index')),1 );
    renderShoppingList();
  });
}

function handleUncheckedOnlyToggle(){
  $('#hide-completed-toggle').change(e=>{
    e.preventDefault();
    store.displayChecked=!(store.displayChecked);
    renderShoppingList();
  });
}



function main(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleUncheckedOnlyToggle();
  handleSearch();
}

$(main);