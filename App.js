import { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText !== "") {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]);
      setModalIsVisible(false);
    }
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>YOUR TO-DO LIST!</Text>
        </View>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput onAddGoals={addGoalHandler} onCancel={endAddGoalHandler} visible={modalIsVisible} />
        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoals}
            alwaysBounceVertical={false}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 16,
    color: "#ffffff",
    fontSize: 32
  },
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalContainer: {
    flex: 4,
  },
});
