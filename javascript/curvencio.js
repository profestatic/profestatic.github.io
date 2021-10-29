//eventos
document.getElementById("agregarPozo").addEventListener("click",meteDato);
document.getElementById("curvPrin").addEventListener("click",principal);
document.getElementById("escala").addEventListener("change",restaurarDibujo);
document.getElementById("plano").addEventListener("mousedown",mover);
document.getElementById("plano").addEventListener("mouseup",marcaFinal);
document.getElementById("agregarManual").addEventListener("click",puntoManual);
for (var i = 0; i < document.getElementsByClassName("opcionesMenu").length; i++) {
  document.getElementsByClassName("opcionesMenu")[i].addEventListener("click", choseMenu);
}
for (var i = 0; i < document.getElementsByClassName("opcionesPlanos").length; i++) {
  document.getElementsByClassName("opcionesPlanos")[i].addEventListener("click",chosePlano);
}
for (var i = 0; i < document.getElementsByClassName("necesario").length; i++) {
  document.getElementsByClassName("necesario")[i].addEventListener("change",checarNecesario);
}
document.getElementById("centrar").addEventListener("click",centrando);
document.getElementById("plxz").addEventListener("click",otciones);
document.getElementById("equidistancia").addEventListener("change",checador);
document.getElementById("curvElev").addEventListener("click",curvasDos);
document.getElementById("hecho").addEventListener("click",aplicaAjustes);
document.getElementById("unPunto").addEventListener("click",puntoAleatorio);
document.getElementById("plano").addEventListener('mousemove',darCoor);
document.getElementById("puntoMagia").addEventListener("click",puntoCapricho);
document.getElementById("puntoMapa").addEventListener("click",activarSeleccion);
document.getElementById("curvas").addEventListener("click",confSel);
document.getElementById("elevEst").addEventListener("click",confSel);
//document.getElementById("probano").addEventListener("click",crearTriangulos);
//document.getElementById("curv").addEventListener("click",prueba);
estrella();

