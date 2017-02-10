const descriptions = {
  'findFirst': ['findFirst(tree, childrenKey, objToFindBy)', 'It iterates through each deep nested object and if finds object that has prop and value specified in objToFindBy argument, it stops the walk and returns the object. If none is found, it returns false'],
  'findAll': ['findAll(tree, childrenKey, objToFindBy)', 'It iterates through each deep nested object and for every found object that has prop and value specified in objToFindBy argument, it pushes this object to the result array. When it finishes the walk, it returns the array. If none is found, it returns false'],
  'findAndModifyFirst': ['findAndModifyFirst(tree, childrenKey, objToFindBy, replacementObj)', 'It iterates through each deep nested object and if finds object that has prop and value specified in objToFindBy argument, it replaces the current object with replacementObj, stops recursive walk and returns the whole tree. If none is found, it returns false'],
  'findAndModifyAll': ['findAndModifyAll(tree, childrenKey, objToFindBy, replacementObj)', 'It iterates through each deep nested object and for every found object that has prop and value specified in objToFindBy argument, it replaces the current object with replacementObj and returns the whole tree. If none is found, it returns false'],
  'findAndDeleteFirst': ['findAndDeleteFirst(tree, childrenKey, objToFindBy)', 'It iterates through each deep nested object and if finds object that has prop and value specified in objToFindBy argument, it deletes it, stops the walk and returns the whole tree. If none is found, it returns false'],
  'findAndDeleteAll': ['findAndDeleteAll(tree, childrenKey, objToFindBy)', 'It iterates through each deep nested object and if finds object that has prop and value specified in objToFindBy argument, it deletes it, continue the walk and returns the whole tree when finished. If none of objects is found, it returns false']
};

export default descriptions;
