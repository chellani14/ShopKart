// function refreshList() {

//     $.get('/shopping_Cart', (data) => {
//         $('#productList').empty()

//         data.sort((a, b) => a.priority - b.priority)

//         for (let prod of data) {
//             $('#productList').append(
//                 ` <div class="column" style="background-color:#aaa;">
//                 <h2>${prod.name} </h2>
//                 <p>price ${prod.price}</p>
//               </div>`
//                // `<li> ${prod.name} : price ${prod.price} <button id="del" onclick=dele(${prod.id})> Delete </button></li>`
//             )
//         }
//     })
// }
// refreshList()

refreshList()

function refreshList() {

    $.get('/shopping_Cart', (data) => {
        $('#productList').empty()

        //data.sort((a, b) => a.priority - b.priority)

        for (let prod of data) {
            
            $('#productList').append(






                `<div class="caption">  <h2 >${prod.name}</h2>
                    <table>
                    <tr><th>
                    <p>My Product description</p>
                    <p><i class="icon icon-map-marker"></i> MRP:<h2 id=pricep> ${prod.price}</h2></p>
                    </th>
                    <th class="qty"><select id="Qty" name="Qty" class="qty">
                  
                        <option value=1 >1</option> 
                        <option value=2>2</option> 
                        <option value=3>3</option> 
     
                    </select></th>
                   <th class="addtocartt"> <button type="button"class="btn btn-danger" onclick=AddtoCart(${prod.id})> <h2>Add To Cart</h2></button> </th>
                    </tr>
                   </table>
                  </div>
                  <div class="modal-footer" style="text-align: left">
                    
                  </div>`
                // `<li> ${prod.name} : price ${prod.price} <button id="del" onclick=dele(${prod.id})> Delete </button></li>`
            )
        }
    })
}


function AddtoCart(id)
{

$.ajax({
    url: `/cartPlace/${id}`,
    method: 'POST',
   
    dataType: 'Application/json'})

}
refreshList()




