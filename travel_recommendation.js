const btnSearch = document.getElementById('btnSearch');

function handleInput(userInput)
{
    if(userInput.toLowerCase() === "country")
        return "countries";

    if(userInput.toLowerCase() === "temple")
        return "temples";

    if(userInput.toLowerCase() === "beach")
        return "beaches";

    return userInput.toLowerCase();
}

function searchDest()
{
	const input = document.getElementById('searchInput').value.toLowerCase();
    console.log("search input" + input);
	const destinations = document.getElementById('destinations-grid');
	destinations.innerHTML = '';

	fetch('travel_recommendation_api.json')
	  .then(response => response.json())
	  .then(data => 
        {
		    const key = Object.keys(data).find(item => item.toLowerCase() === handleInput(input));
			if (key)
            {
                const selectedArray = data[key];
                for(const item of selectedArray)
                {
                    console.log(item.name);

                    let appended = `<div class="city-card">`
                    + `<div class="city-photo-wrapper">`
                    + `<img src="${item.imageUrl}" alt="${item.name}" class="city-photo">`
                    + `</div>`
                    + `<div class="city-info">`
                    + `<h3>${item.name}</h3>`
                    + `<p class="city-desc">${item.description}</p>`
                    + `</div>`
                    + `</div>`;

                    destinations.innerHTML += appended;
                    
                }


            } else {
                destinations.innerHTML = 'No Result.';
			}
		})
		.catch(error => {
			console.error('Error:', error);
			destinations.innerHTML = 'An error occurred while fetching data.';
		});
}
	
btnSearch.addEventListener('click', searchDest);
