const PERIOD_GRP_NAME="ОбщаяПродолжительностьСтраховогоСтажаНаДатуОбращенияГражданинаВОСЗ"

function formToXml(form){
  var xmlInput=document.getElementById("query");
  var xmldata=['<?xml version="1.0" encoding="UTF-8"?>'];
  xmldata.push("<ЗАПРОС_СВЕДЕНИЙ_О_СТРАХОВОМ_СТАЖЕ>");
  
  var inputs=form.elements;
  error = false;
  var i = 0;
  while(!inputs[i].id.includes('period')){
    if (inputs[i].name){
      if(!checkValidity(element = inputs[i])){
        error = true;
      }
      var element=document.createElement(inputs[i].name);
      element.appendChild(document.createTextNode(inputs[i].value));
      xmldata.push(element.outerHTML);
    }
    i++;
  }
  var periodGroup=document.createElement(PERIOD_GRP_NAME);
  while(inputs[i].id.includes('period')){
    if (inputs[i].name){
      if(!checkValidity(element = inputs[i])){
        error = true;
      }
      var element=document.createElement(inputs[i].name);
      element.appendChild(document.createTextNode(inputs[i].value));
      periodGroup.appendChild(element);
    }
    i++;
  }
  xmldata.push(periodGroup.outerHTML)
  xmldata.push("</ЗАПРОС_СВЕДЕНИЙ_О_СТРАХОВОМ_СТАЖЕ>");
  if(!error){
    xmlInput.value = xmldata.join("\n");
  }
  else{
    xmlInput.value='';
  }
}

function checkValidity(element){
  errorMessage = document.querySelector(`#${element.id}+span.error`);
  
  if(!element.checkValidity()){
    showError(element, errorMessage);
    return false;
  }
  else if(errorMessage !== null){
    errorMessage.textContent = ''; 
    errorMessage.className = 'error';
  }
  return true;
}

function showError(element, errorMessage) {
  console.log(errorMessage)
  label = document.querySelector(`label[for=${element.id}]`);
  if(element.validity.valueMissing) {
    errorMessage.textContent = `Поле ${label.innerHTML} обязательно для заполнения`;
  } else if(element.validity.patternMismatch) {
    errorMessage.textContent = 'Пожалуйста, введите значение в формате '+element.placeholder;
  } else if(element.validity.rangeOverflow || element.validity.rangeUnderflow ) {
    errorMessage.textContent = `Пожалуйста, введите значение от ${element.min} до ${element.max}`;
  }
  errorMessage.className = 'error active';
}