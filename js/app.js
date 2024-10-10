
const cardDiv = document.getElementById("card");

const getPhones = async(brand)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${brand}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(false ,data.data);
    document.getElementById("allBtn").addEventListener("click", ()=>{
        cardDiv.innerHTML = "";
        displayPhones(true, data.data);
    });
}

const getDetails = async(slug)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    detailsDisplay(data.data);
};

const detailsDisplay=(item)=>{
   document.getElementById("modal1").show();
    const modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = `
       <div class= "flex mb-4 justify-center items-center bg-slate-200 p-3 rounded-xl">
         <img class="rounded-2xl" src=${item.image}>
       </div>
       <h1 class="text-center text-2xl font-bold mb-4">${item.name}</h1>
       <p class="text-xs"><span class="text-base font-bold">Storage:</span> ${item?.mainFeatures?.storage || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Display:</span> ${item?.mainFeatures?.displaySize || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">ChipSet:</span> ${item?.mainFeatures?.chipSet || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Memory:</span> ${item.mainFeatures?.memory || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Slug:</span> ${item?.slug || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Release-Date:</span> ${item?.releaseDate || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Brand:</span> ${item?.brand || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">GPS:</span> ${item?.others?.GPS || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">WLAN:</span> ${item?.others?.WLAN || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">Bluetooth:</span> ${item?.others?.Bluetooth || "Data Not Found"}</p>
       <p class="text-xs"><span class="text-base font-bold">USB:</span> ${item?.others?.USB || "Data Not Found"}</p>


    `
    modalDetails.appendChild(div);

}


const displayPhones =(condition, phones)=>{
   
    if(phones.length===0){
        cardDiv.innerHTML = `
        <h1>No Phone Found</h1>
        `
    }

  phones = condition ? phones : phones.slice(0,6);
  
  phones.forEach(item=>{
   
    const div = document.createElement("div");
    div.classList.add("border","p-3","rounded-xl")
    div.innerHTML = `
     <div class="">
       <div class= "flex mb-4 justify-center items-center bg-slate-200 p-3 rounded-xl">
         <img class="rounded-2xl" src=${item.image}>
       </div>
       <h1 class="text-center text-2xl font-bold mb-4">${item.phone_name}</h1>
       <h3 class="text-xl text-center text-gray-400 font-semibold mb-4">Slug: ${item.slug}</h3>
       <h2 class="text-center text-2xl mb-4 font-bold text-blue-500">Brand: ${item.brand}</h2>
       <div class=" flex justify-center items-center mb-4">
         <button onclick="getDetails('${item.slug}')" class="bg-btnBg py-2 px-6 rounded-xl ml-[-20px] text-white font-bold">Show Details</button>
       </div>
     </div>

    `
    
    cardDiv.appendChild(div);
  })
}


document.getElementById("searchBtn").addEventListener("click", ()=>{
    cardDiv.innerHTML="";
    const input = document.getElementById("input-text").value;
    getPhones(input); 
});

getPhones("iphone");