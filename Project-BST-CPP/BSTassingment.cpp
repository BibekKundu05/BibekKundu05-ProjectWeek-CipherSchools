#include <iostream>
using namespace std;

//Creating the structure of the node
struct Node
{
    int data;
    Node * left;
    Node * right;
};

//using the node structure create a node for tree
Node * createNode(int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return newNode;
}

//Inorder traversal
void inorderTraversal(struct Node* root)
{
    if (root != NULL)
    {
        inorderTraversal(root->left);
        cout << root->data << " ";
        inorderTraversal(root->right);
    }
    else
    {
        return;
    }
}

//Preorder Traversal
void preorderTraversal(struct Node* root)
{
    if (root != NULL)
    {
        cout << root->data << " ";
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
    else
    {
        return;
    }
}

//Postorder Traversal
void postorderTraversal(struct Node* root)
{
    if (root != NULL)
    {
        postorderTraversal(root->left);
        postorderTraversal(root->right);
        cout << root->data << " ";
    }
    else
    {
        return;
    }
}

//Function for inserting a node
Node * insertNode(Node * root, int data)
{
    if (root == NULL) 
    { 
        return createNode(data);
    }

    if (data < root->data)
    {
        root->left = insertNode(root->left, data);
    }
    else if (data > root->data)
    {
        root->right = insertNode(root->right, data);
    }
    return root;
}

//Function for searching a node
Node * searchNode(Node * root, int key)
{
    if (root == NULL || root->data == key)
    {
        return root;
    }
    if (root->data < key)
    {
        return searchNode(root->right, key);
    }
    return searchNode(root->left, key);
}

//Finding the node with minimum value in the tree
Node* minValueNode(Node* node)
{
    Node* current = node;
    // loop down to find the leftmost leaf
    while (current && current->left != NULL) {
        current = current->left;
    }
    return current;
}

//deleting a existing node from the BST
Node* deleteNode(Node* root, int data)
{
    if (root == NULL)
    {    
        return root;
    }
    if (data < root->data)
    {
        root->left = deleteNode(root->left, data);
    }
    else if (data > root->data)
    {
        root->right = deleteNode(root->right, data);
    }
    else
    {
        if (root->left == NULL)
        {
            Node* temp = root->right;
            delete root;
            return temp;
        }
        else if (root->right == NULL)
        {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        Node* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

int main()
{

    Node * root = NULL;      //set the root to null
    
    // create a Binary Search Tree
    int value;
    cout<<"Enter the elements you want to enter in BST(enter -1 to stop) : "<<endl;
    while(value != -1)
    {
        cin>>value;
        if(value == -1)
        {
            break;
        }
        root = insertNode(root, value);
    }
    cout<<"The BST in Inorder traversal : ";           //Printing the tree in inorder traversal
    inorderTraversal(root);
    cout << endl;

    cout<<"The BST in Preorder traversal : ";          //Printing the tree in inorder traversal
    preorderTraversal(root);
    cout << endl;

    cout<<"The BST in Postorder traversal : ";         //Printing the tree in inorder traversal
    postorderTraversal(root);
    cout << endl;


    // Insert a node in BST
    int insert;
    cout<<"Give the node which you want to insert : ";
    cin>>insert;
    root = insertNode(root, insert);
    cout << "After insertion of "<<insert<<" : ";
    inorderTraversal(root);
    cout << endl;

    // Search a Node in BST
    int searchKey;
    cout<<"Which node you want to search : ";
    cin>>searchKey;
    Node * found = searchNode(root, searchKey);
    if (found != NULL)
    {
        cout << "Node "<<searchKey<<" found in the BST." << endl;
    }
    else
    {
        cout << "Node "<<searchKey<<" not found in the BST." << endl;
    }

    // Delete a Node in BST
    int deleteKey;
    cout<<"Which node you want to delete : ";
    cin>>deleteKey;
    Node * delNode = deleteNode(root, deleteKey);
    if (delNode != NULL)
    {
        cout << "Node "<<deleteKey<<" deleted." << endl;
    }
    else
    {
        cout << "Node "<<deleteKey<<" not found in the BST." << endl;
    }
    cout << "After deletion of "<<deleteKey<<" : ";
    inorderTraversal(root);
    cout << endl;


    return 0;
}
