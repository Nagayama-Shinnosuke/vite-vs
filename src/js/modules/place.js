export const placeSelector = () => {
    console.log("地域セレクター読み込み完了");

    const rootElm = document.getElementById('areaSelector');

    async function initAreaSelector() {
        await updatePref();
        await updateCity();

        const prefSelectorElm = rootElm.querySelector('.prefectures');
        prefSelectorElm.addEventListener('change', updateCity);
    }

    async function getPrefs() {
        const prefResponse = await fetch('/data/prefectures.json');
        return await prefResponse.json();
    }

    async function getCities(prefCode) {
        const cityResponse = await fetch(`/data/cities/${prefCode}.json`);
        return await cityResponse.json();
    }

    /**
    async function displayPrefs() {
        const result = await getPrefs();
        console.log(result);
    }
    **/

    async function updatePref() {
        const prefs = await getPrefs();
        createPrefOptionsHtml(prefs);
    }

    async function updateCity() {
        const prefSelectorElm = rootElm.querySelector('.prefectures');
        const cities = await getCities(prefSelectorElm.value);
        // createPrefOptionsHtml(cities);
        createCityOptionsHtml(cities);
    }

    function createPrefOptionsHtml(prefs) {
        const optionStrs = [];
        for (const pref of prefs) {
            optionStrs.push(`
                <option name="${pref.name}" value=${pref.code}>${pref.name}</option>
            `);
        }

        const prefSelectorElm = rootElm.querySelector('.prefectures');
        prefSelectorElm.innerHTML = optionStrs.join('');
    }

    function createCityOptionsHtml(cities) {
        const optionStrs = [];
        for (const city of cities) {
            optionStrs.push(`
                <option name = "${city.name}" value=${city.code}>${city.name}</option>
            `);
        }

        const citySelectorElm = rootElm.querySelector('.cities');
        citySelectorElm.innerHTML = optionStrs.join('');
    }

    // displayPrefs();
    // updatePref();
    initAreaSelector();
}
