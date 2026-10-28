
let qtdInput = 0;
let foco = "";


function showContent() {
  var divbase = document.getElementById("receptora")
  qtdInput++;
  const html = `
  <div class="molecula" id="div${qtdInput}" onclick="focado(div${qtdInput})">
  <input type='number' id='input${qtdInput}'> 
  <p>H</p>
  </div> 
`;
  divbase.innerHTML = divbase.getHTML() + html; 
}



function AddMol(molecula) {
    console.log(molecula);
    foco.innerHTML = foco.getHTML() + `<p>${molecula}</p>`             
}

function focado(id) {
    foco = id;
    console.log(foco)
}