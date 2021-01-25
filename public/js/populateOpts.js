const optGroups = document.querySelectorAll('optgroup');

const getDndInfoUrl = 'https://www.dnd5eapi.co/api/';






function PopulateOptGroups() {

    let categories = [];

    for (let optGroup of [...optGroups]) {
        fetch(`${getDndInfoUrl + optGroup.id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log(data);
                categories = data;
                AddOptsToOptGroups(categories, optGroup);
            })
            .catch(() => {
                console.log('An error successfully ocurred!');
            });
    }


}




function getRPGInfo(customEndpoint) {
    if (customEndpoint === '') {
        displayError('please fill in all the options');
    }

    let requestURL = getDndInfoUrl + `${customEndpoint}`;

    console.log(requestURL);

    fetch(requestURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayNewCategory(customEndpoint.split('/')[0], JSON.stringify(data, null, 4));
        })
        .catch(() => {
            console.log('An error successfully ocurred!');
        });
}



function displayNewCategory(category, info) {

    if (displayedCategories.length <= 0) {
        let newCategory = characterCategory.cloneNode(true);

        newCategory.id = category;

        newCategory.firstElementChild.textContent = category;
        newCategory.lastElementChild.textContent = info;

        characterCategory.parentNode.appendChild(newCategory);
        displayedCategories.push(newCategory);
    }


    let displayedCategoriesNames = displayedCategories.map((c) => c.id);


    if (displayedCategoriesNames.includes(category)) {
        displayedCategories.find(c => c.id === category).lastElementChild.textContent = info;
        return;
    }
    else {
        let newCategory = characterCategory.cloneNode(true);

        newCategory.id = category;

        newCategory.firstElementChild.textContent = category;
        newCategory.lastElementChild.textContent = info;

        characterCategory.parentNode.appendChild(newCategory);
        displayedCategories.push(newCategory);
    }


}



function AddOptsToOptGroups(jsonData, optGroup) {

    if (!Object.keys(jsonData).includes('results'))
    {
        for (let atribute of Object.keys(jsonData))
        {
            let opt = document.createElement('option');
            opt.value = atribute;
            opt.textContent = atribute;

            optGroup.appendChild(opt);
        }
        return;
    }

    for (let category of jsonData['results']) {

        let opt = document.createElement('option');
        opt.value = category['index'];
        opt.textContent = category['name'];

        optGroup.appendChild(opt);

    }

}


PopulateOptGroups();