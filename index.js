
/*eslint-env jquery*/
'use strict';
const store={
  displayChecked:true,
  searchTerm:'',
  items:[
    {id: cuid(), name: 'apples', check:false, createdAt: Date.now() - 600000},
    {id: cuid(), name: 'oranges', check:false, createdAt: Date.now() - 500000},
    {id: cuid(), name: 'milk', check:true, createdAt: Date.now() - 400000},
    {id: cuid(), name: 'bread', check:false, createdAt: Date.now()}
  ],
  sortBy:'alpha'

};

function fromElementGetIndexInsideStore(e){
  const realTarget= e.closest('li').find('.shopping-item');
  const realid=realTarget.attr('data-item-id');
  return store.items.findIndex((object)=>{
    return object.id===realid? true:false;
  });
}

function dateToString(time){
  let date= new Date(time);
  return date.toString();
}

/**
 * changes the sortBy property in STORE
 * @param {*} sortValue 
 */
function changeSortBy(sortValue){
  store.sortBy=sortValue;
}

/**
 * handle the select menu on change
 */
function handleChangeSortBy(){
  $('#sort-select').change(e=>{
    e.preventDefault();
    const sortValue=$(e.target).val();
    changeSortBy(sortValue);
    renderShoppingList();
  });
}

function handleSearch(){
  $('#js-shopping-search-form').on('submit',e=>{
    e.preventDefault();
    store.searchTerm=$('#search-input').val();
    renderShoppingList();
  });
}

function getLiHtml(object,index){
  if(object.name.includes(store.searchTerm)){
    return `
      <li>
        <span class="shopping-item ${object.check? 'shopping-item__checked':''} " data-item-id="${object.id}" data-item-index="${index}">${object.name}</span>
        <br>
        <span>${dateToString(object.createdAt)} </span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button> <br>
          <form class="edit-item-form" action="" type='post'>
            <label for="shopping-edit-entry">Edit item</label>
            <input class="edit-input" type="text" name="shopping-edit-entry" class="js-shopping-edit-entry">
            <button class="shopping-item-edit", type="submit">
              edit
            </button>
          </form>
        </div>
      </li>
      `;
  }
  return '';
}

function getStoreHtml(itemsList){
  
  if(store.displayChecked===true){
    return itemsList.map((object,index)=>{
      return getLiHtml(object,index);
    });
  }
  else{
    return itemsList.map((object,index)=>{
      if(object.check===false){
        return getLiHtml(object,index);
      }
      return '';
    });
  }
}

function renderShoppingList(){
  let itemsCopy=[...store.items];
  if(store.sortBy==='alpha'){
    itemsCopy.sort((a,b)=>a.name>b.name? 1:-1);
  }
  else if(store.sortBy==='time'){
    itemsCopy.sort((a,b)=>-b.createdAt+a.createdAt);
  }
  else if(store.sortBy==='mostRecent'){
    itemsCopy.sort((a,b)=>-a.createdAt+b.createdAt);
  }
  const html=getStoreHtml(itemsCopy);
  $('.shopping-list').html(html);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').on('submit',e=>{
    e.preventDefault();
    let newItem = $('#add-input').val();
    store.items.push({id: cuid(), name: newItem, check:false, createdAt: Date.now()});
    renderShoppingList();
  });
}
function handleItemCheckClicked(){
  $('.shopping-list').on('click','.shopping-item-toggle',e=>{
    e.preventDefault();
    const index=fromElementGetIndexInsideStore($(e.target));
    store.items[index].check=!(store.items[index].check);
    renderShoppingList();
  });
}
function handleDeleteItemClicked(){
  $('.shopping-list').on('click','.shopping-item-delete',e=>{
    e.preventDefault();
    const index=fromElementGetIndexInsideStore($(e.target));
    store.items.splice(index,1 );
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

function handleEdit(){
  $('.shopping-list').on('submit','.edit-item-form',e=>{
    e.preventDefault();
    const newVal=$(e.target).children('input').val();
    const index=fromElementGetIndexInsideStore($(e.target));
    store.items[index].name=newVal;
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
  handleChangeSortBy();
  handleEdit();
}

$(main);