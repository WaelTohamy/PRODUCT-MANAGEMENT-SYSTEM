//Comment Way

// Call all IDs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'Create';
let temp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

// get total
function getTotal()
{
//console.log("Done")
    if(price.value != ''){
        let result= +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML=result;
        total.style.background= '#040';
    }else{
        total.innerHTML='';
        total.style.background= '#a50707';
    }
}

// create product

let dataPro;
if(localStorage.Product != null)
{
    dataPro = JSON.parse(localStorage.Product)
}else{
    dataPro=[];
}

submit.onclick = function()
{
    let newPro = 
    {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // count
    if(mood==='Create'){
        if(newPro.count > 1)
        {
            for (let i=0; i < newPro.count; i++)
            {
                dataPro.push(newPro);
            }
        }else{
                dataPro.push(newPro);
            }
    }else{
        dataPro[temp]= newPro;
        mood = 'Create';
        submit.innerHTML='Create';
        count.style.display = 'none';
    }
    //----------

    

// Save Local Storage

    localStorage.setItem('Product', JSON.stringify(dataPro));
    // console.log(dataPro)
    cleardata()
    ShowData()
}

// clear inputs

function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

// read

function ShowData()
{
    getTotal()
    let table ='';
    for (let i=0; i< dataPro.length; i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="UpdateData(${i})"id="Update">Update</button></td>
            <td><button onclick="DeleteData(${i})" id="Delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('DeleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="DeleteAll()">Delete All ( ${dataPro.length} )</button>
        `
    }else{
        btnDelete.innerHTML ='';
    }

}

ShowData()

// delete One Row
function DeleteData(i)
{
    //console.log(i)
    dataPro.splice(i,1);
    localStorage.Product=JSON.stringify(dataPro)
    ShowData()
}

// delete ALL Rows
function DeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    ShowData()
}


// count
// update
function UpdateData(i)
{
    //console.log(i);
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    temp = i;
    scroll(
        {
            top:0,
            behavior:"smooth",
        }
    )
}


// search

let SearchMood = 'Title';
function GetSearchMood(id)
{
    //console.log(id)
    let search = document.getElementById('search');
    if(id =='searchTitle'){
        SearchMood = 'Title';
        search.placeholder = 'Search By Title';
    }else{
        SearchMood = 'Category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
    search.value='';
    ShowData();
    //console.log(SearchMood)
}


function SearchData(value)
{
    //console.log(value);
    let table='';
    if(SearchMood =='Title')
    {
        for(i=0; i<dataPro.length; i++)
        {
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="UpdateData(${i})"id="Update">Update</button></td>
                    <td><button onclick="DeleteData(${i})" id="Delete">Delete</button></td>
                </tr>
                `;

            }
        }

    }else{
        for(i=0; i<dataPro.length; i++)
        {
            if(dataPro[i].category.includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="UpdateData(${i})"id="Update">Update</button></td>
                    <td><button onclick="DeleteData(${i})" id="Delete">Delete</button></td>
                </tr>
                `;

            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}



// clean data