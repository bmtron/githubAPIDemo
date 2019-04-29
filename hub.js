function handleSearch() {
    $('fieldset').on('click', 'button', event => {
        event.preventDefault();
        $('.clear').remove();
        let userInput = $('input').val();
        getParam(userInput);
        $('input').val("");
    });
}
function getParam(val) {
    
    fetch(`https://api.github.com/users/${val}/repos?type=all`)
    .then(response =>  {
        if (response.ok){
        return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => addLink(responseJson))
    .catch(error => $('.results').append(`<p class="clear">Error: ${error.message}</p>`));
    
}
function addLink(param) {
    for (let i = 0; i < param.length; i++) {
        $('.results').append(`<p class="clear">Name of Repo: ${param[i].name}</p><a href="${param[i].html_url}" target="_blank" class="clear">Live Link</a>`);
    }
}
$(handleSearch);