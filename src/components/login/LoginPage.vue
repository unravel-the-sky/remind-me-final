<template>
    <div class="main-content">
        <div v-if="methodNotSelected" class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui image header">
                    <div class="content">
                       Welcome to RemindMe app! <br>
                    </div>
                </h2>
                <!-- <div class="alert" v-if="error">
                    <p> {{error}} </p>
                </div> -->
                <div v-if="error" class="ui bottom attached warning message">
                  <i class="hand paper icon"></i>
                    {{error}}
                </div>
                <form class="ui large form">
                  <div id="login-panel" class="ui stacked segment">
                      <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="email" v-model="credentials.email" placeholder="email address">
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" v-model="credentials.password" placeholder="password">
                        </div>
                      </div>
                      <div class="ui fluid large teal submit button" @click="submit()">Submit</div>
                  </div>

                  <div class="ui error message"></div>

                </form>
                <div>
                  <button @click="loginWithFacebook()" class="ui facebook button">
                    <i class="facebook icon"></i>
                    Facebook
                  </button>
                </div>

                <div class="user-signup">
                   Not a user? <a @click="selectMethod('signup')" style="cursor: pointer">Sign up!</a>
                </div>
            </div>
        </div>

        <router-view></router-view>
        
    </div>

            <!-- <component v-bind:is="selectedLoginComponent">

        </component> -->
</template>

<style scoped>
.main-content {
  margin: auto;
  max-width: 350px;
  margin-top: 100px;
}
.login-buttons {
  margin: 5px;
}
.user-signup {
  margin-top: 20px;
}
</style>


<script>
import auth from '../../auth';

// FACEBOOK STUFF:
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  console.log('checking login state and stuff...')

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
  });
}

export default {
  name: 'firstPage',

  data() {
    return {
      methodNotSelected: true,
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    };
  },

  methods: {
    selectMethod(method) {
      this.methodNotSelected = false;
      const route = 'login/' + method;
      auth.setRoute(route);
    },
    submit() {
      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      };

      auth.login(this, credentials, '/home').then(res => {
        if (res.error) {
          this.error = res.message;

          $('#login-panel').effect('shake', { direction: 'right', times: 4, distance: 10 }, 1000);
        }
      });

      // console.log('login result: ', loginUserRes);

      // this.$store.commit('updateUser', loginUserRes.userName);

      console.log('lolllll: ', this.$store.state.userName);
    },
    loginWithFacebook(){
      console.log('faceboook button clicked!')
      // checkLoginState()
      FB.login(res => {
        console.log('facebook login!, response: ', res)
      })
    }
  },

  computed: {
    selectedLoginComponent: function() {
      return 'LoginPage' + this.selectedMethod;
    }
  }
};
</script>
