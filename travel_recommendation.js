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

function searchDest()
{
	const input = document.getElementById('searchInput').value.toLowerCase();
    //console.log("search input" + input);
	const destinations = document.getElementById('destinations-grid');
	destinations.innerHTML = '';

	fetch('travel_recommendation_api.json')
	  .then(response => response.json())
	  .then(data => 
        {
		    const key = Object.keys(data).find(item => item.toLowerCase() === handleInput(input));
			if (key)
            {
                let selectedArray;

                if(key === "countries")
                {
                    const countriesdArray = data.countries;

                    for(const item of countriesdArray)
                    {
                        selectedArray = item.cities;

                        for(const item of selectedArray)
                    {
                    //console.log(item.name);

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


                        //citiesArray.forEach(element => {
                        //    console.log(element.name);
                        //});  

                        //let selectedArray = item.forEach(element => {
                            //console.log(item.cities);
                        //});
                    }

                    
                }
                else
                {
                    selectedArray = data[key];

                    for(const item of selectedArray)
                    {
                    //console.log(item.name);

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


function searchReset()
{
	document.getElementById('searchInput').value = '';
	
	document.getElementById('destinations-grid').innerHTML = '';
}

btnReset.addEventListener('click', searchReset);


