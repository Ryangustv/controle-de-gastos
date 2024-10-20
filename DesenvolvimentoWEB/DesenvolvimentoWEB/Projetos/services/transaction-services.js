const transactionService = {
    findByUser: user => {
        return firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .get()
        .then(snapshot => {
          return snapshot.docs.map(doc => doc.data());
           
        })
    },
    remove: transaction => {
        return firebase.firestore()
        .collection("transactions")
        .doc(transaction.uid)
        .delete();
    },
    save: transaction => {
        return firebase.firestore()
        .collection('transactions')
        .add(transaction);
    }
}
