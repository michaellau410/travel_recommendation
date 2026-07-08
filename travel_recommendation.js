const btnSearch = document.getElementById('btnSearch');

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
            console.log(Object.keys(data));

		    const countries = data.countries.filter(item => item.name.toLowerCase() === input);
			if (countries)
            {
                console.log(countries.name);
                /*
			  const symptoms = condition.symptoms.join(', ');
			  const prevention = condition.prevention.join(', ');
			  const treatment = condition.treatment;

			  resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
			  resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

			  resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
			  resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
			  resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
                */
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