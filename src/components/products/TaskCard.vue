<template>
    <div class="ui grid cards">
        <div class="card new-task-button">
            <div class="content">
                <div class="header">
                    Hello!
                </div>
                <div class="ui small feed">
                    <div class="event">
                        <div class="content">
                            <img class="right floated mini ui image" src="https://i.pinimg.com/originals/1e/0e/6a/1e0e6a9507b80487f31fa1ff26920332.png">
                            <div class="summary">
                                Here you can add new tasks and reminders, they will all be categorized and sorted out.. SOON.
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button @click="newTask()">Add..</button> -->
            </div>
            <div id="show-task-modal" class="ui bottom attached button" @click="showTaskModal = true">
                <h4 id="show-task-modal">Add Task</h4>
            </div>
            <new-task-modal v-on:add-new-task="onAddNewTask" v-show="showTaskModal" @close="showTaskModal = false"></new-task-modal>

        </div>
        <div class="card" v-for="task in assignments" v-bind:key="task.date">
            <div class="content inner-content">
                
                <div class="header">
                    name: {{task.name}}
                </div>
                <div class="meta">
                    status: {{task.status[0]}}
                </div>
                <div class="description">
                    <img class="right floated mini ui image" v-bind:src=task.image>
                    description: <div class="task-content" v-html="styleTaskContent(task.content)"></div>
                </div>
                
                <div class="">
                    remind on: 
                    <div class="ui calendar remind-on" id="example5">
                        <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input type="text" placeholder="Date" value="tomorrow">
                        </div>
                    </div>
                </div>

                
            </div>
            <div class="ui bottom attached button">
                <div class="ui two buttons">
                    <div class="ui basic green button">Done</div>
                    <div class="ui basic red button">Delete</div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>
.new-task-button:hover {
  /* transform: scale(1.01) */
  box-shadow: 0px 1px 15px rgb(150, 150, 150);
}
.remind-on {
    position: absolute;
    bottom: 9px;
}
.inner-content{
    position: relative;
}
.task-content {
    white-space: pre-wrap;
}
</style>

<script>
import NewTaskModal from './NewTaskModal';
import helperText from '../../helpers/helpers';

import Vue from 'vue';
Vue.component('new-task-modal', NewTaskModal);

export default {
  name: 'product-list',
  props: ['assignments'],
  data() {
    return {
      showTaskModal: false
    };
  },
  methods: {
    styleTaskContent(taskContent) {
      const numberOfTasks = taskContent.replace(/[^-]/g, '').length;

      if (numberOfTasks > 0) {
        let tasksArray = taskContent.split('- ');
        tasksArray.shift()

        let tasksList = '<ul>' + tasksArray.map(item => '<li>' + item + '</li>') + '</ul>';
        const tasksResult = tasksList.replace(/,/g , ' ');

        return tasksResult;
      } else {
        return taskContent;
      }
    },
    onAddNewTask(task) {
      console.log('task card received the event! task: ', task.name);
      this.$emit('add-new-task', task);
    }
  }
};
</script>
