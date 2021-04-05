function  fordFulkerson (iArr) {
    let arr = iArr.map(function(arr1) {
        return arr1.slice();
    });

    document.getElementById("result_text").innerHTML += "\n\n \n";
    let maxFlow = [];
    let paths = [];
    let limit = 0;
    while(pathFinder(arr) && limit < 25){
        limit++;
        
        document.getElementById("result_text").innerHTML += `\n\n-------------------- Ітерація №${limit} ------------------`;

        document.getElementById("result_text").innerHTML += `\n\nПошук шляху від 0 до ${arr.length - 1}`;

        let path = pathFinder(arr);
        console.log(path);

        let minEdge = {
            coordinates: [],
            value: Infinity,
            i: 0
        }

        for (let i = 0; i < path.length; i++) {
            if(arr[path[i][0]][path[i][1]] < minEdge.value){
                minEdge.coordinates = [path[i][0], path[i][1]];
                minEdge.value = arr[path[i][0]][path[i][1]];
                minEdge.i = i;
            }
        }

        console.log(minEdge);

        for (let i = 0; i < path.length; i++) {
            if(i == minEdge.i) arr[path[i][0]][path[i][1]] = 0;
            else arr[path[i][0]][path[i][1]] -= minEdge.value;
        }

        
        maxFlow.push(minEdge.value);
        paths.push(path);

        document.getElementById("result_text").innerHTML += `\n\nЗнайдений шлях: `;
        for (let i = 0; i < path.length; i++) {
            if(i == path.length - 1) document.getElementById("result_text").innerHTML += `(${path[i][0]})=>(${path[i][1]})`;
            else document.getElementById("result_text").innerHTML += `(${path[i][0]})=>`;
        }
        document.getElementById("result_text").innerHTML += `\nМінімальне ребро: (${minEdge.coordinates[0]},${minEdge.coordinates[1]}) = ${minEdge.value}`;
        document.getElementById("result_text").innerHTML += `\n\nНова матриця: \n${printMatrix(arr)}`;
    }

    document.getElementById("result_text").innerHTML += `\n\n----------------------------------------------------`;

    document.getElementById("result_text").innerHTML += `\n\nЗнайдені шляхи:\n`;

    for (let i = 0; i < paths.length; i++) {
        for (let j = 0; j < paths[i].length; j++) {
            if(j == paths[i].length - 1) document.getElementById("result_text").innerHTML += `(${paths[i][j][0]})=>(${paths[i][j][1]})`;
            else document.getElementById("result_text").innerHTML += `(${paths[i][j][0]})=>`;
        }
        document.getElementById("result_text").innerHTML += `\nмінімальне ребро = ${maxFlow[i]}\n`;
    }

    document.getElementById("result_text").innerHTML += `\nМаксимум:\n`;

    for (let i = 0; i < maxFlow.length; i++) {
        if(i == maxFlow.length - 1) document.getElementById("result_text").innerHTML += `${maxFlow[i]}`;
        else document.getElementById("result_text").innerHTML += `${maxFlow[i]} + `;
    }

    document.getElementById("result_text").innerHTML += ` = ${maxFlow.reduce((a, b) => a + b, 0)}`;

    console.log(...maxFlow);
    console.log(paths);


    function pathFinder (a){
        let path = [];
        let edgeList = [];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if(a[i][j] != 0) edgeList.push({coordinates:[i,j], value:a[i][j]});
            }
        }

        if(edgeList.findIndex(val => val.coordinates[0] == 0) == -1) return 0;
        path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == 0)].coordinates);

        while(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) != -1){
            console.log(`Found next: ${edgeList[edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1])].coordinates}`);
            path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1])].coordinates);
            edgeList.splice(edgeList.findIndex(val => val.coordinates == path[path.length - 1]), 1);
            console.log("SPLICED");
            console.log(`New edgeList: \n`);
            console.log(edgeList);
            if(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) == -1 && path[path.length - 1][1] != a.length - 1){
                path.splice(path.length - 1);
            }
        }

        if(path[path.length - 1][1] == a.length - 1) return path;
        else{
            console.log("Not a path");
            a[path[path.length - 1][0]][path[path.length - 1][1]] = 0
            return pathFinder(a);
        }
    }

}

function starter () {
    document.getElementById("result_text").innerHTML = "";
    let arr = reader();
    if(arr == "") document.getElementById("result_text").innerHTML += "ERROR: File not found";
    else {
        document.getElementById("result_text").innerHTML += "Зчитана матриця:";

        for (let i = 0; i < arr.length; i++) {
            document.getElementById("result_text").innerHTML += "\n["+arr[i]+"]";
        }

        let radios = document.getElementsByName('lab');
        let lab = 0;
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) lab = i;
        }
        switch (lab) {
            case 0:
                fordFulkerson(arr);
                break;
        }
    }
}

function reader() {
    let text = document.getElementById(`input_text`).value;
    let nArr = text.split(/\r?\n/);
    let n = parseFloat(nArr[0]);
    let arr = [];
    for (let i = 1; i < nArr.length; i++) {
        arr.push(nArr[i].replace(/ +$/, "").split(' ').map(Number));
    }
    return arr;
}

function printMatrix(a){
    let output = "";
    for (let i = 0; i < a.length; i++) {
        output += "["
        for (let j = 0; j < a[i].length; j++) {
            if(a[i][j] < 10) output += `${a[i][j]}   `;
            else if(a[i][j] < 100) output += `${a[i][j]}  `;
            else output += `${a[i][j]} `;
        }
        output += "]\n"
    }
    return output;
}