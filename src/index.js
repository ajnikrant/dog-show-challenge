getDogs()



const dogTable = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")

function getDogs(){
    return fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(renderDogTable)
}

function renderDogTable(dogArray){
    dogArray.forEach(dog =>{
        dogTable.innerHTML+=`
        <tr data-id="${dog.id}"><td> ${dog.name}</td> <td> ${dog.breed}</td> <td> ${dog.sex}</td> <td><button class='btn'>Edit Dog</button></td></tr>
        `
    })
}

dogTable.addEventListener("click", event =>{
    if (event.target.className === 'btn'){
        const dogId = event.target.parentElement.parentElement.dataset.id

        fetch(`http://localhost:3000/dogs/${dogId}`)
        .then(res => res.json())
        .then(renderEditForm)
    }
})

function renderEditForm(dogObj){
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
    dogForm.dataset.id = dogObj.id
}


dogForm.addEventListener("submit", event=>{
    event.preventDefault()
    dogId = event.target.dataset.id

    const name= event.target.name.value
    const breed= event.target.breed.value
    const sex= event.target.sex.value
    
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, breed, sex})
    })
    .then(res => res.json())
  
    let tableEntry = document.querySelector(`#table-body > tr:nth-child(${dogId})`)
    let tableName = document.querySelector(`#table-body > tr:nth-child(${dogId}) > td:nth-child(1)`)
    let tableBreed = document.querySelector(`#table-body > tr:nth-child(${dogId}) > td:nth-child(2)`)
    let tableSex = document.querySelector(`#table-body > tr:nth-child(${dogId}) > td:nth-child(3)`)

    tableName.innerText = name
    tableBreed.innerText = breed
    tableSex.innerText = sex
    
})

