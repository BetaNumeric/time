var tabNum = 7;

var data = [];
var tableName = [];
var showTable = [];
var selectTable;
var nameList = new Array(tabNum);
var timeList = new Array(tabNum);
var endList = new Array(tabNum);
var unitList = new Array(tabNum);
var magList = new Array(tabNum);
var modeList = new Array(tabNum);
var orderList = new Array(tabNum);
var textList = new Array(tabNum);
var colorList = new Array(tabNum);
var imgList = [];
var resizedImgList = [];

var movibleX = new Array(tabNum);


var imageW;
var textBox;
var maskImage;


var prefixS = [];
var prefixL = [];

var prefixIndex=4, yearPrefixIndex=prefixIndex-3, magnitude=0, yearMagnitude=0;
var Unit, wholeNumber;
var nowAxis;
var delay;
var skip=1, ySkip=1;
var dragStart=0;
var secY, yearY, lineH, textS;
var nowX=0, nowY=0, nowW=0, nowH=0, nowXoffset=0, nowRl, nowRr, nowLineW=0;
var nowTxt="";
var lineW=2;
var textW=0;
var scrollValue=0.1;
var oneSec;
var tScroll=0;
var milliSecond=0, pmilliSecond=milliSecond;
var thisYear;
var oneYear;
var dayOfYear;
var pSecond=0;
var pDay=0;
var nowSelected=false;
var imgSelected=new Array(tabNum);
var imgMag=new Array(tabNum);
var imgDragStart=0;
var record=false;
var stopTime=true;
var showSeconds=true;
var mouseWasDragged=false;

var sketchWidth=1280, sketchHeight=720;
var sketchWidth=900, sketchHeight=512;

var cnv;

function setup() {
  //noLoop();
  //createCanvas(sketchWidth, sketchHeight);
  cnv = createCanvas(windowWidth*2/3, windowHeight*2/3);
  windowResized();
  nowAxis=width/2;
  imageW=height/5;
  if (imageW<=0) {
    imageW=1;
  }
  loadFiles();
}


function preload() {
  for (let i=0; i<tabNum; i++) {
    imgSelected[i]=false;
    imgMag[i]=0;
    movibleX[i]=0.1;
  }

  let url = new Array(tabNum);
  //tableName[0]="test";  showTable[0]=true;
  //url[0]="https://docs.google.com/spreadsheets/d/e/2PACX-1vRY2RbAHHHFvXeGDo2Tzwly5olAvI0FtGA0tR7wSswQCNR-_ktftqjfptwDRl4spnhLagUuRU3iZxuh/pub?gid=1083787111&single=true&output=csv";
  tableName[0]="past earth";
  showTable[0]=true;
  url[0]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=107754275&single=true&output=csv";
  movibleX[0] = -10;

  tableName[1]="future earth";
  showTable[1] = true;
  url[1] = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=273116154&single=true&output=csv";
  movibleX[1]=10;

  tableName[2]="future";
  showTable[2]=true;
  url[2]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=142672475&single=true&output=csv";
  tableName[3]="geologic time";
  showTable[3]=true;
  url[3]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=1415895311&single=true&output=csv";
  tableName[4]="inventions";
  showTable[4]=true;
  url[4]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=592605780&single=true&output=csv";
  tableName[5]="life";
  showTable[5]=true;
  url[5]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=0&single=true&output=csv";
  tableName[6]="time spans";
  showTable[6]=true;
  url[6]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=1873062094&single=true&output=csv";
  tableName[7]="waves";
  showTable[7]=true;
  url[7]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS4uMoj18ERhKiHm_puoNYRv7bHcStcYyTlNmO4w5vEXJFnpZqtftMwsgUw6LWyWIWFYZRCPuOIHj3/pub?gid=844114706&single=true&output=csv";





  /*
tableName[0]="geologic_time";
   url[0]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSCkxvFvon4MFpljqKyw6NWciCqgW4Q9J-PuCEJY56i6Jzy1Y5uw4vpLY9hSULGriUv4sHFymtHmTFN/pub?gid=1083787111&single=true&output=csv";
   tableName[1]="timespans";
   url[1]="https://docs.google.com/spreadsheets/d/e/2PACX-1vSAnMss3Pg-2t4b4HQniJR7f_IEbmIMNDiAw5eD8Vds-xzC5RiEa0c7rbVlVEq6_qKfgNch6j2PJyRy/pub?gid=689944470&single=true&output=csv";
   tableName[2]="waves";
   url[2]="https://docs.google.com/spreadsheets/d/e/2PACX-1vTHyIKk-FMY3XqenqDJYpR8uO-JQqVd0xkXorcSJHgsrhbNedcZdcPEKMrgbjCxhx-wRz1w45XJvFY0/pub?gid=729459883&single=true&output=csv";
   tableName[3]="future";
   url[3]="https://docs.google.com/spreadsheets/d/e/2PACX-1vTRCRND0FVxFWch6TmhjvCdm-AhGrbJfywhE0yfMVkG8vZGoGgLlHpabx-4mlBWMTu66vLHWe-hBbeu/pub?gid=1933524719&single=true&output=csv";
   tableName[4]="inventions";
   url[4]="https://docs.google.com/spreadsheets/d/e/2PACX-1vQIz2m6UIMz5DeO8-abM3hnKXOYXvgJcX8NXvA6vyPEt8f--NgH-u-1mnkGMCSGlJaqqVj5b5UaL2Vv/pub?gid=290891940&single=true&output=csv";
   tableName[5]="continental_drift";
   url[5]="https://docs.google.com/spreadsheets/d/e/2PACX-1vRQIM5tYmSUbglSwE5U1cHZ7El1ogtETfUsCMITKbQllIDZaF5uxhYQigPuzjQ9NhWg6KShCBuahGXO/pub?gid=730104933&single=true&output=csv";
   tableName[6]="life";
   url[6]="https://docs.google.com/spreadsheets/d/e/2PACX-1vTOqF-SeFSGc6C7YjwjfkXE2oNDbiEurhhF8iiGwYOKxZBvNVuZnOaYf5fTVrFOWnjAqPeo5EZJ9Z9H/pub?gid=1233932843&single=true&output=csv";
   
   */

  textBox=createGraphics(100, 100);
  maskImage=createGraphics(100, 100);

  for (let i=0; i<url.length; i++) {
    data[i] = loadTable(url[i], 'csv', 'header');
    imgList[i] = [];
    resizedImgList[i] = [];
  }
}


