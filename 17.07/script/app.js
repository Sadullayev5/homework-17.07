
const $wrapper = document.querySelector("#wrapper");
const $result = document.querySelector(".result");
const $completeInfoWrapper = document.querySelector(".complete-inf-wrapper");
const $completeInfo = document.querySelector(".complete-inf");


window.addEventListener("load", () =>{
    const $loader = document.querySelector("#loader");
    $loader.classList.add("inactive");
})

fetch("https://dummyjson.com/users")
.then(response => response.json())
.then(data => renderProducts(data))

const renderProducts = (data) =>{
    data.users.map(product => {
        const $card = document.createElement("div")
        $card.classList.add("card");
        const city = product.address.city
        const $buttons = document.createElement("div")
        $buttons.classList.add("buttons");
        $buttons.classList.add("inactive");
        const $blur = document.createElement("div");
        $blur.classList.add("blur");
        $blur.classList.add("inactive");
        $card.innerHTML =`
        <img src="${product.image}">
        <h2>${product.firstName} ${product.lastName}</h2>
        <p class="age">Age: ${product.age}</p>
        <p>Gender: ${product.gender}</p>
        <p>Phone: ${product.phone}</p>
        <p>City: ${city}</p>
        `
        $buttons.innerHTML = `
        <button data-user-id="${product.id}" class="info-btn">More Info</button>
        <button data-user-id="${product.id}" class="delete-btn">Delete</button>`
        $result.appendChild($card);
        $card.appendChild($blur);
        $card.appendChild($buttons);

        $card.addEventListener("mouseover", (e) =>{
            $buttons.classList.remove("inactive");
            $blur.classList.remove("inactive");
        })

        $card.addEventListener("mouseout", (e) =>{
            $buttons.classList.add("inactive");
            $blur.classList.add("inactive");
        })
    })
}

const deleteUser = (e) =>{
    if(e.target.classList.contains("delete-btn")){
        const id = e.target.dataset.userId
        const userAgree = confirm("Are you sure?")
        if(userAgree){
            fetch(`https://dummyjson.com/users/${id}` , {method: "DELETE"})
                .then(response => response.json())
                .then(data => renderProducts(data))
            alert("User successfully deleted")
        }
    }
}

const openInfo = (e) =>{
    if(e.target.classList.contains("info-btn")){
        console.log(e.target);
        $completeInfoWrapper.classList.remove("inactive");
        const id = e.target.dataset.userId
        fetch(`https://dummyjson.com/users/${id}`)
        .then(response => response.json())
        .then(data => renderFullInfo(data))
}}

const renderFullInfo = (product) =>{
        const address = product.address;
        const company = product.company;
        const hair = product.hair;
        const $close = document.createElement("i");
        $close.classList.add("bi");
        $close.classList.add("bi-x-circle");
        $close.classList.add("close-btn");
        $completeInfo.innerHTML = `
        <div class="profile">
                <img src="${product.image}" alt="">
                <div class="account-name">
                    <h2>${product.firstName} ${product.lastName} ${product.maidenName}</h2>
                <p>username: ${product.username}</p>
                <p>birthday: ${product.birthDate}</p>
                <p class="age">Age: ${product.age}</p>
                <p>Gender: ${product.gender}</p>
                <p>Phone: ${product.phone}</p>
                <p>email: ${product.email}</p>
                </div>
            </div>
            <div class="account-content">
                <div class="address">
                    <h3>Address</h3>
                    <p>country: ${address.country}</p>
                <p>state: ${address.state}</p>
                <p>city: ${address.city}</p>
                <p>post code: ${address.postalCode}</p>
                </div>
                <div class="company">
                    <h3>About Company</h3>
                    <p>company name: ${company.name}</p>
                <p>department: ${company.department}</p>
                <p>title: ${company.title}</p>
                </div>
                <div class="about-himself">
                    <h3>About Himself</h3>
                    <p>height: ${product.height}</p>
                    <p>weight: ${product.weight}</p>
                    <p>eye color: ${product.eyeColor}</p>
                    <p>hair: ${hair.type} ${hair.color}</p>
                </div>
            </div>`
            $completeInfo.appendChild($close);
            $close.addEventListener("click", () =>{
                $completeInfoWrapper.classList.add("inactive");
            })
}


$result.addEventListener("click", deleteUser);
$result.addEventListener("click" , openInfo);