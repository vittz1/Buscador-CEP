//==================BUSCA CEP===================//
const inputCep = document.getElementById('input-cep');
const btnCep = document.getElementById('buscarCep');

btnCep.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  const cep = inputCep.value;
  buscaCep(cep)
}

function buscaCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(dadosCep => {
      if(!dadosCep.cep) {
        document.getElementById('erro').innerHTML = "CEP não encontrado, verifique novamente";
        //return alert('CEP não encontrado, verifique novamente');
      } else {
        document.getElementById('erro').innerHTML = ""
        document.querySelector('[data-cep]').innerHTML = dadosCep.cep;
        document.querySelector('[data-log]').innerHTML = dadosCep.logradouro;
        document.querySelector('[data-bairro]').innerHTML = dadosCep.bairro;
        document.querySelector('[data-local]').innerHTML = dadosCep.localidade;
        document.querySelector('[data-uf]').innerHTML = dadosCep.uf;
        document.querySelector('[data-ddd]').innerHTML = dadosCep.ddd;
        }
    })
}

//===============COPIA ENDEREÇO===============//
function copiaEndereco() {
  var copyText = document.getElementById('dadosCep');
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand('copy');
  alert('Endereço copiado... ' + copyText.value);
}

//==================LIMPA CEP=================//

function limpaCep() {
    document.getElementById('input-cep').value = '';
    document.getElementById('erro').value = '';
    document.getElementById('dcep').value = '';
}

//================CONFIG TECLAS================//
var input = document.getElementById('input-cep');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
  const cep = inputCep.value;
  buscaCep(cep)
  } else {
    if (event.keyCode === 46) {
    const cep = inputCep.value;
    limpaCep()
        }
    }
})


//================FILTRAR CARACTERES================//

function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById("input-cep"), function(value) {
  return /^\d*$/.test(value) && function(value) {
      return /\d{5}-\d{3}/.test(value);
  }
});