function loadFiles() {
  for (let i=0; i<1; i++) {
    prefixS[i] = [];
    prefixL[i] = [];
  }

  prefixS[0] = ["", "m", "µ", "n", "p", "f", "a", "z", "y"];
  prefixS[1] = ["", "milli", "micro", "nano", "pico", "femto", "atto", "zepto", "yocto"];
  prefixL[0] = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  prefixL[1] = ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"];


  for (let i=0; i<data.length; i++) {
    for (let j=0; j<data[i].getRowCount(); j++) {
      let url="";
      for (let k=0; k<data[i].getColumnCount(); k++) {
        if (data[i].columns[k] === "img") {
          url = data[i].getString(j, "img");
        }
      }
      if (url!=="") {
        imgList[i][j] = loadImage("data/"+url);
        //resizedImgList[i][j] = loadImage("data/"+url);
      }
    }
  }
}

function draw() {
  //noLoop();
  textS=15+height/200;
  //textS=15;
  textSize(textS);
  secY=height/10;
  yearY=height/10;
  lineH=secY-(secY/textS)*6;

  if (nowAxis>width) {
    nowAxis=width;
  }
  if (nowAxis<0) {
    nowAxis=0;
  }
  background(0);
  fill(255);

  if (mouseIsPressed) {
    cursor('grabbing');  //CROSS
  } else {
    cursor('grab');  //MOVE
  }
  if (nowSelected) {
  }


  if (scrollValue>0.1) {
    yearPrefixIndex=prefixIndex-2;
  }
  if (scrollValue<0.1) {
    yearPrefixIndex=prefixIndex-3;
  }

  dayOfYear = calDayOfYear(day(), month(), year());

  if (milliSecond+1/frameRate()<1) {
    milliSecond+=1/frameRate();
  }
  if (second() != pSecond) {
    milliSecond=0;
    pSecond=second();
  }
  if (milliSecond>=1) {
    milliSecond=0.999;
  }

  if (mouseY<lineH+textS*2||mouseY>height-lineH-textS*2) {
    strokeWeight(textW);
    stroke(255);
    if (mouseY>height-lineH-textS*2 ) {
      if (magnitude>8 && magnitude<23) {
        text(nfc(((mouseX-nowAxis)*scrollValue/skip*3.1556952)*pow(10, (magnitude-8)), 0)+"a", mouseX, height/2);
      } else {
        text(nfc((mouseX-nowAxis)*scrollValue/skip*3.1556952, 3)+"×10"+powerOf(magnitude-8)+"a", mouseX, height/2);
      }
    } else {
      if (magnitude>0 && magnitude<17) {
        text(nfc(((mouseX-nowAxis)*scrollValue/skip)*pow(10, magnitude), 0)+"s", mouseX, height/2);
      } else {
        text(nfc((mouseX-nowAxis)*scrollValue/skip, 3)+"×10"+powerOf(magnitude)+"s", mouseX, height/2);
      }
    }
    strokeWeight(0.1);
    line(mouseX, height/2-(secY/textS)*6, mouseX, 0);
    line(mouseX, height/2+(secY/textS)*6, mouseX, height);
  }



  seconds();
  if (yearPrefixIndex<1 && yearPrefixIndex>-6) {
    timeScroll();
  }

  years();


  noFill();
  stroke(255);
  for (let i=0, c=0; i<data.length; i++) {
    for (let j=0; j<data[i].getRowCount(); j++) {

      let name, time, end, unit, mag, mode, order, text, col, img;

      for (let k=0; k<data[i].getColumnCount(); k++) {
        if (data[i].columns[k] === "name") {
          name = data[i].getString(j, "name");
        }

        if (data[i].columns[k] === "time") {
          if (data[i].getString(j, "time")==="now") {
            time = -0.12345;
          } else {
            time = data[i].get(j, "time");
          }
        }

        if (data[i].columns[k] === "end") {
          if (data[i].getString(j, "end")==="") {
            end = data[i].get(j, "time");
          } else if (data[i].getString(j, "end")==="now") {
            end = -0.12345;
          } else {
            end = data[i].get(j, "end");
          }
        }

        if (data[i].columns[k] === "unit") {
          unit = data[i].getString(j, "unit");
        }
        if (data[i].columns[k] === "mag") {
          mag = data[i].get(j, "mag");
        }
        if (data[i].columns[k] === "mode") {
          mode = data[i].get(j, "mode");
        }
        if (data[i].columns[k] === "order") {
          order = data[i].get(j, "order");
        }
        if (data[i].columns[k] === "text") {
          text = data[i].getString(j, "text");
        }
        if (data[i].columns[k] === "color") {

          if (data[i].getString(j, "color") !== "") {

            let fromIndex1 = data[i].getString(j, "color").indexOf("/"),
              fromIndex2 = data[i].getString(j, "color").indexOf("/", fromIndex1+1),
              r=0, g=0, b=0;

            if (data[i].getString(j, "color").length>0) {
              r=int(data[i].getString(j, "color").substring(0, data[i].getString(j, "color").length));
              g=r;
              b=r;
            }
            if (fromIndex1>0) {
              r=int(data[i].getString(j, "color").substring(0, fromIndex1));
              g=int(data[i].getString(j, "color").substring(fromIndex1+1, fromIndex2));
              b=int(data[i].getString(j, "color").substring(fromIndex2+1, data[i].getString(j, "color").length));
            }
            col = color(r, g, b);
          }
        }
        if (data[i].columns[k] === "img" && data[i].getString(j, "img")!=="") {
          //print(imgList[i][j]);
          img = createImage(100, 100);
          img = imgList[i][j];
        }
      }
      if (showTable[i]) {
        dataVis(i, j, c, name, time, end, unit, mag, mode, order, text, col, img);
      }
      if (mode == 1) {
        c++;
      }
    }
  }
  Axis();
  textAlign(RIGHT);
  let border=width/4;
  let posToYear= scrollValue/skip*3.1556952*pow(10, magnitude-8);


  /*
  if ((border-nowAxis)*posToYear<movibleX[0]*pow(10, imgMag[0])) {
   
   //movibleX[0]=(border-nowAxis)*scrollValue/skip*3.1556952;
   
   }
   
   //let yearToPos= nowAxis-(1/(scrollValue/skip)*3.1556952)*pow(10, (yearMagnitude)) ;
   let yearToPos= nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-imgMag[0])))*(-2)*31556952;
   
   text(nf(movibleX[0], 0, 2)+"    "+nf(movibleX[1], 0, 2)+"   "+nf(frameRate(), 0, 1), width-20, 130);
   text((border-nowAxis)*posToYear+"    "+posToYear, width-20, 160);
   
   stroke(255);
   strokeWeight(lineW);
   line(yearToPos, 0, yearToPos, height);
   
   //imgMag[0]
   //text(nfc((mouseX-nowAxis)*scrollValue/skip*3.1556952, 3)+"×10"+powerOf(magnitude-8)+"a", mouseX, height/2);
   //nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-movX)*secInYear;
   
   //rect(nowAxis-movibleX, height-height/5, imageW, imageW);
   
   */
}




