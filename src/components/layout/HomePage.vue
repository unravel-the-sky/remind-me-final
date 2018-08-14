<template>
<div class="container">
    
    <ul class="nav navbar-nav">
      <li> logged in! </li>
      <li> <a @click="logoutUser()">logout </a> </li>
    </ul>

    <div class="ui grid centered">
      <h3>hello {{getUserName}}!</h3> <br> <br> <br>
    </div>
        <!-- <div class="loading" v-if="loading">
            Loading..
        </div> -->
    <div class="ui grid tasks-pane">
      <div class="tasks"><products-pane v-on:add-new-task="onAddNewTask" v-if="productsData" v-bind:products='productsData'></products-pane></div>
    </div>
</div>
  
</template>

<style>
.tasks-pane {
  max-width: 1260px;
  margin: auto !important;
}
.tasks {
  margin: auto 10px auto 10px;
}

</style>

<script>
import TasksPane from '../products/TasksPane';
import UserProfile from '../user/UserProfile';
import auth from '../../auth';

import Vue from 'vue';

Vue.component('products-pane', TasksPane);
Vue.component('user-profile', UserProfile);

export default {
  created() {
    this.fetchHome();
    console.log('lol: ', this.$store.state.userName)
  },
  computed: {
    getUserName(){
      return localStorage.getItem('user_name')
    }
  },
  data() {
    return {
      loading: false,
      productsData: null,
      userData: null,
      error: null
    };
  },
  methods: {
    logoutUser() {
      auth.logout();
    },
    onAddNewTask(task) {
      console.log('homepage received the event..');
      console.log('here is the task: ', task);

      let addedTask = null;
      auth.addNewTask(this, task)
          .then(res => {
            addedTask = res;
            console.log('result: ', addedTask);
            this.productsData.data.push(addedTask.data);
          });
    },
    async fetchHome() {
      this.error = this.data = null;
      this.loading = true;

      const result = await auth.getHome(this);

      if (result.error) {
        console.log('poop happened apparently');
        this.error = result.error.statusText;
      } else {
        console.log('her er dataen din: ', result.data);
        this.productsData = result;
        // this.userData = result.data.profile
        this.loading = false;
      }
    }
  }
};
</script>