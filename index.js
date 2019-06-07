
/*eslint-env jquery*/
'use strict';
const store=[
  {id: cuid(), name: 'apples', check:false},
  {id: cuid(), name: 'oranges', check:false},
  {id: cuid(), name: 'milk', check:true},
  {id: cuid(), name: 'bread', check:false}
];

function getStoreHtml(){
  return store.map((object,index)=>{
    return `
    <li>
      <span class="shopping-item ${object.check? 'shopping-item__checked':''} " data-item-id="${object.id}" data-item-index="${index}">${object.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
     </li>
    `;
  });
}

function renderShoppingList(){
  const html=getStoreHtml();
  console.log(html);
  $('.shopping-list').html(html);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').on('submit',e=>{
    e.preventDefault();
    let newItem = $('#input').val();
    store.push({id: cuid(), name: newItem, check:false});
    renderShoppingList();
  });
}
function handleItemCheckClicked(){
  $('.shopping-list').on('click','.shopping-item-toggle',e=>{
    e.preventDefault();
    const realTarget= $(e.target).closest('li').find('.shopping-item');
    const index=parseInt(realTarget.attr('data-item-index'));
    store[index].checked=!(store[index].checked);
    renderShoppingList();
  });
}
function handleDeleteItemClicked(){
  $('.shopping-list').on('click','.shopping-item-delete',e=>{
    e.preventDefault();
    store.splice(parseInt($(e.target).closest('li').find('.shopping-item').attr('data-item-index')),1 );
    renderShoppingList();
  });
}


$(()=>{
  
});

function main(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(main);