function dataVis(i, j, id2, n, l, lx, u, mag, mode, order, t, c, img) {

  let selected=false;
  let margin=textS/2;
  let secInYear=31556952;
  let w=1/(scrollValue*pow(10, (prefixIndex*3-mag)))*l,
    start=0,
    end=0,
    movX = movibleX[i],
    mov = movX,
    h=height/5, x=nowAxis, y=height/2-h/2;

  //movX = movibleX*(scrollValue/skip*3.1556952)*pow(10, (magnitude-8-mag));


  textSize(textS);
  rectMode(CORNER);
  noFill();
  fill(255);
  stroke(255);

  if (mode!=4) {
    //mode=-1;
  }

  if (u === "ad") {
    start = nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*((year() + (float(dayOfYear) + (float(hour()/24)))/365) - l)*secInYear;
    end = nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*((year() + (float(dayOfYear) + (float(hour()/24)))/365) - lx)*secInYear;
  }


  if (u === "bp") {
    start = nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-l)*secInYear;
    end = nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-lx)*secInYear;
    mov = nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-movX)*secInYear;
  }
  if (u === "a") {
    w=1/(scrollValue*pow(10, (prefixIndex*3-mag)))*l*secInYear;
  }

  if (l==-0.12345) {
    start=nowAxis;
  }
  if (lx==-0.12345) {
    end=nowAxis;
  }

  if (mode==4 && abs(mov-nowAxis)>5 && abs(mov-nowAxis)<width+imageW/2) {
    let imgY=height-h;
    let imageH = imageW*img.height/img.width;
    let maxX = data[i].get(data[i].getRowCount()-1, "time");
    let minX = data[i].get(0, "time");

    //mov = nowAxis-1/(pow(10, (prefixIndex*3-mag)))*(-movX)*secInYear;

    imgMag[i]=mag;

    if (movX>maxX) {
      movX=float(maxX)-0.001;
      movibleX[i]=movX;
      mov=nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-movX)*secInYear;
    }
    if (movX<=minX) {
      movX=float(minX)+0.001;
      movibleX[i] = movX;
      mov=nowAxis-1/(scrollValue*pow(10, (prefixIndex*3-mag)))*(-minX)*secInYear;
    }
    if (img!=undefined) {
      imageMode(CENTER);
      if (j<=data[i].getRowCount() && j>0) {
        noTint();
        stroke(255);
        strokeWeight(1);

        if (abs(mov-nowAxis)<imageW+5) {
          tint(255, map(abs(mov-nowAxis), imageW+5, 5, 255, 0));
          stroke(map(abs(mov-nowAxis), imageW+5, 5, 255, 0));
        }

        line(mov, imgY+imageH/2, mov, height);
        noStroke();

        if (data[i].get(j-1, "time")<=movX && data[i].get(j, "time")>movX) {
          //text(data[i].get(j, "time")+"×10"+powerOf(mag)+"a", mov, imgY-imageH/2-textS);
          if (mouseX<mov+imageW/2 && mouseX>mov-imageW/2 &&
            mouseY<imgY+imageH/2 && mouseY>imgY-imageH/2) {
            imgSelected[i]=true;
          } else {
            imgSelected[i]=false;
          }

          image(img, mov, imgY, imageW, imageH);
        }
      }
    }
  }

  if (mode==1 && ((start<width*1.25 && start>nowAxis+1) ||
    (end>-width*0.25 && start<nowAxis-1))) {
    //for time points and time spans at the bottom half of the window

    let r=10, h1=height/4;

    if (img!=undefined) {
      h1=height/7;
    }
    if (img==undefined && id2%2==0) {

      h1=height/4+height/12;
    }
    if (img==undefined && id2%3==0) {
      h1=height/4+height/6;
    }
    x=start;

    if (u === "ad") {
      if (lx-year()<0) {
        h=map(x, nowAxis-width/5, nowAxis, h1, height/2);
      }
      if (lx-year()>0) {
        h=map(end, nowAxis+width/5, nowAxis, h1, height/2);
      }
      if (end>nowAxis+width/5 || x<nowAxis-width/5) {
        h=h1;
      }
    }
    if (u === "bp") {

      if (lx<0) {
        h=map(x, nowAxis-width/5, nowAxis, h1, height/2);
      }
      if (lx>0) {
        h=map(end, nowAxis+width/5, nowAxis, h1, height/2);
      }
      if (end>nowAxis+width/5 || x<nowAxis-width/5) {

        h=h1;
      }
    }

    strokeWeight(1);
    noFill();
    if (start!=end) {
      rect(x, height-lineH*2, end-start, h, 50);
    } else {
      line(x, height, x, height-h);
    }

    x=start+abs(start-end)/2;

    if (start!=end) {
      line(x, height-lineH*2, x, height-h);
    }

    let scale = map(h, h1, height/2, 1, 0);

    if (img==undefined) {

      textSize(textS*scale);
      rectMode(CENTER);
      fill(0);
      stroke(255);
      strokeWeight(1);
      rect(x, height-h, (textWidth(n)+margin*2*scale), (textS+margin*2)*scale, r*scale);

      textAlign(CENTER, CENTER);
      noStroke();
      fill(255);
      text(n, x, height-h);
    } else {
      let imageH = imageW*img.height/img.width;

      if (end>nowAxis+width/5 || x<nowAxis-width/5) {
      }
      imageMode(CENTER);

      image(img, x, height-h-imageH*scale/2, imageW*scale, imageH*scale);
    }
  }



  if (mode==3 & w>2 && w<width*10) {
    let ampMargin=lineW+height/10, s=height/2-ampMargin;

    strokeWeight(lineW);
    if (w<width/3) {
      s=map(w, width/3, 3, s, 0);
      if (w<5) {
        strokeWeight(map(w, 5, 2, lineW, 0));
      }
    }
    if (w>=width/2) {
      s=map(w, width/2, width*5, s, 0);
    }
    if (w>=width*5) {
      s=0;
      if (w<width*10) {
        strokeWeight(map(w, width*5, width*10, lineW, 0));
      }
    }

    if (s<0) {
      s=0;
    }
    stroke(255, 127);
    noFill();
    textAlign(CENTER, BOTTOM);
    let wave = new p5.Vector(-lineW, height/2);
    let pWave = new p5.Vector(-lineW, height/2);

    beginShape();
    for (let i=-lineW; i<=width; i+=1) {
      wave.x=i;
      wave.y=s*cos((TWO_PI/w)*(nowAxis-wave.x))+height/2;
      curveVertex(wave.x, wave.y);
      pWave.x=wave.x;
      pWave.y=wave.y;
    }
    endShape();

    if (nowAxis<width/2) {
      wave.x=nowAxis+w/4;
      if (w<width/2) {
        wave.x=nowAxis+width/8;
      }
      if (w<width/4) {
        wave.x=nowAxis+w/2;
      }
    } else {
      wave.x=nowAxis-w/4;
      if (w<width/2) {
        wave.x=nowAxis-width/8;
      }
      if (w<width/4) {
        wave.x=nowAxis-w/2;
      }
    }

    if (w<width/16) {
      textSize(map(w, width/16, 0, textS, 0));
    } else {
      textSize(textS);
    }
    fill(255, 127);

    wave.y=s*cos((TWO_PI/w)*(nowAxis-wave.x))+height/2;
    pWave.x=wave.x+0.1;
    pWave.y=s*cos((TWO_PI/w)*(nowAxis-pWave.x))+height/2;

    push();
    translate(wave.x, wave.y);
    let a = new p5.Vector(wave.x, wave.y);
    let b = new p5.Vector(pWave.x, pWave.y);
    a.sub(b);
    rotate(radians(180)+a.heading());
    strokeWeight(textW);
    text(n, 0, -lineW);
    pop();
  }



  if (mode==0 && w>0.1) {
    //for the time length of events at the lower half of the top half of the window
    let h1=height/4, y1=height/2-h1/2;
    let ts=textS, rL=0, rR=0;
    x=width/2;
    if (nowAxis<x-w/2) {
      x=nowAxis+w/2;
    }
    if (nowAxis>x+w/2) {
      x=nowAxis-w/2;
    }

    noFill();
    stroke(255);
    strokeWeight(1);
    textSize(textS);
    rectMode(CENTER);
    textAlign(LEFT, CENTER);

    if (w<width/2) {
      y=map(w, width/2, nowW-lineW, y1, y1+(h1-(nowH/2))/2);
      h=map(w, width/2, nowW-lineW, h1, (nowH/2));
      if (w<nowW-lineW) {
        y=map(w, nowW-lineW, 0, y1+(h1-(nowH/2))/2, y1+h1/2);
        h=map(w, nowW-lineW, 0, (nowH/2), 0);
      }

      rL=map(w, width/2, nowW-lineW, 0, abs((nowW-nowLineW)/7));
      if (nowAxis<x-w/2+rL) {
        rL=nowAxis-x+w/2;
      }
      rR=map(w, width/2, nowW-lineW, 0, abs((nowW-nowLineW)/7));
      if (nowAxis>x+w/2-rL) {
        rR=x+w/2-nowAxis;
      }
    } else {
      y=y1;
      h=h1;
      rL=0;
      rR=0;
    }

    if (w>width+textWidth(n)*2+margin*2) {
      rect(x, y, width+lineW*2, h1);
    } else {
      //fill(0);
      rect(x, y, w, h, abs(rL), abs(rR), 0, 0);

      fill(255);
      if (w>textWidth(n)+ts) {
        ts=textS;
      } else {
        ts=map(w, textWidth(n)+ts, 0, textS, 0);
      }
      textSize(ts);
      strokeWeight(textW);
      text(n, x-w/2+ts/2, y-h/2+ts+ts/3);
    }
  }





  if (mode==2 && !showSeconds && end>0) {
    //for geologic time scale (eon,era,period,epoch) at the top of the window
    let offset=0;
    if (order==1) {
      offset=height/16;
    }
    if (order==2) {
      offset=(height/16)*2;
    }
    if (order==3) {
      offset=(height/16)*3;
    }
    let h1=height/4-offset, y1=offset;
    let ts=textS;

    w=start-end;
    h=h1;
    x=end;
    y=y1;
    c.setAlpha(42);
    fill(c);
    stroke(255);
    strokeWeight(1);
    textSize(textS);
    rectMode(CORNER);
    textAlign(LEFT, TOP);


    if (abs(w)<nowAxis) {
      rect(x, y, w, h);
    } else {
      rect(x, y, -nowAxis-lineW, h);
    }
    fill(255);
    if (textWidth(n)+ts<abs(w)) {
      ts=textS;
    } else {
      ts=map(abs(w), textWidth(n)+textS+margin, 0, textS, 0);
    }
    if (ts<5) {
      ts=5;
    }
    textSize(ts);
    strokeWeight(textW);
    if (abs(w)>textWidth(n)+ts) {
      if (end>textWidth(n)+ts && start<0) {
        text(n, ts/2, y+margin/2);
      } else if (end<textWidth(n)+ts) {
        text(n, x-textWidth(n)-ts/2, y+margin/2);
      } else {
        text(n, x+w+ts/2, y+margin/2);
      }
    }
  }
}


