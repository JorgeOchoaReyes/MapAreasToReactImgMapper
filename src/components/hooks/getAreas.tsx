
export const getAreas = (input: string) => {
    if(!input) return; 
    let data = input.split(" "); 
    let results = []; 
    let i = 0; 


    while(i < data.length) {
        if(data[i] == '<area' || data[i] == '<map' || data[i] == '') {
            console.log(data[i])
            if(data[i] == '<map') {
                i = i + 2; 
                continue;
            }
            i = i + 1; 
            continue;
        }
        let obj = {}; 
        obj["id"] = Math.floor(Math.random() * 10000);
        obj["fillColor"] = "#eab54d4d";
        obj["strokeColor"] = "black";
        let j = i; 

        while(j < data.length && data[j] != '<area') {
            if (data[j].includes("title")) {
                let title = (data[j].replace("title=", "")).replace('"', "");
                title = title.replace('\"', "");

                obj["title"] = title;
                obj["name"] = i.toString(); 
            }
            if (data[j].includes("coords")) { 
                let temp = (data[j].replace("coords=", "")).replace('"', "").split(",")
                let intList = temp.map((stringNum) => {
                    return parseInt(stringNum, 10)
                })
                obj["coords"] = intList; 
            }
            if (data[j].includes("shape")) {
                let shape = ((data[j].replace("shape=", "")).replace('"', "")).replace(">", "").replace('"', "")
                shape = shape.replace(/\s+/g, '');
                shape = shape.replace("</map>", "")
                obj[shape] = CoordsToShape(obj["coords"])
                obj["shape"] = shape
            }
            j = j + 1; 
        }
        i = j + 1; 
        if(obj["shape"]) results.push(obj); 
    }
    return results; 
}

const CoordsToShape = (data: []) => {
    if(!data) return; 
    let i = 0;
    let res=[];  
    let temp = [] 
    while (i + 2 <= data.length) {
      temp = [data[i], data[i + 1]];
      res.push(temp);
      i = i + 2;
    }
  
    return res;
  }
  
