function loadItems(){
    return fetch('data/dat.json')
    .then(response => response.json())
    .then(json =>json.items);
}

loadItems()
.then(items =>{
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);