function Axis() {
  /*draws the vertical line representing now, switches between stopped time and real-
   time, lets you select and deselect different data
   */
  let maxTableNameLength=0;
  textSize(textS);
  for (let i=0; i<tableName.length; i++) {
    if (textWidth(tableName[i])>maxTableNameLength) {
      maxTableNameLength=textWidth(tableName[i]);
    }
  }
  if (nowLineW==0 &&mouseX>nowX-nowW/2+nowXoffset && mouseX<nowX+nowW/2+nowXoffset &&
    mouseY>nowY-nowH/2 && mouseY<nowY+nowH/2 && abs(dragStart)<nowW/2) {
    nowSelected=true;
  } else {
    if (mouseIsPressed===false) {
      nowSelected=false;
    }
  }


  if (mouseX<nowAxis+nowLineW/2+nowW/8 && mouseX>nowAxis-nowLineW/2-nowW/8 && !nowSelected) {
    delay++;
    if (delay>20 ) {
      cursor('pointer');
      if ( nowLineW<maxTableNameLength+50 && mouseIsPressed===false) {
        nowLineW += 6;
      }
    }
  } else {
    selectTable=-1;
    delay=0;
    if (nowLineW>=6) {
      nowLineW -= 6;
    }
    if (nowLineW<6) {
      nowLineW = 0;
    }
  }

  fill(0);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  stroke(255);
  textSize(textS);
  strokeWeight(lineW);
  nowX=nowAxis;
  nowY=height/2;
  if (stopTime) {
    nowTxt="now";
    nowW=textWidth(nowTxt)+textS*1.5;
  } else {
    nowTxt="00:00:00.00";
    nowW=textWidth(nowTxt)+textS*1.5;
    nowTxt=nf(hour(), 2)+":"+nf(minute(), 2)+":"+nf(second()+milliSecond, 2, 2)+"\n"+nf(day(), 2)+"/"+nf(month(), 2)+"/"+year();
  }
  nowRl=abs((nowW-nowLineW)/7);
  nowRr=abs((nowW-nowLineW)/7);
  if (nowAxis<nowRl) {
    nowRl=nowAxis;
  } else if (nowAxis>width-nowRl) {
    nowRr=width-nowAxis;
  }

  if (nowAxis<nowW/2) {
    nowXoffset = (nowW/2-nowAxis);
  } else if (nowAxis>width-nowW/2) {
    nowXoffset = (width-nowW/2-nowAxis);
  } else {
    nowXoffset=0;
  }

  strokeWeight(lineW/2);
  if (stopTime) {
    nowH=textS*2.5;
    rect(nowX+map(nowLineW, 0, nowW, 0, nowXoffset), height/2, nowLineW, height+lineW*2);
  } else {
    nowH=textS*4;
    if (nowLineW>0) {
      rect(nowX+map(nowLineW, 0, nowW, 0, nowXoffset), height/2, nowLineW, height);
    } else {
      //rect(nowX+map(nowLineW, 0, nowW, 0, nowXoffset), height/2, nowLineW, height-secY*2-textS*3);
      if (showSeconds) {
        line(nowX, secY+textS+textS/3, nowX, height-secY-textS-textS/2);
      } else {
        line(nowX, 0, nowX, height-secY-textS-textS/2);
      }
    }
  }



  strokeWeight(lineW);
  if (nowSelected && mouseWasDragged===false) {
    cursor('pointer');
    strokeWeight(lineW+2);
    fill(55);
  }
  rectMode(CORNER);

  rect(nowX-nowW/2+nowXoffset, nowY-nowH/2, nowW, nowH, nowRl, nowRr, nowRr, nowRl);

  fill(255);
  strokeWeight(textW);
  text(nowTxt, nowX+nowXoffset, nowY);



  if (nowLineW>0) {
    for (let i=0; i<tableName.length; i++) {
      let x=nowX+map(nowLineW, 0, maxTableNameLength, 0, nowXoffset)-nowLineW/2;
      let h=height/tableName.length;

      fill(0);
      stroke(255);
      strokeWeight(lineW);
      if (showTable[i]) {
        fill(0, 50, 0);
      } else {
        fill(50, 0, 0);
      }

      rect(x, h*i, nowLineW, h);
      if (mouseX<nowAxis+(maxTableNameLength+textS)/2 &&
        mouseX>nowAxis-(maxTableNameLength+textS)/2 && mouseY>h*i && mouseY<h*i+h) {
        fill(255, 50);
        if (mouseIsPressed === true) {
          fill(255, 100);
          selectTable=i;
        } else {
          selectTable=-1;
        }
      }
      rect(x, h*i, nowLineW, h);


      noStroke();
      fill(255);
      textSize(map(nowLineW, 0, maxTableNameLength+textS, 0, textS));
      text(tableName[i], nowX, h*i+h/2);
    }
  }
}


