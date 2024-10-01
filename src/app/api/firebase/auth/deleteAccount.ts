import { deleteUser } from "firebase/auth";
import { auth, db, storage } from "../connection";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
export const deleteAccount = async () => {
    const user = auth.currentUser;
    if (user && user.email) {
        await deleteUser(user);
        await deleteDoc(doc(db, "user", user.email));

        const listRef = ref(storage, `user/${user.email}/profileImage`);

        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {
                    deleteObject(itemRef).then(() => {
                        // File deleted successfully
                    }).catch((error) => {
                        // Uh-oh, an error occurred!
                    });

                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
    }
}