//variables
var pm=0;
var triangulo= new Array();
var zoom=0.02;
var punto= new Array();
var eqd=parseFloat(document.getElementById("equidistancia").value);
var min;
var max;
var ini= new Array(3);
var fini= new Array(3);
var celda;
var centro=new Array(2);
var gr= new Array(2);
var ch= new Array(2);
gr[0]=0;
gr[1]=0;
ch[0]=0;
ch[1]=0;
var dter;
var final= new Array(2);
var inicio
seg();
var frontera=parseInt(document.getElementById("cantidadPuntos").value);
var verif= new Array(3);
verif[0]=false;
verif[1]=false;
verif[2]=false;
//funciones
function confSel(e) {
  if (verif[2]==false) {
    return false;
  }
  document.getElementsByClassName("puntoGusto")[0].classList.remove("quitar");
  document.getElementById("corep").value=(centro[0]+(e.offsetX-900)/zoom).toFixed(2);
  document.getElementById("cornp").value=(centro[1]-(e.offsetY-570)/zoom).toFixed(2);
  verif[2]=false;
}
function activarSeleccion() {
  verif[2]=true;
  document.getElementsByClassName("puntoGusto")[0].classList.add("quitar");
}
function puntoCapricho() {
  if (document.getElementById("corep").value=="" || document.getElementById("cornp").value=="") {
    return false;
  }
  var fake= new Array(4);
  var ort= new Array(4);
  fake[0]=parseFloat(document.getElementById("corep").value);
  fake[1]=parseFloat(document.getElementById("cornp").value);
    var dadores=new Array(3);
  //console.log(fake[0] + " " + fake[1]);
  var seguro=0;
  for (var i = 0; i < triangulo.length; i++) {
    ort[0]=orientacioTriangulo(punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],punto[triangulo[i][2]][0],punto[triangulo[i][2]][1]);
    ort[1]=orientacioTriangulo(punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],fake[0],fake[1]);
    ort[2]=orientacioTriangulo(punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],punto[triangulo[i][2]][0],punto[triangulo[i][2]][1],fake[0],fake[1]);
    ort[3]=orientacioTriangulo(punto[triangulo[i][2]][0],punto[triangulo[i][2]][1],punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],fake[0],fake[1]);
    for (var j = 0; j < ort.length; j++) {
      ort[j]=ort[j].toFixed(5);
    }
    if (ort[0]>=0 && ort[1]>=0 && ort[2]>=0 && ort[3]>=0) {
      seguro=1;
    }else if (ort[0]<=0 && ort[1]<=0 && ort[2]<=0 && ort[3]<=0) {
      seguro=1;
    }
    if (seguro==1) {
      for (var j = 0; j < dadores.length; j++) {
        dadores[j]=0;
      }
      for (var j = 0; j < triangulo[i].length; j++) {
        if (Math.sqrt(Math.pow(fake[0]-punto[triangulo[i][j]][0],2)+Math.pow(fake[1]-punto[triangulo[i][j]][1],2))==0) {
          fake[2]=punto[triangulo[i][j]][2];
          fake[3]=punto[triangulo[i][j]][3];
          var compl;
          var trans;
          trans=document.createElement("tr");
          for (var k = 0; k < fake.length; k++) {
            compl=document.createElement("td");
            compl.appendChild(document.createTextNode((fake[k]).toFixed(2)));
            trans.appendChild(compl);
          }
          document.getElementById("tpuntosAlt").appendChild(trans);
          return false;
        }
        dadores[0]=dadores[0]+punto[triangulo[i][j]][2]/Math.pow(Math.sqrt(Math.pow(fake[0]-punto[triangulo[i][j]][0],2)+Math.pow(fake[1]-punto[triangulo[i][j]][1],2)),2);
        dadores[1]=dadores[1]+1/Math.pow(Math.sqrt(Math.pow(fake[0]-punto[triangulo[i][j]][0],2)+Math.pow(fake[1]-punto[triangulo[i][j]][1],2)),2);
        dadores[2]=dadores[2]+punto[triangulo[i][j]][3]/Math.pow(Math.sqrt(Math.pow(fake[0]-punto[triangulo[i][j]][0],2)+Math.pow(fake[1]-punto[triangulo[i][j]][1],2)),2);
      }
      fake[2]=dadores[0]/dadores[1];;
      fake[3]=dadores[2]/dadores[1];
      var compl;
      var trans;
      trans=document.createElement("tr");
      for (var k = 0; k < fake.length; k++) {
        compl=document.createElement("td");
        compl.appendChild(document.createTextNode((fake[k]).toFixed(2)));
        trans.appendChild(compl);
      }
      document.getElementById("tpuntosAlt").appendChild(trans);
      return false;
    }
  }
  if (seguro==0) {
    alert("El punto no esta dentro de la triangulacion");
    return false;
  }
}
function darCoor(e) {
  if (verif[0]==true || verif[1]==true) {
    document.getElementById("coorxy").innerHTML="X: " + (centro[0]+(e.offsetX-900)/zoom).toFixed(0) + "  Y: " + (centro[1]-(e.offsetY-570)/zoom).toFixed(0);
  }else {
    return false;
  }
}
function puntoAleatorio() {
  if (verif[0]==true || verif[1]==true) {
    if (document.getElementsByClassName("puntoGusto")[0].classList.contains("quitar")) {
      document.getElementsByClassName("puntoGusto")[0].classList.remove("quitar");
    }else {
      document.getElementsByClassName("puntoGusto")[0].classList.add("quitar");
    }
  }
}
function aplicaAjustes() {
  restaurarDibujo();
  document.getElementsByClassName("menuAjustes")[0].classList.add("quitar");
  frontera=parseInt(document.getElementById("cantidadPuntos").value);
}
function curvasDos() {
  if (punto.length<3) {
    return false;
  }
  if (triangulo.length==0) {
    crearTriangulos();
    for (var i = 0; i < 6; i++) {
      trianAleatorio(6-i);
    }
  }
  verif[1]=true;
  for (var i = 0; i < triangulo.length; i++) {
    curvasElevacion(i);
    verif[0]=true;
    dibujarTriangulo(triangulo[i][0],triangulo[i][1],triangulo[i][2]);
  }
  for (var i = 0; i < document.getElementsByClassName("ones").length; i++) {
    document.getElementsByClassName("ones")[i].classList.add("quitar");
  }
  /*alert("no te lo robes lo hizo el imge Leonardo");
  console.log("no te lo robes lo hizo el imge Leonardo");*/
  escalaGrafica();
}
function otciones() {
  if (document.getElementsByClassName("menuAjustes")[0].classList.contains("quitar")) {
    document.getElementsByClassName("menuAjustes")[0].classList.remove("quitar");
  }else {
    document.getElementsByClassName("menuAjustes")[0].classList.add("quitar");
  }
}
function centrando() {
  centro[0]=gr[0];
  centro[1]=ch[1];
  restaurarDibujo();
}
function principal() {
  if (punto.length<3) {
    return false;
  }
  if (triangulo.length==0) {
    crearTriangulos();
    for (var i = 0; i < 6; i++) {
      trianAleatorio(6-i);
    }
  }
  for (var i = 0; i < triangulo.length; i++) {
    curvas(i);
    verif[0]=true;
    dibujarTriangulo(triangulo[i][0],triangulo[i][1],triangulo[i][2]);
  }
  for (var i = 0; i < document.getElementsByClassName("ones").length; i++) {
    document.getElementsByClassName("ones")[i].classList.add("quitar");
  }
  for (var i = 0; i < punto.length; i++) {
    dibujarPuntos(i);
  }
  //alert("no te lo robes lo hizo el imge Leonardo");
  //console.log("no te lo robes lo hizo el imge Leonardo");
  escalaGrafica();
}
function origen() {
  centro[0]=punto[0][0];
  centro[1]=punto[0][1];
  gr[0]=punto[0][0];
  gr[1]=punto[0][1];
  ch[0]=punto[0][0];
  ch[1]=punto[0][1];
  for (var i = 0; i < punto.length; i++) {
    if (punto[i][0]>centro[0]) {
      centro[0]=punto[i][0];
    }
    if (punto[i][1]<centro[1]) {
      centro[1]=punto[i][1];
    }
    if (punto[i][0]>gr[0]) {
      gr[0]=punto[i][0];
    }
    if (punto[i][1]>gr[1]) {
      gr[1]=punto[i][1];
    }
    if (punto[i][0]<ch[0]) {
      ch[0]=punto[i][0];
    }
    if (punto[i][1]<ch[1]) {
      ch[1]=punto[i][1];
    }
  }
  dter=Math.sqrt(Math.pow(gr[0]-ch[0],2)+Math.pow(gr[1]-ch[1],2))
}
function puntoTabla(np) {
  var compl;
  var trans;
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(np+1));
  trans=document.createElement("tr");
  trans.appendChild(compl);
  for (var i = 0; i < 3; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(punto[np][i]));
    trans.appendChild(compl);
  }
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(celda[np-pm][3]));
  trans.appendChild(compl);
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(celda[np-pm][4]));
  trans.appendChild(compl);
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(punto[np][3].toFixed(2)));
  trans.appendChild(compl);
  document.getElementById("tbarras").appendChild(trans);
}
function seg() {
  /*document.getElementsByTagName("body")[0].classList.add("quitar");*/
}
function puntoTablaManual(np,x,y,de,eb,hb) {
  var compl;
  var trans;
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(np+1));
  trans=document.createElement("tr");
  trans.appendChild(compl);
  for (var i = 0; i < 3; i++) {
    compl=document.createElement("td");
    compl.appendChild(document.createTextNode(punto[np][i]));
    trans.appendChild(compl);
  }
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(eb));
  trans.appendChild(compl);
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(hb));
  trans.appendChild(compl);
  compl=document.createElement("td");
  compl.appendChild(document.createTextNode(punto[np][3].toFixed(2)));
  trans.appendChild(compl);
  document.getElementById("tbarras").appendChild(trans);
}
function meteDato() {
  var fila=document.getElementById("texto").value.split(/\n/);
  celda= new Array();
  for (var i = 0; i < fila.length; i++) {
    if (punto.length<frontera) {
      celda[celda.length]=fila[i].split(/\t/);
      crearPunto(celda[celda.length-1][0],celda[celda.length-1][1],celda[celda.length-1][2],celda[celda.length-1][3],celda[celda.length-1][4]);
    }
  }
  origen();
  document.getElementById("agregarPozo").classList.add("quitar");
}
function crearPunto(x,y,de,eb,hb) {
  if (x=="" || y=="") {
    return false;
  }
  for (var i = 0; i < punto.length; i++) {
    if (x==punto[i][0] && y==punto[i][1]) {
      return false;
    }
  }
  punto[punto.length]=new Array(4);
  punto[punto.length-1][0]=parseFloat(x);
  punto[punto.length-1][1]=parseFloat(y);
  punto[punto.length-1][2]=0;
  punto[punto.length-1][3]=0;
  if (de=="") {
    punto[punto.length-1][2]=0;
  }else {
    punto[punto.length-1][2]=parseFloat(de);
  }
  punto[punto.length-1][3]=parseFloat(eb)-parseFloat(hb)-punto[punto.length-1][2];
  if (document.getElementById("ecargas").classList.contains("quitar")) {
    puntoTabla(punto.length-1);
  }else {
    puntoTablaManual(punto.length-1,x,y,de,eb,hb);
  }
}
function orientacioTriangulo(p0x,p0y,p1x,p1y,p2x,p2y) {
  return (p0x-p2x)*(p1y-p2y)-(p0y-p2y)*(p1x-p2x);
}
function noEnTriangulo(comi,fn) {
  if (comi==fn) {
    return false;
  }
  var fake= new Array(2);
  var ort= new Array(4);
  fake[0]=punto[fn][0]+(punto[comi][0]-punto[fn][0])/1000;
  fake[1]=punto[fn][1]+(punto[comi][1]-punto[fn][1])/1000;
  //console.log(fake[0] + " " + fake[1]);
  var seguro=0;
  for (var i = 0; i < triangulo.length; i++) {
    ort[0]=orientacioTriangulo(punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],punto[triangulo[i][2]][0],punto[triangulo[i][2]][1]);
    ort[1]=orientacioTriangulo(punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],fake[0],fake[1]);
    ort[2]=orientacioTriangulo(punto[triangulo[i][1]][0],punto[triangulo[i][1]][1],punto[triangulo[i][2]][0],punto[triangulo[i][2]][1],fake[0],fake[1]);
    ort[3]=orientacioTriangulo(punto[triangulo[i][2]][0],punto[triangulo[i][2]][1],punto[triangulo[i][0]][0],punto[triangulo[i][0]][1],fake[0],fake[1]);
    for (var j = 0; j < ort.length; j++) {
      ort[j]=ort[j].toFixed(5);
    }
    if (ort[0]>0 && ort[1]>0 && ort[2]>0 && ort[3]>0) {
      seguro=1;
    }else if (ort[0]<0 && ort[1]<0 && ort[2]<0 && ort[3]<0) {
      seguro=1;
    }
    //if (Math.abs(ort[0]+ort[1])>=Math.abs(ort[0])+Math.abs(ort[1]) && Math.abs(ort[0]+ort[2])>=Math.abs(ort[0])+Math.abs(ort[2]) && Math.abs(ort[0]+ort[3])>=Math.abs(ort[0])+Math.abs(ort[1])) {
      //seguro=1;
    //}
  }
  //console.log("seg" + seguro);
  if (seguro==1) {
    return false;
  }else {
    return true;
  }
}
function curvas(nt) {
  min=Math.ceil(punto[triangulo[nt][0]][2]/eqd)*eqd;
  max=Math.floor(punto[triangulo[nt][0]][2]/eqd)*eqd;
  for (var i = 0; i < 3; i++) {
    if (punto[triangulo[nt][i]][2]<=min) {
      min=Math.ceil(punto[triangulo[nt][i]][2]/eqd)*eqd;
    }
    if (punto[triangulo[nt][i]][2]>=max) {
      max=Math.floor(punto[triangulo[nt][i]][2]/eqd)*eqd;
    }
  }
  for (var i = min; i < max+eqd; i+=eqd) {
    ini[2]=0;
    fini[2]=0;
    if ((punto[triangulo[nt][0]][2]<=i && punto[triangulo[nt][1]][2]>=i) || (punto[triangulo[nt][0]][2]>=i && punto[triangulo[nt][1]][2]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        ini[1]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        fini[1]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        fini[2]=1
      }
    }
    if ((punto[triangulo[nt][0]][2]<=i && punto[triangulo[nt][2]][2]>=i) || (punto[triangulo[nt][0]][2]>=i && punto[triangulo[nt][2]][2]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][2]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][2]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        ini[1]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][2]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][2]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][2]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][2]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        fini[1]=((i-punto[triangulo[nt][0]][2])/(punto[triangulo[nt][2]][2]-punto[triangulo[nt][0]][2]))*(punto[triangulo[nt][2]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        fini[2]=1
      }
    }
    if ((punto[triangulo[nt][1]][2]<=i && punto[triangulo[nt][2]][2]>=i) || (punto[triangulo[nt][1]][2]>=i && punto[triangulo[nt][2]][2]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][2]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][2]][2]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][2]][0])+punto[triangulo[nt][2]][0];
        ini[1]=((i-punto[triangulo[nt][2]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][2]][2]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][2]][1])+punto[triangulo[nt][2]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][2]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][2]][2]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][2]][0])+punto[triangulo[nt][2]][0];
        fini[1]=((i-punto[triangulo[nt][2]][2])/(punto[triangulo[nt][1]][2]-punto[triangulo[nt][2]][2]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][2]][1])+punto[triangulo[nt][2]][1];
        fini[2]=1
      }
    }
    var can=document.getElementById("curvas").getContext("2d");
    can.beginPath();
    if (i%(5*eqd)==0) {
      can.strokeStyle=document.getElementById("colorCurvasP").value;
      can.lineWidth=2;
    }else {
      can.strokeStyle=document.getElementById("colorCurvasS").value;
      can.lineWidth=1;
    }
    can.moveTo((ini[0]-centro[0])*zoom+900,-(ini[1]-centro[1])*zoom+570);
    can.lineTo((fini[0]-centro[0])*zoom+900,-(fini[1]-centro[1])*zoom+570);
    can.stroke();
    if (nt%3==0) {
      if (i%(5*eqd)==0) {
        can.fillStyle=document.getElementById("colorCurvasP").value;
        can.font="10px Consolas";
        can.fillText(i,(0.5*(ini[0]+fini[0])-centro[0])*zoom+900,-(0.5*(ini[1]+fini[1])-centro[1])*zoom+570);
      }else if (document.getElementById("todasCurvas").checked==true) {
        can.fillStyle=document.getElementById("colorCurvasS").value;
        can.font="10px Consolas";
        can.fillText(i,(0.5*(ini[0]+fini[0])-centro[0])*zoom+900,-(0.5*(ini[1]+fini[1])-centro[1])*zoom+570);
      }
    }
  }
}
function curvasElevacion(nt) {
  min=Math.ceil(punto[triangulo[nt][0]][3]/eqd)*eqd;
  max=Math.floor(punto[triangulo[nt][0]][3]/eqd)*eqd;
  for (var i = 0; i < 3; i++) {
    if (punto[triangulo[nt][i]][3]<=min) {
      min=Math.ceil(punto[triangulo[nt][i]][3]/eqd)*eqd;
    }
    if (punto[triangulo[nt][i]][3]>=max) {
      max=Math.floor(punto[triangulo[nt][i]][3]/eqd)*eqd;
    }
  }
  for (var i = min; i < max+eqd; i+=eqd) {
    ini[2]=0;
    fini[2]=0;
    if ((punto[triangulo[nt][0]][3]<=i && punto[triangulo[nt][1]][3]>=i) || (punto[triangulo[nt][0]][3]>=i && punto[triangulo[nt][1]][3]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        ini[1]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        fini[1]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        fini[2]=1
      }
    }
    if ((punto[triangulo[nt][0]][3]<=i && punto[triangulo[nt][2]][3]>=i) || (punto[triangulo[nt][0]][3]>=i && punto[triangulo[nt][2]][3]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][2]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][2]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        ini[1]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][2]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][2]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][2]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][2]][0]-punto[triangulo[nt][0]][0])+punto[triangulo[nt][0]][0];
        fini[1]=((i-punto[triangulo[nt][0]][3])/(punto[triangulo[nt][2]][3]-punto[triangulo[nt][0]][3]))*(punto[triangulo[nt][2]][1]-punto[triangulo[nt][0]][1])+punto[triangulo[nt][0]][1];
        fini[2]=1
      }
    }
    if ((punto[triangulo[nt][1]][3]<=i && punto[triangulo[nt][2]][3]>=i) || (punto[triangulo[nt][1]][3]>=i && punto[triangulo[nt][2]][3]<=i)) {
      if (ini[2]==0) {
        ini[0]=((i-punto[triangulo[nt][2]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][2]][3]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][2]][0])+punto[triangulo[nt][2]][0];
        ini[1]=((i-punto[triangulo[nt][2]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][2]][3]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][2]][1])+punto[triangulo[nt][2]][1];
        ini[2]=1
      }else if (fini[2]==0) {
        fini[0]=((i-punto[triangulo[nt][2]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][2]][3]))*(punto[triangulo[nt][1]][0]-punto[triangulo[nt][2]][0])+punto[triangulo[nt][2]][0];
        fini[1]=((i-punto[triangulo[nt][2]][3])/(punto[triangulo[nt][1]][3]-punto[triangulo[nt][2]][3]))*(punto[triangulo[nt][1]][1]-punto[triangulo[nt][2]][1])+punto[triangulo[nt][2]][1];
        fini[2]=1
      }
    }
    var can=document.getElementById("elevEst").getContext("2d");
    can.beginPath();
    if (i%(5*eqd)==0) {
      can.strokeStyle=document.getElementById("colorElevP").value;
      can.lineWidth=2;
    }else {
      can.strokeStyle=document.getElementById("colorElevS").value;
      can.lineWidth=1;
    }
    can.moveTo((ini[0]-centro[0])*zoom+900,-(ini[1]-centro[1])*zoom+570);
    can.lineTo((fini[0]-centro[0])*zoom+900,-(fini[1]-centro[1])*zoom+570);
    can.stroke();
    if (nt%3==0) {
      if (i%(5*eqd)==0) {
        can.fillStyle=document.getElementById("colorElevP").value;
        can.font="10px Consolas";
        can.fillText(i,(0.5*(ini[0]+fini[0])-centro[0])*zoom+900,-(0.5*(ini[1]+fini[1])-centro[1])*zoom+570);
      }else if (document.getElementById("todasCurvas").checked==true) {
        can.fillStyle=document.getElementById("colorElevS").value;
        can.font="10px Consolas";
        can.fillText(i,(0.5*(ini[0]+fini[0])-centro[0])*zoom+900,-(0.5*(ini[1]+fini[1])-centro[1])*zoom+570);
      }
    }
  }
}
function dibujarTriangulo(p1,p2,p3) {
  var can=document.getElementById("curvas").getContext("2d");
  can.beginPath();
  can.strokeStyle="rgba(173, 218, 217, 0.01)";
  can.fillStyle= "rgba(173, 218, 217, 0.08)";
  can.moveTo((punto[p1][0]-centro[0])*zoom+900,-(punto[p1][1]-centro[1])*zoom+570);
  can.lineTo((punto[p2][0]-centro[0])*zoom+900,-(punto[p2][1]-centro[1])*zoom+570);
  can.lineTo((punto[p3][0]-centro[0])*zoom+900,-(punto[p3][1]-centro[1])*zoom+570);
  can.lineTo((punto[p1][0]-centro[0])*zoom+900,-(punto[p1][1]-centro[1])*zoom+570);
  can.closePath();
  can.fill();
  can.stroke();
  if (verif[1]==true) {
    can=document.getElementById("elevEst").getContext("2d");
    can.beginPath();
    can.strokeStyle="rgba(173, 218, 217, 0.01)";
    can.fillStyle= "rgba(173, 218, 217, 0.08)";
    can.moveTo((punto[p1][0]-centro[0])*zoom+900,-(punto[p1][1]-centro[1])*zoom+570);
    can.lineTo((punto[p2][0]-centro[0])*zoom+900,-(punto[p2][1]-centro[1])*zoom+570);
    can.lineTo((punto[p3][0]-centro[0])*zoom+900,-(punto[p3][1]-centro[1])*zoom+570);
    can.lineTo((punto[p1][0]-centro[0])*zoom+900,-(punto[p1][1]-centro[1])*zoom+570);
    can.closePath();
    can.fill();
    can.stroke();
  }
}
function crearTriangulos() {
  var ch1;
  var pch1;
  var ch2;
  var pch2;
  var ch3;
  var pch3;
  var tcom=new Array(3);
  var tsec= new Array(3);
  var vador=true;
  for (var i = 0; i < punto.length; i++) {
    ch1=100000000000;
    ch2=100000000000;
    ch3=100000000000;
    tcom[0]=i;
    pch1=i;
    pch2=i;
    pch3=i;
    for (var j = 0; j < punto.length; j++) {
      if (j!=i) {
        //console.log(i + " " + j);
      //  console.log(noEnTriangulo(i,j));
        if (ch1>Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2)) && noEnTriangulo(i,j)==true && noEnTriangulo(j,pch2)==true && noEnTriangulo(pch2,j)==true) {
          if (ch2>ch1 && noEnTriangulo(j,pch1)==true && noEnTriangulo(pch1,j)==true) {
            if (ch3>ch2) {
              ch3=ch2;
              pch3=pch2;
            }
            ch2=ch1;
            pch2=pch1;
          }
          ch1=Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2));
          pch1=j;
        }else if (ch2>Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2)) && noEnTriangulo(i,j)==true && noEnTriangulo(j,pch1)==true && noEnTriangulo(pch1,j)==true) {
          if (ch3>ch2) {
            ch3=ch2;
            pch3=pch2;
          }
          ch2=Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2));
          pch2=j;
        }else if (ch3>Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2)) && noEnTriangulo(i,j)==true) {
          ch3=Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2));
          pch3=j;
        }
      }
      //console.log(i + " " + j + " ch1= " + ch1 + " pch1= " + pch1 + " ch2= " + ch2 + " pch2= " + pch2 + " ch3= " + ch3 + " pch3= " + pch3);
    }
    tcom[1]=pch1;
    tcom[2]=pch2;
    ch1=0;
    ch2=0;
    pch1=0;
    for (var j = 0; j < triangulo.length; j++) {
      if (ch1==0 || ch2==0 || pch1==0) {
        ch1=0;
        ch2=0;
        pch1=0;
      }
      if (tcom[0]==triangulo[j][0] || tcom[0]==triangulo[j][1] || tcom[0]==triangulo[j][2]) {
        ch1=1;
      }
      if (tcom[1]==triangulo[j][0] || tcom[1]==triangulo[j][1] || tcom[1]==triangulo[j][2]) {
        ch2=1;
      }
      if (tcom[2]==triangulo[j][0] || tcom[2]==triangulo[j][1] || tcom[2]==triangulo[j][2]) {
        pch1=1;
      }
    }
    if ((ch1==0 || ch2==0 || pch1==0) && noTrianguloCentro(tcom[0],tcom[1],tcom[2])) {
      //console.log("hacido" + triangulo.length);
      triangulo[triangulo.length]= new Array(3);
      triangulo[triangulo.length-1][0]=tcom[0];
      triangulo[triangulo.length-1][1]=tcom[1];
      triangulo[triangulo.length-1][2]=tcom[2];
      //dibujarTriangulo(triangulo[triangulo.length-1][0], triangulo[triangulo.length-1][1], triangulo[triangulo.length-1][2]);
      //console.log(triangulo[triangulo.length-1]);
      //console.log("primera");
    }
    tsec[0]=i;
    //console.log(i + " " + tsec[0]);
    for (var j = 1; j < 3; j++) {
      vador=true;
      tsec[1]=tcom[1];
      tsec[2]=tcom[2];
      tsec[j]=pch3;
      for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
          if (l!=k && noEnTriangulo(tsec[k],tsec[l])==false) {
            vador=false;
          }
          //console.log(tsec[k] + " " + tsec[l] + " " + vador);
        }
      }
      //console.log(i + " " + tsec);
      if (vador==true) {
        ch1=0;
        ch2=0;
        pch1=0;
        for (var k = 0; k < triangulo.length; k++) {
          if (ch1==0 || ch2==0 || pch1==0) {
            ch1=0;
            ch2=0;
            pch1=0;
          }
          if (tsec[0]==triangulo[k][0] || tsec[0]==triangulo[k][1] || tsec[0]==triangulo[k][2]) {
            ch1=1;
          }
          if (tsec[1]==triangulo[k][0] || tsec[1]==triangulo[k][1] || tsec[1]==triangulo[k][2]) {
            ch2=1;
          }
          if (tsec[2]==triangulo[k][0] || tsec[2]==triangulo[k][1] || tsec[2]==triangulo[k][2]) {
            pch1=1;
          }
        }
        if ((ch1==0 || ch2==0 || pch1==0) && noTrianguloCentro(tsec[0],tsec[1],tsec[2])) {
          //console.log("hacido" + triangulo.length);
          triangulo[triangulo.length]= new Array(3);
          triangulo[triangulo.length-1][0]=tsec[0];
          triangulo[triangulo.length-1][1]=tsec[1];
          triangulo[triangulo.length-1][2]=tsec[2];
          //dibujarTriangulo(triangulo[triangulo.length-1][0], triangulo[triangulo.length-1][1], triangulo[triangulo.length-1][2]);
          //console.log(triangulo[triangulo.length-1]);
          //console.log("sefunda");
        }
      }
    }
  }
}
function dibujarPuntos(np) {
  if (verif[0]!=true) {
    return false;
  }
  var can=document.getElementById("curvas").getContext("2d");
  if (document.getElementById("numPozo").checked==true) {
    can.fillStyle="#fff";
    can.font="15px Consolas";
    can.fillText(np+1,(punto[np][0]-centro[0])*zoom+900,-(punto[np][1]-centro[1])*zoom+570);
  }
  if (document.getElementById("pozoMarca").checked==true) {
    can.fillStyle="#fff";
    can.fillRect((punto[np][0]-centro[0])*zoom+898,-(punto[np][1]-centro[1])*zoom+568,4,4);
  }
  if (verif[1]==true) {
    can=document.getElementById("elevEst").getContext("2d");
    if (document.getElementById("numPozo").checked==true) {
      can.fillStyle="#fff";
      can.font="15px Consolas";
      can.fillText(np+1,(punto[np][0]-centro[0])*zoom+900,-(punto[np][1]-centro[1])*zoom+570);
    }
    if (document.getElementById("pozoMarca").checked==true) {
      can.fillStyle="#fff";
      can.fillRect((punto[np][0]-centro[0])*zoom+898,-(punto[np][1]-centro[1])*zoom+568,4,4);
    }
  }
}
function noTrianguloCentro(p1,p2,p3) {
  var fake= new Array(4);
  var ort= new Array(4);
  //console.log(fake[0] + " " + fake[1]);
  var seguro=0;
  //fake[0]=(punto[p1][0]+punto[p2][0]+punto[p3][0])/3;
  //fake[1]=(punto[p1][1]+punto[p3][1]+punto[p2][1])/3;
  for (var i = 0; i < triangulo.length; i++) {
    fake[2]=(punto[triangulo[i][0]][0]+punto[triangulo[i][1]][0]+punto[triangulo[i][2]][0])/3;
    fake[3]=(punto[triangulo[i][0]][1]+punto[triangulo[i][1]][1]+punto[triangulo[i][2]][1])/3;
    ort[0]=orientacioTriangulo(punto[p1][0],punto[p1][1],punto[p2][0],punto[p2][1],punto[p3][0],punto[p3][1]);
    ort[1]=orientacioTriangulo(punto[p1][0],punto[p1][1],punto[p2][0],punto[p2][1],fake[2],fake[3]);
    ort[2]=orientacioTriangulo(punto[p2][0],punto[p2][1],punto[p3][0],punto[p3][1],fake[2],fake[3]);
    ort[3]=orientacioTriangulo(punto[p3][0],punto[p3][1],punto[p1][0],punto[p1][1],fake[2],fake[3]);
    for (var j = 0; j <ort.length; j++) {
      ort[j]=ort[j].toFixed(5);
    }
    if (ort[0]>=0 && ort[1]>=0 && ort[2]>=0 && ort[3]>=0) {
      seguro=1;
    }else if (ort[0]<=0 && ort[1]<=0 && ort[2]<=0 && ort[3]<=0) {
      seguro=1;
    }
    for (var k = 0; k < 3; k++) {
      fake[0]=punto[triangulo[i][k]][0]+(-punto[triangulo[i][k]][0]+(punto[triangulo[i][0]][0]+punto[triangulo[i][1]][0]+punto[triangulo[i][2]][0])/3)/1000;
      fake[1]=punto[triangulo[i][k]][1]+(-punto[triangulo[i][k]][1]+(punto[triangulo[i][0]][1]+punto[triangulo[i][1]][1]+punto[triangulo[i][2]][1])/3)/1000;
      ort[0]=orientacioTriangulo(punto[p1][0],punto[p1][1],punto[p2][0],punto[p2][1],punto[p3][0],punto[p3][1]);
      ort[1]=orientacioTriangulo(punto[p1][0],punto[p1][1],punto[p2][0],punto[p2][1],fake[0],fake[1]);
      ort[2]=orientacioTriangulo(punto[p2][0],punto[p2][1],punto[p3][0],punto[p3][1],fake[0],fake[1]);
      ort[3]=orientacioTriangulo(punto[p3][0],punto[p3][1],punto[p1][0],punto[p1][1],fake[0],fake[1]);
      for (var j = 0; j <ort.length; j++) {
        ort[j]=ort[j].toFixed(5);
      }
      if (ort[0]>=0 && ort[1]>=0 && ort[2]>=0 && ort[3]>=0) {
        seguro=1;
      }else if (ort[0]<=0 && ort[1]<=0 && ort[2]<=0 && ort[3]<=0) {
        seguro=1;
      }
    }
  }
  //console.log("seg" + seguro);
  if (seguro==1) {
    return false;
  }else {
    return true;
  }
}
function trianAleatorio(rd) {
  var tcom= new Array(3);
  for (var i = 0; i < punto.length; i++) {
    tcom[0]=i;
    for (var j = 0; j < punto.length; j++) {
      if (noEnTriangulo(i,j)==true && noEnTriangulo(j,i)==true && dter/rd>Math.sqrt(Math.pow(punto[i][0]-punto[j][0],2)+Math.pow(punto[i][1]-punto[j][1],2))){
        tcom[1]=j;
        for (var k = 0; k < punto.length; k++) {
          //console.log(i +"," + j +"," +k);
          if (j!=i && i!=k && k!=j && noEnTriangulo(i,k)==true && noEnTriangulo(k,i)==true && noEnTriangulo(k,j)==true && noEnTriangulo(j,k)==true && dter/rd>Math.sqrt(Math.pow(punto[i][0]-punto[k][0],2)+Math.pow(punto[i][1]-punto[k][1],2))) {
            //console.log("entro");
            tcom[2]=k;
            var ch1=0;
            var ch2=0;
            var pch1=0;
            for (var l = 0; l < triangulo.length; l++) {
              if (ch1==0 || ch2==0 || pch1==0) {
                ch1=0;
                ch2=0;
                pch1=0;
              }
              if (tcom[0]==triangulo[l][0] || tcom[0]==triangulo[l][1] || tcom[0]==triangulo[l][2]) {
                ch1=1;
              }
              if (tcom[1]==triangulo[l][0] || tcom[1]==triangulo[l][1] || tcom[1]==triangulo[l][2]) {
                ch2=1;
              }
              if (tcom[2]==triangulo[l][0] || tcom[2]==triangulo[l][1] || tcom[2]==triangulo[l][2]) {
                pch1=1;
              }
            }
            if ((ch1==0 || ch2==0 || pch1==0) && noTrianguloCentro(tcom[0],tcom[1],tcom[2])) {
              //console.log("hacido" + triangulo.length);
              triangulo[triangulo.length]= new Array(3);
              triangulo[triangulo.length-1][0]=tcom[0];
              triangulo[triangulo.length-1][1]=tcom[1];
              triangulo[triangulo.length-1][2]=tcom[2];
              //dibujarTriangulo(triangulo[triangulo.length-1][0], triangulo[triangulo.length-1][1], triangulo[triangulo.length-1][2]);
              //console.log(triangulo[triangulo.length-1]);
              //console.log("primera");
            }
          }
        }
      }

    }
  }
}
function estrella() {
  var can=document.getElementById("curvas").getContext("2d");
  can.fillStyle="#fff";
  can.font="20px Consolas";
  can.fillText("N",899,25);
  can=document.getElementById("elevEst").getContext("2d");
  can.fillStyle="#fff";
  can.font="20px Consolas";
  can.fillText("N",899,25);
}
function restaurarDibujo() {
  zoom=document.getElementById("escala").value;
  var can=document.getElementById("curvas").getContext("2d");
  can.clearRect(0,0,document.getElementById("curvas").width,document.getElementById("curvas").height);
  can=document.getElementById("elevEst").getContext("2d");
  can.clearRect(0,0,document.getElementById("elevEst").width,document.getElementById("elevEst").height);
  for (var i = 0; i < triangulo.length; i++) {
    curvas(i);
    dibujarTriangulo(triangulo[i][0],triangulo[i][1],triangulo[i][2]);
    if (verif[1]==true) {
      curvasElevacion(i);
    }
  }
  for (var i = 0; i < punto.length; i++) {
    dibujarPuntos(i);
  }
  estrella();
  escalaGrafica();
}
function mover(event) {
  inicio= new Array(2);
  inicio[0]=event.clientX;
  inicio[1]=event.clientY;
  //console.log("inicio " + inicio[0] + "," + inicio[1]);
  document.getElementById("plano").classList.add("moviendo");
}
function marcaFinal(event) {
  if (document.getElementById("plano").classList.contains("moviendo")) {
    document.getElementById("plano").classList.remove("moviendo");
  }
  final[0]=event.clientX;
  final[1]=event.clientY;
  //console.log("final " + final[0] + "," + final[1]);
  centro[0]=centro[0]-(final[0]-inicio[0])/zoom;
  centro[1]=centro[1]+(final[1]-inicio[1])/zoom;
  restaurarDibujo();
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function choseMenu() {
  for (var i = 0; i < document.getElementsByClassName("opcionesMenu").length; i++) {
    if (document.getElementsByClassName("opcionesMenu")[i].classList.contains("menuElegido")) {
      document.getElementsByClassName("opcionesMenu")[i].classList.remove("menuElegido");
    }
  }
  this.classList.add("menuElegido");
  for (var i = 0; i < document.getElementsByClassName("entrada").length; i++) {
    if (document.getElementsByClassName("entrada")[i].classList.contains("quitar")) {
      document.getElementsByClassName("entrada")[i].classList.remove("quitar");
    }
  }
  if (this.id==="barras"){
    document.getElementById("ecargas").classList.add("quitar");
  }else if (this.id==="cargas") {
    document.getElementById("ebarras").classList.add("quitar");
  }
}
function puntoManual() {
  var p=new Array(5);
  p[0]=parseFloat(document.getElementById("core").value);
  p[1]=parseFloat(document.getElementById("corn").value);
  p[2]=parseFloat(document.getElementById("nest").value);
  p[3]=parseFloat(document.getElementById("elev").value);
  p[4]=parseFloat(document.getElementById("hbr").value);
  if (document.getElementById("core").value=="" || document.getElementById("corn").value=="" || document.getElementById("nest").value=="" || document.getElementById("elev").value=="" || document.getElementById("hbr").value=="") {
    return false;
  }
  crearPunto(p[0],p[1],p[2],p[3],p[4]);
  origen();
  pm=pm+1;
}
function escalaGrafica() {
  var can=document.getElementById("curvas").getContext("2d");
  can.beginPath();
  can.strokeStyle="rgb(173, 218, 217)";
  can.moveTo(20,600);
  can.lineTo(20,590);
  can.moveTo(20,600);
  can.lineTo(20+1000*zoom,600);
  can.lineTo(20+1000*zoom,590);
  can.moveTo(20+1000*zoom,600);
  can.lineTo(20+5000*zoom,600);
  can.lineTo(20+5000*zoom,590);
  can.moveTo(20+5000*zoom,600);
  can.lineTo(20+10000*zoom,600);
  can.lineTo(20+10000*zoom,590);
  can.stroke();
  can.fillStyle="#fff";
  can.font="10px Consolas";
  can.fillText(0,18,587);
  can.fillText("1Km",18+1000*zoom,587);
  can.fillText("5Km",18+5000*zoom,587);
  can.fillText("10Km",18+10000*zoom,587);
  can=document.getElementById("elevEst").getContext("2d");
  can.beginPath();
  can.strokeStyle="rgb(173, 218, 217)";
  can.moveTo(20,600);
  can.lineTo(20,590);
  can.moveTo(20,600);
  can.lineTo(20+1000*zoom,600);
  can.lineTo(20+1000*zoom,590);
  can.moveTo(20+1000*zoom,600);
  can.lineTo(20+5000*zoom,600);
  can.lineTo(20+5000*zoom,590);
  can.moveTo(20+5000*zoom,600);
  can.lineTo(20+10000*zoom,600);
  can.lineTo(20+10000*zoom,590);
  can.stroke();
  can.fillStyle="#fff";
  can.font="10px Consolas";
  can.fillText(0,18,587);
  can.fillText("1Km",18+1000*zoom,587);
  can.fillText("5Km",18+5000*zoom,587);
  can.fillText("10Km",18+10000*zoom,587);
}
function chosePlano() {
  for (var i = 0; i < document.getElementsByClassName("opcionesPlanos").length; i++) {
    if (document.getElementsByClassName("opcionesPlanos")[i].classList.contains("planoElegido")) {
      document.getElementsByClassName("opcionesPlanos")[i].classList.remove("planoElegido");
    }
  }
  this.classList.add("planoElegido");
  if (this.id=="plxz" || this.id=="unPunto") {
    return false;
  }
  for (var i = 0; i < document.getElementsByClassName("zonaDibujo").length; i++) {
    if (document.getElementsByClassName("zonaDibujo")[i].classList.contains("quitar")) {
      document.getElementsByClassName("zonaDibujo")[i].classList.remove("quitar")
    }
  }
  if (this.id=="plxy") {
    document.getElementById("elev").classList.add("quitar");
    document.getElementById("curvPrin").classList.remove("quitar");
    document.getElementById("elevEst").classList.add("quitar");
  }else if (this.id=="plzy") {
    document.getElementById("curvas").classList.add("quitar");
    document.getElementById("curvPrin").classList.add("quitar");
    document.getElementById("curvElev").classList.remove("quitar");
  }else {

  }
}
function checador() {
  if (this.value=="" || this.value<0) {
    this.value=10;
  }else {
    eqd=parseFloat(this.value);
  }
}
function checarNecesario() {
  if (this.value=="") {
    this.value=0;
  }
}
