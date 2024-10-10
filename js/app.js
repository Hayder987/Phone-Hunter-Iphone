

const getPhones= async(search)=>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(false, data.data)
  document.getElementById("allPhones").addEventListener("click", ()=>{
    displayPhones(true, data.data);
});

}
const displayPhones =(condition , phones)=>{
    if(condition){
       phones = phones
    }
    else{
       phones = phones.slice(0,6)
    }
    
    const cardDiv= document.getElementById("cardDiv");
   
    if(phones.length===0){
        cardDiv.innerHTML = `
         <h1 class = "text3xl font-bold">No Phone Found</h1>
        `
    }
    else{
        phones.forEach(item =>{
            const div = document.createElement("div");
            div.innerHTML = `
             <img src=${item.image}>
            `
     
            cardDiv.appendChild(div);
         });
    };
}

document.getElementById("btn-search").addEventListener("click", ()=>{
   const searchText = document.getElementById("search-field").value;
   getPhones(searchText);
})


getPhones("iphone");