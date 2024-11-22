const cardContainer = document.getElementById('card-container');
const searchDropdown = document.getElementById('searchDropdown');

// Function to fetch TV show data
async function fetchShows(query) {
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();
    return data.slice(0, 3); // Get only the first 3 shows
}

// Function to create a single card
function createCard(show) {

    const cardCol = document.createElement('div');
    cardCol.className = 'col-lg-4 col-md-4 col-sm-4 mb-4 row flex-lg-column flex-sm-row'; // Responsive column classes

    

    const card = document.createElement('div');
    card.className = 'card shadow h-100'; 

    

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const type = document.createElement('h6');
    type.textContent = show.show.type;

    const title = document.createElement('h3');
    title.textContent = show.show.name;

    const summary = document.createElement('p');
    summary.innerHTML = show.show.summary.slice(0,500) || 'No description available.';

    // const priceStrikethrough = document.createElement('p');
    // priceStrikethrough.className = 'price-strikethrough';
    // priceStrikethrough.textContent = "Price: 4999/-" ;

    // const price = document.createElement('p');
    // price.className = 'price';
    // price.textContent = "4499/-";


    
    const link = document.createElement('a');
    link.className = 'price-card-footer';
    link.href = show.show.url || '#';
    link.textContent = 'Click';
    link.target = '_blank';
    

    cardContent.appendChild(type);
    cardContent.appendChild(title);
    cardContent.appendChild(summary);
    if (show.show.url) cardContent.appendChild(link);

    
    card.appendChild(cardContent);

    return card;
}

// Function to populate the card container
async function populateCards(query) {
    // Clear existing cards
    cardContainer.innerHTML = '';

    // Fetch shows based on the selected query
    const shows = await fetchShows(query);
    shows.forEach((show) => {
        const card = createCard(show);
        cardContainer.appendChild(card);
    });
}

// Event listener for dropdown change
searchDropdown.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
        populateCards(selectedValue); // Populate cards for the selected value
    }
});