document.addEventListener("DOMContentLoaded", function(){
  const randomButton = document.querySelector(".random-button");
  const copyButton = document.querySelector(".copy-box");
  const redSlider = document.getElementById('color-slider-red');
  const greenSlider = document.getElementById('color-slider-green');
  const blueSlider = document.getElementById('color-slider-blue');
  const inputHEXCode = document.getElementById('css-input-hex');
  const inputRGBCode = document.getElementById('css-input-rgb');

  inputHEXCode.addEventListener('keyup', handleHexInput);
  inputRGBCode.addEventListener('keyup', handleRGBInput);

  randomButton.addEventListener("click", randomNumberGenerator);
  redSlider.addEventListener('change', handleColorSlider(redSlider,greenSlider,blueSlider));
  greenSlider.addEventListener('change', handleColorSlider(redSlider,greenSlider, blueSlider));
  blueSlider.addEventListener('change', handleColorSlider(redSlider,greenSlider,blueSlider));

  copyButton.addEventListener('click', handleCopyBtn);
});

function CheckRadioButton(nodes){
  let checkValue = null;
  for(let i=0; i<nodes.length; i++){
    if(nodes[i].checked){
      checkValue=nodes[i].value;
      break;
    }
  }
  return checkValue;
}

function handleCopyBtn(){
  const copyModeRadio = document.getElementsByName('color-mode');
  const mode = CheckRadioButton(copyModeRadio);

  if(mode===null){
    throw new Error('Invalid Radio input');
  }
  if(mode==='HEX'){
    const hexColor = document.getElementById('css-input-hex').placeholder;
    if(hexColor && isValid(hexColor)){
      navigator.clipboard.writeText(`#${hexColor}`).then(showCopyMessage(hexColor));
    }
    else alert(`Invalid hex code`);
  }
  else {
    const rgbColor = document.getElementById('css-input-rgb').placeholder;
    if(rgbColor){
      navigator.clipboard.writeText(rgbColor).then(showCopyMessage(rgbColor));
    }
    else{
      alert(`Invalid RGB Code`);
    }
  }
}

function showCopyMessage(text){
  const messageElement = document.createElement("div");
  messageElement.innerText = `Copied To Clipboard`;
  messageElement.classList.add("copy-message");

  document.body.appendChild(messageElement);
  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 500);
}

function handleRGBInput(e){
    const color = e.target.value;
    if(color){
      this.value = color.toUpperCase();
      const regex = /\d+/g;
      const number = color.match(regex);
      if(number.length===3){
        const RGBcolor = {
          Red: Number(number[0]),
          Green: Number(number[1]),
          Blue: Number(number[2])
        }
        console.log(RGBcolor);
        updateColor(RGBcolor);
      }
    }
}
function handleHexInput(e){
  const Hexcolor = (e.target.value);
  console.log(Hexcolor);
  if(Hexcolor){
    this.value = Hexcolor.toUpperCase();
    if(isValid(Hexcolor)){
      const color = hexToDecimal(Hexcolor);
      updateColor(color);
    }
  }
}

function hexToDecimal(Hexcolor){
  return {
    Red:parseInt(Hexcolor.slice(0,2),16),
    Green:parseInt(Hexcolor.slice(2,4),16),
    Blue:parseInt(Hexcolor.slice(4),16)
  };
}
//012345
function isValid(color){
  if(color.length!=6) return false;
  return /^#?[0-9A-Fa-f]{6}$/i;
}

function handleColorSlider(redSlider,greenSlider,blueSlider){
  return function (){
    const color = {
      Red: parseInt(redSlider.value),
      Green: parseInt(greenSlider.value),
      Blue: parseInt(blueSlider.value)
    };
    updateColor(color);
  };
}

function randomNumberGenerator(){
  const color = generateColorDecimal();
  updateColor(color);
}


function generateColorDecimal(){
  const Red = Math.floor(Math.random()*255);
  const Green = Math.floor(Math.random()*255);
  const Blue = Math.floor(Math.random()*255);
  return {Red,Green,Blue};
}


function updateColor(color){
  const hexColor = generateHexColor(color);
  const rgbColor = generateRgbColor(color);

  document.querySelector('.display-preview-color').style.backgroundColor = rgbColor;
  document.getElementById('css-input-hex').placeholder = hexColor;
  document.getElementById('css-input-rgb').placeholder = rgbColor;

  document.getElementById('color-slider-red').value = color.Red;
  document.getElementById('color-slider-red-level').innerText = color.Red;

  document.getElementById('color-slider-green').value = color.Green;
  document.getElementById('color-slider-green-level').innerText = color.Green;
  
  document.getElementById('color-slider-blue').value = color.Blue;
  document.getElementById('color-slider-blue-level').innerText = color.Blue;
}
function singleCharHandler(value){
  let hexValue = value.toString(16);
  return hexValue.length===1? hexValue = '0'+hexValue: hexValue;
}
function generateHexColor({Red,Green,Blue}){
  return `${singleCharHandler(Red)}${singleCharHandler(Green)}${singleCharHandler(Blue)}`.toUpperCase();
}
function generateRgbColor({Red,Green,Blue}){
  return `RGB(${Red},${Green},${Blue})`;
}