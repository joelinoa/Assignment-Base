async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint)
    const restaurants = await request.json()

    function findMatches(zipToMatch, restaurants) {
        return restaurants.filter(place => {
            const regex = new RegExp(zipToMatch, 'gi');
            return place.zip.match(regex) || place.name.match(regex) || place.category.match(regex)
        });
    }
    
    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, restaurants);
        const html = matchArray.map(place => {
            const regex = RegExp(event.target.value, 'g');
            const restName = place.name.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const restZip = place.zip.replace(regex, `<span class="hl">${event.target.value}</span>`);
            return `
                <li>
                    <span class="name">${restName}</span></br>
                    <span class="category">${place.category}</span></br>
                    <span class="address">${place.address_line_1} </span></br>
                    <span class="address">${place.state} </span>
                    <span class="address">${place.zip} </span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search')
    const suggestions = document.querySelector('.suggestions')
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});

}
window.onload = windowActions;