function timeScroll() {
  let  h = yearY*2;
  let l = [];
  l = [0.001, 1, 60, 3600, 86400, 31556952];

  let Unit = [];
  Unit = ["ms", "s", "min", "h", "d", "a"];

  let e = [];
  e = [1000, 60, 60, 24, 365.2425, 70000000];

  let skip = [];
  skip = [1, 1, 1, 1, 1, 1];

  let t = [];
  t = [milliSecond, second(), minute(), hour(), dayOfYear, year()-2000];


  if (stopTime) {
    for (let i=0; i<t.length; i++) {
      t[i]=0;
    }
  } else {
    Unit[Unit.length-1]="";
  }

  textAlign(CENTER, CENTER);
  strokeWeight(lineW);
  stroke(255);

  oneSec=1/(scrollValue*pow(10, prefixIndex*3));
  for (let u=0; u<l.length; u++) {


    if (u==5 && l[u]*oneSec<100) {
      skip[u]=e[u];
    }

    if (u==4) {
      if (l[u]*oneSec<60) {
        skip[u]=365/52;
      }
      if (l[u]*oneSec<10) {
        skip[u]=360/12;
      }
      if (l[u]*oneSec<3) {
        skip[u]=360/6;
      }
      if (l[u]*oneSec<1.5) {
        skip[u]=360/2;
      }
      if (l[u]*oneSec<0.5) {
        skip[u]=360;
      }
      e[u]=360;
    }
    if (u==3) {
      if (l[u]*oneSec<100) {
        skip[u]=e[u]/12;
      }
      if (l[u]*oneSec<30) {
        skip[u]=e[u]/4;
      }
      if (l[u]*oneSec<12) {
        skip[u]=e[u]/2;
      }
      if (l[u]*oneSec<5) {
        skip[u]=e[u];
      }
    }
    if (u==2||u==1) {
      if (l[u]*oneSec<75) {
        skip[u]=e[u]/12;
      }
      if (l[u]*oneSec<17.5) {
        skip[u]=e[u]/6;
      }
      if (l[u]*oneSec<8) {
        skip[u]=e[u]/2;
      }
      if (l[u]*oneSec<2) {
        skip[u]=e[u];
      }
    }
    if (u==0) {
      if (l[u]*oneSec<100) {
        skip[u]=e[u]/200;
      }
      if (l[u]*oneSec<25) {
        skip[u]=e[u]/100;
      }
      if (l[u]*oneSec<9) {
        skip[u]=e[u]/40;
      }
      if (l[u]*oneSec<4.5) {
        skip[u]=e[u]/20;
      }
      if (l[u]*oneSec<2) {
        skip[u]=e[u]/10;
      }
      if (l[u]*oneSec<1) {
        skip[u]=e[u]/4;
      }
      if (l[u]*oneSec<0.5) {
        skip[u]=e[u]/2;
      }
      if (l[u]*oneSec<0.15) {
        skip[u]=e[u];
      }
    }

    let time;
    if (stopTime) {
      time=0;
    } else {
      time=milliSecond;
    }
    for (let i=u; i>0; i--) {
      time+=t[i]*l[i];
    }

    let scroll=time*oneSec;

    if (l[u]*oneSec>0.1) {
      for (let i=nowAxis; i<=width*2+scroll; i+=l[u]*oneSec*skip[u]) {
        strokeWeight(lineW);
        let x=(i-nowAxis)/(l[u]*oneSec);
        if (x>0 && x<e[u]-0.5) {
          line(i-scroll, height, i-scroll, height-lineH);
          if (stopTime) {
            line(2*nowAxis-i, height, 2*nowAxis-i, height-lineH);
            strokeWeight(textW);
            text(round(x)+Unit[u], i-scroll, height-h/2);
            text("-"+round(x)+Unit[u], 2*nowAxis-i, height-h/2);
          } else {
            strokeWeight(textW);
            if (u==5) {
              text(round(x)+2000+Unit[u], i-scroll, height-h/2);
            } else {
              text(round(x)+Unit[u], i-scroll, height-h/2);
            }
          }
        }
      }
    }

    //waves:

    if (u==4) {
      e[u]=365.2425;
    }
    let w=TWO_PI/(oneSec*l[u]);
    let s=h/9;
    let s2=map(w, 0, 1, s, 0);
    let prev=10000;
    if (s2<0) {
      s2=0;
    }
    let minY=height;



    strokeWeight(1);
    for (let j=0; j<=1; j++) {
      if (u>=1) {
        prev = e[u-1];
      }

      if (s2>0 && TWO_PI/(oneSec*l[u]/prev) >= 1) {

        let pI=-lineW, pY=0;
        let y = [];
        y = [0, 0, 0, 0, 0, 0];

        for (let i=-lineW; i<=width; i+=0.5) {
          if (u<l.length-4) {
            y[5]=s*cos((TWO_PI/(oneSec*e[u+4]*l[u+4]))*(i-nowAxis+(time+t[u+4]*l[u+4])*oneSec))-s;
          }
          if (u<l.length-3) {
            y[4]=s*cos((TWO_PI/(oneSec*e[u+3]*l[u+3]))*(i-nowAxis+(time+t[u+3]*l[u+3])*oneSec))+y[5]-s;
          }
          if (u<l.length-2) {
            y[3]=s*cos((TWO_PI/(oneSec*e[u+2]*l[u+2]))*(i-nowAxis+(time+t[u+2]*l[u+2])*oneSec))+y[4]-s;
          }
          if (u<l.length-1) {
            y[2]=s*cos((TWO_PI/(oneSec*e[u+1]*l[u+1]))*(i-nowAxis+(time+t[u+1]*l[u+1])*oneSec))+y[3]-s;
          }
          if (u<l.length) {
            y[1]=s*cos((TWO_PI/(oneSec*e[u+0]*l[u+0]))*(i-nowAxis+(time)*oneSec))+y[2]-s;
          }
          y[0]=s2*cos(TWO_PI/(oneSec*l[u])*(i-nowAxis+(time)*oneSec))+height+y[1]-s2;
          if (j==1) {
            line(i, y[0]+minY, pI, pY+minY);
          }
          pI=i;
          pY=y[0];
          if (j==0 && height-y[0]<minY) {
            minY=height-y[0];
          }
        }
      }
    }
  }
}


