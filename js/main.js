
document.querySelector('button').addEventListener('click', getFetch)

// UPC testers: 737628064502, 036632028082

function getFetch(){

    let upc = document.querySelector('input').value.toString()

    if(upc){

        console.log(upc)
        // upc = 737628064502 //TESTING - DELETE LATER

        document.querySelector('#img-main-small-div').style.display='flex'

        fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`)

        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.status_verbose)

            if(data.status !== 1) {
                alert("Product not found. Please try again.")
            } else {
                // Set product info values
                document.querySelector('#product-name').innerText= data.product.product_name ? data.product.product_name : data.product.generic_name
                
                document.querySelector('#brand').innerText=data.product.brands ? data.product.brands : ''
                
                data.product.image_front_small_url ? document.querySelector('#img-main-small').src = data.product.image_front_small_url : document.querySelector('#img-main-small-div').style.display='none'   
                
                console.log(`Answer is ${document.querySelector('#img-main-small').naturalWidth}`)
                
                document.querySelector('#ingredients').innerText=data.product.ingredients_text_with_allergens ? data.product.ingredients_text_with_allergens : ''
                
                document.querySelector('#allergens').innerText=data.product.allergens_from_ingredients ? data.product.allergens_from_ingredients : ''
                
                document.querySelector('#labels').innerText=data.product.labels ? data.product.labels : '' 

                // Display all product info
                document.getElementById('product-info').style.display = 'flex'
            }           
            
        })

        .catch(err => {
            alert(err)
        });

    } else {
        return;
    }

    
}

