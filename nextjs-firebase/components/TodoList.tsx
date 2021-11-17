import { collection } from "@firebase/firestore";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";


const TodoList = () => {
  const [todos, setTodos] = useState(initialState);
  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTIme(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      {todos.map(todo => <div key={todo.id}>{todo.title}</div>)}
    </div>
  );
};
