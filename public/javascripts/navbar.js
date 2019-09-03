function changeURL(){
    let searchField = document.getElementById('search_pkg_nav')
    window.location = `/packages/track/${searchField.value}`
}