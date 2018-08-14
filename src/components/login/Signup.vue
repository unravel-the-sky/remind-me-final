<template>
    <div class="main-content">
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui image header">
                    <div class="content">
                       New user registration
                    </div>
                </h2>
                <!-- <div class="alert" v-if="error">
                    <p> {{error}} </p>
                </div> -->
                <form class="ui large form">
                <div class="ui stacked segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="username" v-model="credentials.userName" placeholder="username">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="text" name="email" v-model="credentials.email" placeholder="email">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" v-model="credentials.password" placeholder="password">
                        </div>
                    </div>
                    <div class="ui fluid large teal submit button" @click="submit()">Sign up</div>
                </div>

                <div v-if="error" class="ui error message"></div>

                </form>

                <div v-if="success" class="ui success message">
                    <i class="close icon"></i>
                    <div class="header">
                        Your user registration was successful.
                    </div>
                    <p>You will be redirected to the log-in page or be sent to HELL!</p>
                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>

</style>

<script>
import auth from '../../auth';

export default {
  name: 'signup',

  data() {
    return {
      credentials: {
        email: '',
        userName: '',
        password: ''
      },
      error: '',
      success: null
    };
  },

  methods: {
    submit() {
      let credentials = {
        userName: this.credentials.userName,
        email: this.credentials.email,
        password: this.credentials.password
      };

      console.log('yo, credentials: ', credentials);

      auth.signup(this, credentials, '/home').then(res => {
        let loginUserRes = res;
        console.log('sign up result: ', loginUserRes);

        if (!loginUserRes.error){
            this.success = true
        } else {
            this.error = 'error occured'
        }
      });
      
    }
  }
};
</script>
