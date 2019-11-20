const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search json.state and filter it

const searchStates = async searchText => {
  let response = await fetch('../data/ng.states.json');
  let states = await response.json();

  //console.log(states.nicknames);

  // Get matches to current text input
  let matches = states.states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.code.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outputHtml(matches);
};

//show results in html

const outputHtml = function(matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
    <div class="card card-card-body mb-2">
      <h5>${match.name} (${match.code}) <span class="text-warning">${match.capital_city}</span></h5>
      <p>Slogan: ${match.nicknames}</p>
      <p>Total LGA in: ${match.name} State: ${match.local_government_areas.length}</p>
      ${match.local_government_areas.map(
        lga => `
        <span> ${lga.name} (${lga.code}) </span>`
      )}
      <div>`
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value));
