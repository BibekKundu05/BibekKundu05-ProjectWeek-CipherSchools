import { BinaryTreeNode, drawBinaryTree, VisualizationType, setTheme } from 'binary-tree-visualizer';
let opt = {
    textFont:100,
    strokeColor:'green',
    borderStyle:'dotted',
    colorArray: [{
        borderColor: 'green',
        bgColor: "white"
    }]
};
setTheme(opt);
const insertBtn = document.querySelector("button");
insertBtn.addEventListener("click", ()=>{
    if(root.value==" "){
        root = new BinaryTreeNode(parseInt(document.getElementById("element").value));
        draw();
    }
    else{
        insert(root,parseInt(document.getElementById("element").value));
        draw();
    }
})
function insert(node, value){
    if(node.value==value)
        return;
    if(value<node.value){
        if(node.left!=undefined){
            insert(node.left,value);
            return;
        }
        node.setLeft(new BinaryTreeNode(value));
        return;
    }
        if(node.right!=undefined){
            insert(node.right,value);
            return;
        }
        node.setRight(new BinaryTreeNode(value));
}

function deleteNode(node, value) {
    if (node == undefined) return node;
    if (value < node.value) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
        node.right = deleteNode(node.right, value);
    } else {
        if (node.left == undefined) return node.right;
        else if (node.right == undefined) return node.left;
        
        node.value = minValue(node.right);
        node.right = deleteNode(node.right, node.value);
    }
    return node;
}

function minValue(node) {
    let minv = node.value;
    while (node.left != undefined) {
        minv = node.left.value;
        node = node.left;
    }
    return minv;
}

function maxValue(node) {
    let maxv = node.value;
    while (node.right != undefined) {
        maxv = node.right.value;
        node = node.right;
    }
    return maxv;
}

// New searchNode function
function searchNode(node, value) {
    if (node == undefined || node.value == value) return node;
    if (value < node.value) return searchNode(node.left, value);
    return searchNode(node.right, value);
}

let preorderArray = [];
function preorder(node, temp){
    if(node!=undefined){
        preorderArray.push(node.value);
        preorder(node.left,1);
        preorder(node.right,0);
    }
}
let inorderArray = [];
function inorder(node,temp){
    if(node!=undefined){
        inorder(node.left,1);
        inorderArray.push(node.value);
        inorder(node.right,0);
    }
}
let postorderArray = [] ;
function postorder(node, temp){
    if(node!=undefined){
        postorder(node.left,1);
        postorder(node.right,0);
        postorderArray.push(node.value);
    }
}
const preorderBtn = document.getElementById("preorderBtn");
const inorderBtn = document.getElementById("inorderBtn");
const postorderBtn = document.getElementById("postorderBtn");

const deleteBtn = document.querySelectorAll("button")[1];
deleteBtn.addEventListener("click", () => {
    const value = parseInt(document.getElementById("element").value);
    if (isNaN(value)) return;
    root = deleteNode(root, value);
    draw();
});

const searchBtn = document.querySelectorAll("button")[2];
searchBtn.addEventListener("click", () => {
    const value = parseInt(document.getElementById("element").value);
    if (isNaN(value)) return;
    const result = searchNode(root, value);
    const outputElement = document.getElementById("output_2");
    if (outputElement != undefined)
        outputElement.remove();
    const output_2 = document.createElement("h2");
    output_2.setAttribute("id", "output_2");
    let textnode = document.createTextNode(result ? `Node with value ${value} found.` : `Node with value ${value} not found.`);
    output_2.appendChild(textnode);
    document.getElementById("output").appendChild(output_2);
});

preorderBtn.addEventListener("click",()=>{
    preorderArray = [];
    preorder(root,-1);
    const element = document.getElementById("output_1");
    if(element!=undefined)
        element.remove();
    const output_1 = document.createElement("h2");
    output_1.setAttribute("id","output_1");
    let textnode = document.createTextNode("Preorder: [");
    output_1.appendChild(textnode); 
    textnode = document.createTextNode(preorderArray);
    output_1.appendChild(textnode); 
    textnode = document.createTextNode("]");
    output_1.appendChild(textnode); 
    document.getElementById("output").appendChild(output_1);
});

inorderBtn.addEventListener("click",()=>{
    inorderArray = [];
    inorder(root,-1);
    const element = document.getElementById("output_1");
    if(element!=undefined)
        element.remove();
    const output_1 = document.createElement("h2");
    output_1.setAttribute("id","output_1");
    let textnode = document.createTextNode("Inorder: [");
    output_1.appendChild(textnode); 
    textnode = document.createTextNode(inorderArray);
    output_1.appendChild(textnode); 
    textnode = document.createTextNode("]");
    output_1.appendChild(textnode); 
    document.getElementById("output").appendChild(output_1);
});

postorderBtn.addEventListener("click",()=>{
    postorderArray = [];
    postorder(root,-1);
    const element = document.getElementById("output_1");
    if(element!=undefined)
        element.remove();
    const output_1 = document.createElement("h2");
    output_1.setAttribute("id","output_1");
    let textnode = document.createTextNode("Postorder: [");
    output_1.appendChild(textnode); 
    textnode = document.createTextNode(postorderArray);
    output_1.appendChild(textnode); 
    textnode = document.createTextNode("]");
    output_1.appendChild(textnode); 
    document.getElementById("output").appendChild(output_1);
});
const findMinBtn = document.getElementById("findMinBtn");
const findMaxBtn = document.getElementById("findMaxBtn");
findMinBtn.addEventListener("click", () => {
    const min = root.value !== " " ? minValue(root) : undefined;
    const outputElement = document.getElementById("output_3");
    if (outputElement != undefined)
        outputElement.remove();
    const output_3 = document.createElement("h2");
    output_3.setAttribute("id", "output_3");
    let textnode = document.createTextNode(min !== undefined ? `Min value: ${min}` : `Tree is empty.`);
    output_3.appendChild(textnode);
    document.getElementById("output").appendChild(output_3);
});

findMaxBtn.addEventListener("click", () => {
    const max = root.value !== " " ? maxValue(root) : undefined;
    const outputElement = document.getElementById("output_4");
    if (outputElement != undefined)
        outputElement.remove();
    const output_4 = document.createElement("h2");
    output_4.setAttribute("id", "output_4");
    let textnode = document.createTextNode(max !== undefined ? `Max value: ${max}` : `Tree is empty.`);
    output_4.appendChild(textnode);
    document.getElementById("output").appendChild(output_4);
})

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    root = new BinaryTreeNode(" ");
    draw();
    const outputElements = document.querySelectorAll('#output h2');
    outputElements.forEach(element => element.remove());
});
function draw(){
    drawBinaryTree(root,document.querySelector("canvas"),{type:VisualizationType.HIGHLIGHT});
}
let root = new BinaryTreeNode(" ");
draw();