function seconds() {

  if (scrollValue>1) {
    scrollValue=0.001;
    prefixIndex++;
  }
  if (scrollValue<0.001) {
    scrollValue=1;
    prefixIndex--;
  }
  if (scrollValue<=0.01) {
    skip=1;
    magnitude=0;
  }
  if (scrollValue<=0.1 && scrollValue>0.01) {
    skip=10;
    magnitude=1;
  }
  if (scrollValue<=1 && scrollValue>0.1) {
    skip=100;
    magnitude=2;
  }
  magnitude+=(prefixIndex*3);

  fill(255);
  stroke(255);
  strokeWeight(lineW);
  textAlign(CENTER, CENTER);

  for (let sec=0, i=nowAxis; i<width*2; i+=(1/scrollValue)*skip) {
    let unit = "×10"+powerOf(magnitude), s="s", pn=""; //unit=Scientific notation or SI Unit, s=can add an s to second, pn=Positional notation

    if (prefixIndex<0 && abs(prefixIndex)<prefixS[0].length) {
      unit = prefixS[0][abs(prefixIndex)]+"s";
    }
    if (prefixIndex>=0 && prefixIndex<prefixL[0].length) {
      unit = prefixL[0][prefixIndex]+"s";
    }

    if (showSeconds && i==nowAxis+(1/scrollValue)*skip) {
      for (let j=nowAxis+(1/scrollValue)*skip/10; j<=2*((1/scrollValue)*skip)+nowAxis-((1/scrollValue)*skip/10)/2; j+=(1/scrollValue)*skip/10) {
        //draws receding lines:
        line(j, map(((1/scrollValue)*skip), 100, 1000, -lineW, lineH), j, -lineW);
        line(2*nowAxis-j, map(((1/scrollValue)*skip), 100, 1000, -lineW, lineH), 2*nowAxis-j, -lineW);
      }
      if (skip==1) {
        s="";
      }
      if (prefixIndex>=0) {
        //calculates positional notation and prefix for one second and longer
        for (let z=0; z<prefixIndex; z++) {
          pn+=".000";
        }
        if (prefixIndex<prefixL[1].length) {
          Unit=nf(sec)+" "+prefixL[1][prefixIndex]+"second"+s;
        } else if (prefixIndex>=prefixL[1].length) {
          Unit=nf(sec)+" "+unit+"s";
        }
        wholeNumber=skip+""+pn+"s";
      }
      if (prefixIndex<0) {
        //calculates positional notation and prefix for shorter than a second
        for (let z=0; z>magnitude+1; z--) {
          pn+="0";
        }
        if (abs(prefixIndex)<prefixS[0].length) {
          Unit=nf(sec)+" "+prefixS[1][abs(prefixIndex)]+"second"+s;
        } else if (abs(prefixIndex)>=prefixS[0].length) {
          Unit=nf(sec)+""+unit+"s";
        }
        wholeNumber="0."+pn+"1s";
      }
    }
    if (showSeconds) {
      if (sec==0) {
        if (!stopTime) {
          strokeWeight(textW);
          text(int(sec), i, secY);
          strokeWeight(lineW);
          line(i, 0, i, lineH);
        }
      } else {
        strokeWeight(textW);
        text(int(sec)+unit, i, secY);
        text("-"+int(sec)+unit, 2*nowAxis-i, secY);
        strokeWeight(lineW);
        line(i, 0, i, lineH);
        line(2*nowAxis-i, 0, 2*nowAxis-i, lineH);
      }
    }

    if (prefixIndex<prefixL[1].length && abs(prefixIndex)<prefixS[0].length) {
      sec+=skip;
    } else {
      sec++;
    }
  }
  if (showSeconds) {
    fill(0);
    noStroke();
    rectMode(CORNER);
    rect(width/2-textWidth(Unit+" ="), (lineH+lineW)/4,
      textWidth(Unit+" = "+wholeNumber+"s "), (lineH+lineW)/2-2, 25);
    fill(255);
    textAlign(RIGHT, CENTER);
    text(Unit+"  ", width/2, lineH/2);
    textAlign(CENTER, CENTER);
    text("=", width/2, lineH/2);
    textAlign(LEFT, CENTER);
    text("  "+wholeNumber, width/2, lineH/2);
    textAlign(CENTER, CENTER);
  }
}

