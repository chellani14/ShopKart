

var sum=0;
let subtotal=0
function refreshList() {

    $.get('/cartPlace', (data) => {
        
        $('#AddProductToCart').empty()

        // data.sort((a, b) => a.priority - b.priority)
 
        for (let prod of data) { 
         
        
            sum=sum+prod.price;
            let st = '#totprice' + prod.id
            $(st).text(sum)
          $('#cart-subtotal').text(sum)
         
            $('#AddProductToCart').append(
                
                `  <li><div class="product">
       
        <div class="product-details">
          <div class="product-title">${prod.name} </div>
          <p class="product-description">This is product 1 and quantity to add more .</p>
        </div>
        <div class="product-price"> ${prod.price}</div>
        <div class="product-quantity">
          <input id="qt" type="number" value=1 min="1"><button onclick=incrementCart(${prod.price},${prod.id})>+</button>
        </div>
        <div class="product-removal">
          <button class="remove-product" onclick=dele(${prod.id})>
            Remove
          </button>
        </div>
        <div class="product-line-price"><b id="totprice${prod.id}"> </b></div>
      </div></li>`

      

      


                // `<li> ${prod.name} : price ${prod.price}  <button id="del" onclick=dele(${prod.id})> Delete </button></li>`
            )

           
           
            
        }        
        

    })
}


function incrementCart(price, pid) {

    let toprodprice = $('#qt').val()
    totalpr = toprodprice * price
    
    let st = '#totprice' + pid
    $(st).text(totalpr)

    
}
let count=0
function noofPro()
{
    $.get('/cartPlace', (data)=>{
        for (let prod of data)
        {      count=count+1;
        } alert(count)
       
    })
}

function dele(id) {
    alert("hd")
count--;
    $.ajax({
        url: `/cartPlace/${id}`,
        method: 'DELETE',

        dataType: 'Application/json'
    })
    refreshList()
}




refreshList()
