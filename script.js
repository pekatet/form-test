function formToXml(form){
  var xmlInput=document.getElementById("query");
  var xmldata=['<?xml version="1.0" encoding="UTF-8"?>'];
  xmldata.push("<element name=\"ЗАПРОС_СВЕДЕНИЙ_О_СТРАХОВОМ_СТАЖЕ\">");
  var inputs=form.elements;
  for(var i=0;i<inputs.length;i++){
    if (inputs[i].name){
      if(!inputs[i].checkValidity()){
        alert("Не все поля заполнены корректно!");
        return;
      }
      var element=document.createElement(inputs[i].name);
      element.appendChild(document.createTextNode(inputs[i].value))
      //element.setAttribute("name",inputs[i].name);
      //el.setAttribute("value",inputs[i].value);
      xmldata.push(element.outerHTML);
    }
  }
  xmldata.push("</element>");
  console.log(xmldata);
  //xmlInput.setAttribute('value', xmldata.join("\r\n"));
  xmlInput.value = xmldata.join("\n")
  //return xmldata.join("\n");
}