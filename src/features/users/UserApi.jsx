const BASE_URL = 'https://dummyjson.com/users';

async function getFetch(url){
    try{
        // const url = buildURL();
        console.log(url);
        const data = await fetch(url);
        const response = await data.json();
        return response;
    }
    catch(error){
        alert(`Ошибка при загрузке таблицы! Описание: ${error}`)
    }
}

function buildURL({ limit, currentPage, sort, filter }) {
    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('skip', (currentPage - 1) * limit);
    if (sort.field && sort.order) {
        params.append('sortBy', sort.field);
        params.append('order', sort.order);
    }
    if(filter.key && filter.value){
        params.append('key', filter.key);
        params.append('value', filter.value);
        return `${BASE_URL}/filter?${params.toString()}`;
    }
    return `${BASE_URL}?${params.toString()}`;
}

const api = {
    getFetch,
    buildURL,
} 

export default api;