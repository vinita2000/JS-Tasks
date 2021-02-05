const data = require('./data.json');

let dic = {};
function makeTree() {
    for (let obj of data) {
        if (obj.parent != null) {
            if (obj.parent.code in dic) {
                dic[obj.parent.code].push(obj.code);
            } else {
                let temp = [];
                temp.push(obj.code);
                dic[obj.parent.code] = temp;
            }
        } else {
            dic[obj.parent] = [obj.code];
        }
    }
    //console.log(dic);
}

// prints all the details of a object by its code
function printAllDetails(node){
    for(let obj of data){
        if(obj.code === node){
            console.log(`name : ${obj.name}`);
            console.log(`id : ${obj.id}`);
            console.log(`createdBy : ${obj.createdBy}`);
            console.log(`createdAt : ${obj.createdAt}`);
            console.log(`companyId : ${obj.companyID}`);
            console.log(`code : ${obj.code}`);
        }
    }
    console.log('\n');
}

// traverses all successive childs of a node
function findChildNodes(node) {
    if (!(dic[`${node}`])) { // base condition 
        console.log('\n',` || Leaf Node || `, '\n');
        return;
    }
    let currNodeLst = dic[`${node}`];
    let len = currNodeLst.length;
    
    for (let i = 0; i < len; i++) {
        //console.log(`Successor : ${currNodeLst[i]}`);
        printAllDetails(currNodeLst[i]);
        findChildNodes(currNodeLst[i]);
    }
}

// first make a tree of the given JSON data
makeTree();
console.log('\n');

// Input the node for which to run the code
let node = 'CWS64';
console.log(`**** Assuming ${node} as Root for the current branch ****`, '\n');
findChildNodes(node);
