function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

function getImage(path, imageName) {
  return new URL(path + imageName, import.meta.url).href;
}

function getAbscisa(abscisa) {
  var arregloAbscisa = String(abscisa).split(".");
  var label: String

  if(arregloAbscisa.length > 1){
    label = "K " + arregloAbscisa[0] + " + " + arregloAbscisa[1].substring(0, 3);
  }else{
    label = "K 0 + 0";
  }
  
  return label;
}

export { arePointsNear, getImage, getAbscisa };
