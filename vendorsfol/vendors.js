function refreshList() {
    
    $.get('/vendorsPlace', (data) => {
        $('#vendorList').empty()

     //   data.sort((a, b) => a.priority - b.priority)

        for (let vendor of data) {
            $('#vendorList').append(
                      

                `<li> <table> <tr><th>${vendor.name} </th> <th>  ${vendor.contact_Number} </th> <th><button style="background:url(https://cdn.iconscout.com/icon/free/png-256/delete-737-475058.png)" id="del" onclick=dele(${vendor.id})><img src="https://cdn.iconscout.com/icon/free/png-256/delete-737-475058.png" alt="Smiley face" height="15" width="15"> </button></th><tr></table></li>`
            )
        }
    })
}

function dele(id) {
   
     $.ajax({
         url: `/vendorsPlace/${id}`,
         method: 'DELETE',
        
         dataType: 'Application/json'})
 }


function addVendors()
{
    $.post('/vendorsPlace', 
    {
        name:$('#fname').val(),
        contact_Number:$('#contact').val()
    },
    (data)=>{
        if(data.success)
        {
            refreshList()
        }
        else{
            alert("Some error Occured while adding vendor")
        }
    }


    )
}

refreshList()


