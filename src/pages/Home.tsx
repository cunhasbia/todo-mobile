import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundTask = updatedTasks.find(task => task.id === id);

    if (!foundTask) {
      return;
    }

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      {!tasks.length ? (
        <Text style={styles.text}>Nenhuma tarefa, descanse!</Text>
      ) : (
        <TasksList
          tasks={tasks}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  text: {
    color: '#969696',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginTop: 40,
  }
});