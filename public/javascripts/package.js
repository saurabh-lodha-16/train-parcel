function changeURL() {
    let searchField = document.getElementById('search')
    window.location = `/package/track/${searchField.value}`
}


function calculateAmount() {
    let weight = parseFloat(document.getElementById('weight').value)
    document.getElementById('amount').value = weight * 100;
}