function years() {
  thisYear=year();
  let shift=10;
  yearMagnitude=0;

  if (scrollValue<0.0025) {
    ySkip=1;
    yearMagnitude=1;
  }
  if (scrollValue<0.005 && scrollValue>=0.0025) {
    ySkip=5;
    yearMagnitude=1;
  }
  if (scrollValue>=0.25) {
    ySkip=1000;
    shift=0.01;
    yearMagnitude=0;
  }
  if (scrollValue<0.25 && scrollValue>=0.1) {
    ySkip=100;
    yearMagnitude=0;
  }
  if (scrollValue<0.5 && scrollValue>=0.25) {
    ySkip=500;
  }
  if (scrollValue<0.1 && scrollValue>=0.02) {
    ySkip=50;
    yearMagnitude=2;
  }
  if (scrollValue<0.02 && scrollValue>=0.005) {
    ySkip=10;
    yearMagnitude=2;
  }
  yearMagnitude+=yearPrefixIndex*3;

  oneYear=(1/(scrollValue*pow(10, prefixIndex*3))*31556952);

  let time=float(dayOfYear)/365;
  let yearZero=oneYear;
  let roundYear=0;
  if (scrollValue>0.25 || (scrollValue<0.0025 && yearMagnitude<=1)) {
    roundYear=year()%10;
  }
  if (scrollValue>0.0025 && yearMagnitude>=1) {
    roundYear=year()%100;
  }
  if (scrollValue>0.02 && yearMagnitude>=2) {
    roundYear=year()%1000;
  }
  if ((scrollValue>0.25 && yearMagnitude>=3)||yearMagnitude>=4) {
    roundYear=year()%10000;
  }
  yearZero=oneYear*time+oneYear*roundYear;


  for (let yr=0, i=nowAxis; i<width*2; i+=(1/scrollValue)*0.31556952*ySkip) {
    let unit="×10"+powerOf(yearMagnitude)+"a";
    let year=0;
    textAlign(CENTER, CENTER);
    strokeWeight(lineW);
    stroke(255);
    fill(255);
    if (yearPrefixIndex>=0) {
      if (yearPrefixIndex<prefixL[0].length) {
        unit=prefixL[0][yearPrefixIndex]+"a";
      }
      if (scrollValue>0.1 && yr>=1000) {
        year=round(yr/1000);
      } else {
        if (yr>=1000) {
          year=yr/1000;
          if (yearPrefixIndex<prefixL[0].length-1) {
            unit=prefixL[0][yearPrefixIndex+1]+"a";
          } else if (yearPrefixIndex<prefixL[0].length) {
            unit="×10"+powerOf(yearMagnitude+1)+"a";
          }
        } else {
          year=round(yr);
        }
        if (yearPrefixIndex>=prefixL[0].length) {
          if (scrollValue>0.1 && yr>=1000) {
            unit="×10"+powerOf(yearPrefixIndex*3)+"a";
          } else if (yr>=1000) {
            unit="×10"+powerOf(yearPrefixIndex*3+3)+"a";
          }
          if (year>=10 && year<100) {
            year/=10;
            unit="×10"+powerOf(yearPrefixIndex*3+1)+"a";
          }
          if (year>=100 && year<1000) {
            year/=100;
            unit="×10"+powerOf(yearPrefixIndex*3+2)+"a";
          }
        }
      }


      if (stopTime || yearMagnitude>=6) {
        if (year==0 && !stopTime) {
          line(nowAxis, height, nowAxis, height-lineH);
          strokeWeight(textW);
          text("0", 2*nowAxis-i, height-yearY);
        }
        if (yr>0) {
          line(i, height, i, height-lineH);
          line(2*nowAxis-i, height, 2*nowAxis-i, height-lineH);
          strokeWeight(textW);
          text(nf(year)+unit, i, height-yearY);
          text("-"+nf(year)+unit, 2*nowAxis-i, height-yearY);
        }
      } else {
        line(i-yearZero, height, i-yearZero, height-lineH);
        line(2*nowAxis-i-yearZero, height, 2*nowAxis-i-yearZero, height-lineH);
        year=round(yr);

        if (scrollValue>0.1 && yr>=1000) {
          year=round(yr/1000);
        }
        year=year*pow(10, yearPrefixIndex*3);
        strokeWeight(textW);
        if ((scrollValue>0.5 && yearMagnitude>=3)||yearMagnitude>=4) {
          if (year+2022-roundYear!=0) {
            text(nfc(round(year+thisYear-roundYear), 0), i-yearZero, height-yearY);
          }
          text(nfc(-year+thisYear-roundYear, 0), 2*nowAxis-i-yearZero, height-yearY);
        } else {
          text(nf(year+thisYear-roundYear), i-yearZero, height-yearY);
          text(nf(-year+thisYear-roundYear), 2*nowAxis-i-yearZero, height-yearY);
        }
      }
    }
    yr+=ySkip*shift;
  }
}


