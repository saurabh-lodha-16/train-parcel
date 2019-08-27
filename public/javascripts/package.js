function changeURL(){
    let searchField = document.getElementById('search')
    window.location = `/package/track/${searchField.value}`
}