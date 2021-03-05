async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const request = await fetch(endpoint)
    const restaurants = await request.json()

    function findMatches(zipToMatch, restaurants) {
        return restaurants.filter(place => {
            const regex = new RegExp(zipToMatch, 'gi');
            return place.zip.match(regex) || place.name.match(regex)
        });
    }
    
    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, restaurants);
        const html = matchArray.map(place => {
            const regex = RegExp(event.target.value, 'gi');
            const restName = place.name.replace(regex, `<span class="/h1">${event.target.value}</span>`);
            const restZip = place.zip.replace(regex, `<span class="/h1">${event.target.value}</span>`);
            return `
                <li>
                    <span class="name">${restName}</span>
                    <span class="address">${place.address_line_1}</span>
                    <span class="zip">${restZip}</span>
                    <span class="category">${place.category}</span>
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