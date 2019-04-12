



function refreshList() {
    console.log("gettin products")
   
    $.get('/vendorsPlace',(data)=>{
        $('#vendor').empty()
        for(vendor of data)
        {
            
            $('#vendor').append(
                `<option value="${vendor.id}">${vendor.name}</option>`
            )
            console.log(vendor.id)
            
           
        }
    })
    $.get('/shopping_Cart', (data) => {


        
        $('#productList').empty()

       // data.sort((a, b) => a.priority - b.priority)

        for (let prod of data) {
            $('#productList').append(
                `          
                <li><table> <tr><th>${prod.name}</th> <th>price= ${prod.price}</th> <th> Quantity: ${prod.Quantity}</th>    
             
               <th> <button class="delb" style="background:url(https://cdn.iconscout.com/icon/free/png-256/delete-737-475058.png)" id="del" onclick=dele(${prod.id})><img src="https://cdn.iconscout.com/icon/free/png-256/delete-737-475058.png" alt="Smiley face" height="15" width="15"></button></th><tr></table></li>`
            )
        }
    })
   
   
}

function dele(id) {
   
   console.log("fwygfyfwfwgf")
    $.ajax({
        url: `/shopping_Cart/${id}`,
        method: 'DELETE',
       
        dataType: 'Application/json'})
}


function add() {

    $.post(
        '/shopping_Cart',
        
        {
            name: $('#fname').val(),
            price: $('#price').val(),
            vendorId:$('#vendor').val(),
            Quantity:$('#Quantity').val()
            
        },
        (data) => {
            if (data.success) {
                refreshList()
            } else {
                alert('Some error occurred')
            }
        }
    )
}

refreshList()
