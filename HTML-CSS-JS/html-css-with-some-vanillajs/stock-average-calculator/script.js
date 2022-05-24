// storage controller
const StorageCtrl = (function(){
  // public methods
  return {
    storeItem: function(item){
      let items;
      // check if any items exist
      if(localStorage.getItem("items") === null){
        items = [];
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }
      else{
        items = JSON.parse(localStorage.getItem("items"));
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem("items") === null){
        items = [];
      }
      else{
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach(function(item,index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem("items"));
      items.forEach(function(item,index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem("items");
    }
  }
})();


// item controller
const ItemCtrl = (function(){
  // item constructor
  const Item = function(id, number, price){
    this.id = id;
    this.number = number;
    this.price = price;
  }

  // data structure
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    averageStockPrice: 0
  }


  // public methods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(number, price){
      // create ID
      let ID;
      if(data.items.length > 0){
        ID = data.items[data.items.length-1].id + 1;
      }
      else {
        ID = 0;
      }

      // price to number
      price = parseInt(price);

      // create new item & add to item array
      newItem = new Item(ID, number, price);
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function(id){
      let found = null;
      // loop through items
      data.items.forEach(function(item){
        if(item.id == id){
          found = item;
        }
      });

      return found;
    },

    updateItem: function(number, price){
      number = parseInt(number);
      price = parseInt(price);
      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.number = number;
          item.price = price;
          found = item;
        }
      });
      return found;
    },

    deleteItem: function(id){
      // get ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function(){
      data.items = [];
    },

    setCurrentItem: function(item){
      data.currentItem = item;
    },

    getCurrentItem: function(){
      return data.currentItem;
    },
    
    getAveragePrice: function(){
      let totalPrice = 0;
      let totalNumber = 0;
      let average = 0;
      data.items.forEach(function(item){
        totalPrice += (parseInt(item.price)*parseInt(item.number));
        totalNumber += parseInt(item.number);
      });
      average = (totalPrice / totalNumber).toFixed(2);
      data.averageStockPrice = average;

      return data.averageStockPrice;
    },
    
    logData: function(){
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNumberInput: "#item-number",
    itemPriceInput: "#item-price",
    averagePrice: ".average-price",
    listItems: "#item-list li",
    clearBtn: ".clear-btn"
  }

  // public methods
  return {
    populateItemList: function(items){
      let html = "";
      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.number}</strong> stocks for <em>${item.price} dollars</em> each
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`; 
      });

      //insert list items 
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    
    getItemInput: function(){
      return {
        number: document.querySelector(UISelectors.itemNumberInput).value,
        price: document.querySelector(UISelectors.itemPriceInput).value
      }
    },
    addListItem: function(item){
      // show item list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // add class & id
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      // add HTML
      li.innerHTML = `<strong>${item.number}</strong> stocks for <em>${item.price} dollars</em> each
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },

    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute("id");
        if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.number}</strong> stocks for <em>${item.price} dollars</em> each
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
        }
      });
    },

    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
      
    },

    clearInput: function(){
      document.querySelector(UISelectors.itemNumberInput).value = "";
      document.querySelector(UISelectors.itemPriceInput).value = "";
    },

    addItemToForm: function(){
      document.querySelector(UISelectors.itemNumberInput).value = ItemCtrl.getCurrentItem().number;
      document.querySelector(UISelectors.itemPriceInput).value = ItemCtrl.getCurrentItem().price;

      UICtrl.showEditState();
      
    },

    removeItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      });
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = "none";
      
    },

    showAveragePrice: function(averagePrice){
      document.querySelector(UISelectors.averagePrice).textContent = averagePrice;
      
    },

    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      
    },

    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
      
    },
    
    getSelectors: function(){
      return UISelectors;
    }
  }
  
})();

// app controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){

  //load event listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    // add item event
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);

    // disable submit on enter
    document.addEventListener("keypress", function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    // edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener("click", itemEditClick);

    // update item event
    document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit);

    // back button event
    document.querySelector(UISelectors.backBtn).addEventListener("click", UICtrl.clearEditState);

    // delete button event
    document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit);

    // clear-all button event
    document.querySelector(UISelectors.clearBtn).addEventListener("click", clearAllItemsClick);

    
  }


  // add item submit
  const itemAddSubmit = function(e){
    // get form input from UI controller
    const input = UICtrl.getItemInput();

    const reg = /^[1-9][0-9]*$/;

    //check for stock quantity and price
    if(reg.test(input.number) && reg.test(input.price)){
      // add item
      const newItem = ItemCtrl.addItem(input.number, input.price);
      
      // add item to UI list
      UICtrl.addListItem(newItem);

      // get average price
      const averagePrice = ItemCtrl.getAveragePrice();

      // show average price in UI
      UICtrl.showAveragePrice(averagePrice);

      // store in local storage
      StorageCtrl.storeItem(newItem);

      // clear input fields
      UICtrl.clearInput();
    } 
    e.preventDefault();
  }

  // edit item click
  const itemEditClick = function(e){
    if(e.target.classList.contains("edit-item")){
      // get list item id
      const listId = e.target.parentNode.parentNode.id;
      // break into array
      const listIdArr = listId.split('-');
      // get actual ID
      const id = parseInt(listIdArr[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }

  // update item submit
  const itemUpdateSubmit = function(e){
    // get item input
    const input = UICtrl.getItemInput();
    // update item
    const updatedItem = ItemCtrl.updateItem(input.number, input.price);
    // update UI
    UICtrl.updateListItem(updatedItem);
    // get average price
      const averagePrice = ItemCtrl.getAveragePrice();

      // show average price in UI
      UICtrl.showAveragePrice(averagePrice);
    UICtrl.clearEditState();
    e.preventDefault();

    // update local storage
    StorageCtrl.updateItemStorage(updatedItem);
  }

  // delete item submit
  const itemDeleteSubmit = function(e){
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // delete from DS
    ItemCtrl.deleteItem(currentItem.id);
    // delete from UI
    UICtrl.deleteListItem(currentItem.id);
    // get average price
      const averagePrice = ItemCtrl.getAveragePrice();

      // show average price in UI
      UICtrl.showAveragePrice(averagePrice);

    // delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    
    UICtrl.clearEditState();
    e.preventDefault();
  }

  // clear items event
  const clearAllItemsClick = function(){
    // delete all items from DS
    ItemCtrl.clearAllItems();
    // get average price
      const averagePrice = ItemCtrl.getAveragePrice();

      // show average price in UI
      UICtrl.showAveragePrice(averagePrice);
    // delete from the UI
    UICtrl.removeItems();

    // delete from local storage
    StorageCtrl.clearItemsFromStorage();
    // hide ul element
    UICtrl.hideList();
  }
  
  

  return {
    init: function(){

      // set initial state
      UICtrl.clearEditState();
      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // check if any items
      if(items.length === 0){
        UICtrl.hideList();
      }
      else {
        // populate list with items
      UICtrl.populateItemList(items);
      }

      // get average price
      const averagePrice = ItemCtrl.getAveragePrice();

      // show average price in UI
      UICtrl.showAveragePrice(averagePrice);
      
      // load event listeners
      loadEventListeners();
      
      
    }
  }

  
})(ItemCtrl, StorageCtrl, UICtrl);

// initialize app
App.init();
