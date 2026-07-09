const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

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


function createCityCard(item)
{
    return `<div class="city-card">`
        + `<div class="city-photo-wrapper">`
        + `<img src="${item.imageUrl}" alt="${item.name}" class="city-photo">`
        + `</div>`
        + `<div class="city-info">`
        + `<h3>${item.name}</h3>`
        + `<p class="city-desc">${item.description}</p>`
        + `</div>`
        + `</div>`;
    
}

function searchDest()
{
	const input = document.getElementById('searchInput').value.toLowerCase();
	const destinations = document.getElementById('destinations-grid');

    if(input.trim() === '')
        return;

    destinations.innerHTML = '';

	fetch('travel_recommendation_api.json')
	  .then(response => response.json())
	  .then(data => 
        {
		    const key = Object.keys(data).find(item => item.toLowerCase() === handleInput(input));
			if (key)
            {
                if(key === "countries")
                {
                    for(const c of data.countries)
                    {
                        for(const item of c.cities)
                        {
                            destinations.innerHTML += createCityCard(item);
                        }
                    }
                }
                else
                {
                    for(const item of data[key])
                    {
                        destinations.innerHTML += createCityCard(item);
                    }
                }
            } else {
                destinations.innerHTML = '';
                console.log('Search No result')
			}
		})
		.catch(error => {
            console.log('An error occurred while fetching data.')
			console.error('Error:', error);
			destinations.innerHTML = '';
         });
}
	
btnSearch.addEventListener('click', searchDest);


function searchReset()
{
	document.getElementById('searchInput').value = '';
	
	document.getElementById('destinations-grid').innerHTML = '';
}

btnReset.addEventListener('click', searchReset);