function calDayOfYear(d, m, y) {
  let doy=d;
  let mLength = [];
  mLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (y%4==0 && (y%100!=0 || y%400==0)) {
    mLength[1]=29;
  }

  for (let i=0; i<m-1; i++) {
    doy+=mLength[i];
  }
  return doy;
}




function powerOf(n) {
  //turns a given number into an exponent
  let i="", s="";
  if (n<0) {
    s="⁻";
  }
  if (n==0) {
    i="\u2070";
  }
  while (abs(int(n))>0) {
    if (abs(int(n))%10==1) {
      i+="¹";
    }
    if (abs(int(n)) % 10==2) {
      i+="²";
    }
    if (abs(int(n))%10==3) {
      i+="³";
    }
    if (abs(int(n))%10==4) {
      i+="⁴";
    }
    if (abs(int(n))%10==5) {
      i+="⁵";
    }
    if (abs(int(n))%10==6) {
      i+="⁶";
    }
    if (abs(int(n))%10==7) {
      i+="⁷";
    }
    if (abs(int(n))%10==8) {
      i+="⁸";
    }
    if (abs(int(n))%10==9) {
      i+="⁹";
    }
    if (abs(int(n))%10==0) {
      i+="⁰";
    }
    n/=10;
  }
  i+=s;

  return i.split("").reverse().join("");
  //return i ;
}


function updateImgSize() {
  print("updateImgSize");
  for (let i=0; i<data.length; i++) {
    for (let j=0; j<data[i].getRowCount(); j++) {
      for (let k=0; k<data[i].getColumnCount(); k++) {
        if (data[i].getColumnTitle(k)==="img" && data[i].getString(j, "img")!==("")) {


          imgList[i][j] = loadImage("data/images/"+data[i].getString(j, "img"));
          let imageRatio = 1, imageH=1;
          if (imgList[i][j].height>imgList[i][j].width) {
            imageRatio=float(imgList[i][j].width)/float(imgList[i][j].height);
            imageH=imageW*imageRatio;
            if (imageH<1) {
              imageH=1;
            }
            imgList[i][j].resize(int(imageW*imageRatio), imageW);
          } else {
            imageRatio=float(imgList[i][j].height)/float(imgList[i][j].width);
            imageH=imageW*imageRatio;
            if (imageH<1) {
              imageH=1;
            }
            imgList[i][j].resize(imageW, int(imageH));
          }
        }
      }
    }
  }
}


function mousePressed() {
  dragStart=mouseX-nowAxis;
  imgDragStart=mouseX;
}
function mouseReleased() {
  if (mouseButton==LEFT && nowSelected && mouseWasDragged===false) {
    stopTime=!stopTime;
  }
  mouseWasDragged=false;
  dragStart=0;
  imgDragStart=0;


  if (selectTable>=0) {
    showTable[selectTable]=!showTable[selectTable];
  }
}
function mouseWheel(event) {
  if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height) {
    scrollValue += event.delta*(scrollValue/1000);
  }
}

function mouseDragged() {
  if (dragStart>-nowAxis && dragStart<width && mouseY>0 && mouseY<height) {
    //right drag moves the 0-point, left drag zooms in and out (depending which side was pressed first)
    let bufferZone=150, speed=bufferZone;
    mouseWasDragged=true;
    if (mouseButton==CENTER || (mouseIsPressed && nowSelected && abs(dragStart)<nowW/2)) {
      if (nowAxis+mouseX-pmouseX>=0 && nowAxis+mouseX-pmouseX<=width) {
        nowAxis = mouseX-dragStart;
      }
    } else {
      if (mouseButton==LEFT && !nowSelected && abs(dragStart)>nowLineW/2) {
        let imgSel=false, imgSelID=-1;
        for (let i=0; i<imgSelected.length; i++) {
          if (imgSelected[i]) {
            imgSel=true;
            imgSelID=i;
          }
        }
        if (imgSel) {
          movibleX[imgSelID] += (mouseX-pmouseX)*(scrollValue/skip*3.1556952)*pow(10, (magnitude-8-imgMag[imgSelID]));
          //movibleX[imgSelID] += (mouseX-imgDragStart)/2;
        } else {
          if (dragStart>0) {
            if (mouseX>nowAxis+bufferZone) {
              scrollValue-=(mouseX-pmouseX)*(scrollValue/(mouseX-nowAxis));
            } else {
              scrollValue-=(mouseX-pmouseX)*(scrollValue/speed);
            }
          }
          if (dragStart<0) {
            if (mouseX<nowAxis-bufferZone) {
              scrollValue-=(mouseX-pmouseX)*(scrollValue/(mouseX-nowAxis));
            } else {
              scrollValue+=(mouseX-pmouseX)*(scrollValue/speed);
            }
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (key=='1') {
    prefixIndex=1;
  }
  if (key=='2') {
    prefixIndex=2;
  }
  if (key=='3') {
    prefixIndex=3;
  }
  if (key=='4') {
    prefixIndex=4;
  }
  if (key=='5') {
    prefixIndex=5;
  }
  if (key=='6') {
    prefixIndex=6;
  }
  if (key=='7') {
    prefixIndex=7;
  }
  if (key=='8') {
    prefixIndex=8;
  }
  if (key=='9') {
    prefixIndex=11;
  }
  if (key=='0') {
    prefixIndex=-0;
  }
  if (key=='ü') {
    prefixIndex--;
  }
  if (key=='.') {
    prefixIndex++;
  }
  if (key=='+') {
    scrollValue-=(scrollValue/50);
  }
  if (key=='-') {
    scrollValue+=(scrollValue/50);
  }
  if (key==' ') {
    nowAxis=width/2;
  }
  if (key=='r') {
    record=!record;
  }
  if (key=='s') {
    showSeconds=!showSeconds;
  }
  if (keyCode==ENTER) {
    stopTime=!stopTime;
  }
  if (keyCode==UP_ARROW) {
    //movibleX+=10;
  }
  if (keyCode==DOWN_ARROW) {
    //movibleX-=10;
  }
}


function windowResized() {
  resizeCanvas(windowWidth*2/3, windowHeight*2/3);
  cnv.parent("program");
  centerCanvas();
  imageW=height/5;
  nowAxis=width/2;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  //cnv.position(x, y, "static");
  //cnv.position(x, y, "fixed");
  //cnv.position(x, y, "relative");
  cnv.position(x, y, "sticky");
  //cnv.position(x, y, "initial");
}
