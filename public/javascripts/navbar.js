function changeURL(){
    let searchField = document.getElementById('search_pkg_nav')
    window.location = `/package/track/${searchField.value}`
}