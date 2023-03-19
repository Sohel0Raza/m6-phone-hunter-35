const loadPhone = async(searchText, dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayPhone(data.data, dataLimit)
    }
    catch(error){
        console.log(error)
    }
}
const displayPhone = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = '';
    // display 20 phone 
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0,9)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // display no phone 
    const noPhone = document.getElementById('no-found')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML =`
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetail">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    //stop loader 
    toggleSpinner(false)
}
const processSearch = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText , dataLimit)
}
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
  processSearch(10)
})
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
    processSearch(10)
    }
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// not the best way to load show all
document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch()
})

const loadPhoneDetails = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailLabel')
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('modal-body');
    phoneDetails.innerHTML=`
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date'}</p>
    `
}
loadPhone('apple')
