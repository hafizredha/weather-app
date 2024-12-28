<script>
    export default{
        name: 'CitySearch',
        data(){
            return {
                query: '',
                cities: [],
            }
        },
        methods: {
            fetchSuggestions: debounce(async function() {
                if (this.query.length > 2) {
                    try{
                        const response = await fetch(`/api/cities?query=${this.query}`);
                        this.cities = await response.json();
                        console.log(this.cities);
                    }catch(error){
                        console.error('Error fetching cities:', error);
                        this.cities = [];
                    }
                } else {
                    this.cities = [];
                }
            }, 300 ),
            selectCity(city) {
                this.query = `${city.name}, ${city.country}`;
                this.cities = [];
                // Perform additional actions, e.g., emit an event
                this.$emit('city-selected', city);
            },
        }
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
</script>

<template>
    <input 
        type="text" 
        v-model="query" 
        @input="fetchSuggestions" 
        placeholder="Search for a city"
    />
     <ul v-if="cities.length > 0">
        <li 
            v-for="(city, index) in cities" 
            :key="index" 
            @click="selectCity(city)"
        >
            {{ city.name }}, {{ city.country }}
        </li>
    </ul>
</template>