export const useNode = () => {
  const insertNode = (tree, commentId, inputMessage) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: inputMessage,
        items: []
      });

      return { ...tree };
    }
    const data = tree.items.map((obj) => {
      return insertNode(obj, commentId, inputMessage);
    });

    return { ...tree, items: data };
  };

  const editNode = (tree, commentId, input) => {
    if (tree.id === commentId) {
      tree.name = input;
      return { ...tree };
    }

    const array = tree.items.map((itemObj) => {
      return editNode(itemObj, commentId, input);
    });

    return { ...tree, items: array };
  };

  const deleteNode = (tree, commentId) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === commentId) {
        tree.items.splice(i, 1);
      } else {
        deleteNode(currentItem, commentId);
      }
    }
    return { ...tree };
  };

  return { insertNode, editNode, deleteNode };
};
