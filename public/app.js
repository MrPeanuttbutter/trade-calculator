document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
  });

let op='Long'
let result=document.querySelector('#result');
let porcentual_result=document.querySelector('#porcentual_result');
let moveOption=document.querySelector('.btn-group');
let rangue=document.querySelector("#customRange3");
let aplct=document.querySelector("#aplct");
let margin=document.querySelector('#margin');
let precA=document.querySelector('#precA');
let precC=document.querySelector('#precC');
let prices=document.querySelector('.dropdown-menu')

moveOption.addEventListener('click',(e)=>{
  reset();
  op=e.target.value;
})

aplct.addEventListener('input',(e)=>{
  rangue.value=e.target.value
 })

rangue.addEventListener('input',(e)=>{
 aplct.value=e.target.value
})

margin.addEventListener('input',(e)=>{
  if(e.target.value<1){
     margin.value=''
  }
}) 
precA.addEventListener('input',(e)=>{
  if(e.target.value<=-1){
     precA.value=''
  }
})
precC.addEventListener('input',(e)=>{
  if(e.target.value<=-1){
     precC.value=''
  }
})

prices.addEventListener('click',(e)=>{
  e.preventDefault();
    console.log(e.target.textContent)
  
  loader();
  askPrice(e.target.textContent)
  
})

async function askPrice(coin){
  const url=`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD`

  try {

    const response=await fetch(url);
    const cotizacion=await response.json();
    precA.value=cotizacion.USD;
  
    loader();

  } catch (error) {
    console.log('error fetching... D:');
    loader();
  }
  
}

loader = () => {
  const el1=document.querySelector(".sk-fading-circle");
  const el2=document.querySelector('.dropdown-toggle');

  el1.style.display=='' ? el1.style.display='none' : el1.style.display='';
  el2.style.display=='' ? el2.style.display='none' : el2.style.display='';
}

const forms = document.querySelectorAll('.needs-validation')

  // Loop over Forms preventing submission
  Array.from(forms).forEach(form => {
    form.addEventListener('reset',()=>{
      reset();
    })
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      else {
        event.preventDefault();
        calculate();
      } 
      form.classList.add('was-validated')
    }, false)
  })

calculate =()=>{
  let result= (((margin.value*aplct.value)/precA.value)*precC.value-(margin.value*aplct.value));
  let porcentual_result=(result*100)/margin.value;
  result==Infinity ? showResult(result=0,porcentual_result=0) : 
    op=='Long' ? showResult (result,porcentual_result) : showResult ((-1)*result,(-1)*porcentual_result );
}

function showResult(i,e){
  console.log(Number(i).toFixed(2));
  if (i<0){
    result.classList.add('text-danger')
    porcentual_result.classList.add('text-danger')
    result.textContent=Number(i).toFixed(2)
    porcentual_result.textContent=`  ${e.toFixed(2)}%`;
  }
  else{
    result.classList.add('text-success')
    porcentual_result.classList.add('text-success')
    result.textContent='+'+Number(i).toFixed(2)
    porcentual_result.textContent=`  +${e.toFixed(2)}%`;
  }
}

reset =()=>{
  result.textContent='--'
  porcentual_result.textContent=''
  result.classList.remove('text-success','text-danger')
  porcentual_result.classList.remove('text-success','text-danger')
}


