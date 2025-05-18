export async function fetchNutrientData(query, nutrientName) {
    const apiKey = 'i04SbxdteRkHfgR39VIqD4nz9rnm4f9kuDR9hlJg'; // Replace with your USDA API key
    const searchUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search';
    try {
        const response = await fetch(`${searchUrl}?query=${query}&api_key=${apiKey}`);
        const data = await response.json();
        console.log(data); // Log the full API response

        // Ensure data contains foods
        if (!data.foods || data.foods.length === 0) {
            console.error('No foods found in the API response:', data);
            document.getElementById(nutrientName).innerText = 'No data found';
            return;
        }

        // Get the first food item from the search results
        const food = data.foods[0];
        const nutrients = food.foodNutrients[0];
        console.log(nutrients.nutrientNumber); // Log the nutrients array
        
        for (let i = 0; i < food.foodNutrients.length; i++) {
            const nutrient = food.foodNutrients[i];
            console.log(nutrient.nutrientName); // Log the nutrient name
            if (nutrient.nutrientName === nutrientName) {
                const nutrientInfo = `${nutrient.value} ${nutrient.unitName}`;
                document.getElementById(nutrientName).innerText = nutrientInfo;
                break; // Exit the loop once the desired nutrient is found
            }
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById(nutrientName).innerText = 'Error loading data';
    }
}
