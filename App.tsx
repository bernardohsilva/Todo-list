import React, { useState } from "react";
import { FlatList } from "react-native";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface IToDo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false }]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };

  return (
    <View style={styles.container}>
            <Image style={styles.logo} source={require('./assets/Logo.png')} />
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Adicione uma nova tarefa"
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
      </View>
      {error && (
        <Text style={styles.error}>Digite sua tarefa</Text>
      )}

      {toDoList.length === 0 && <Text  style={styles.subtitle}><Icon name="clipboard" size={60} color="white" /></Text> }
      {toDoList.length === 0 && <Text  style={styles.subtitle} >Você ainda não tem tarefa cadastrada </Text> }
            
      {toDoList.map((toDo: IToDo, index: number) => (
        
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Button
            title={toDo.completed ? <Icon name="circle" size={15} color="white" /> : "o"}
            onPress={() => toggleComplete(index)}             
            color="black"
          />
          
          <Text
            style={[
              styles.task,
              { textDecorationLine: toDo.completed ? "line-through" : "none" }
            ]}
          >
            {toDo.text}
          </Text>

          <Button
            title=<Icon name="trash" size={20} color="gray" />
            onPress={() => {
              removeItem(index);
            }}
            color="white"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center",
    color: '#5454D3',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    flex: 1,
    width: 200,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: '#070719',
    color: 'white',
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 180,
    margin: 30,
    marginLeft: 40,
  },  
  buttonText: {
    color: '#FFF',
    fontSize: 24,
  },
  button: {
    width: 46,
    height: 46,
    borderRadius: 6,
    backgroundColor:'#58589F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: "white"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  task: {
    width: 200,
    marginLeft: 30,
    color: '#5454D3',
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});
