import { inject } from 'vue'
import { useRouter } from 'vue-router';

export default function useRedirect() {
    const axios = inject('axios')
    // DATA
    const router = useRouter()
    // METHODS
    async function getList(endpoint) { return axios.get(`http://localhost:8000/api/${endpoint}`) }
    function showElementsBy(row, type) { goto('elements',{ type, id: row.id }) } // type = 'category'
    function goto(path, params=null) { router.push({name: path, params}) }

    return {
        //data
        axios, // in case you use this composable but have extra endpoints you may no require to inject axios again
        //methods
        getList,
        showElementsBy,
        goto
    }
}