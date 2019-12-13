<template>
  <div>
    <div id="app1" class="hero">
      <h3>{{loginStatus}}</h3>
      <h3 class="vue-title"><i class="fa fa-plus" style="padding: 3px"></i>{{messagetitle}}</h3>
      <div class="container mt-3 mt-sm-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <beverage-form :beverage="beverage" beverageBtnTitle="Add record"
                           @beverage-is-created-updated="submitBeverage"></beverage-form>
          </div><!-- /col -->
        </div><!-- /row -->
      </div><!-- /container -->
    </div>
    <!--
    <div v-else class="hero">
      <h3>{{loginStatus}}</h3>
      <prompt></prompt>
    </div>
    -->
  </div>

</template>

<script>
  import BeverageService from '@/services/beverageservice'
  import BeverageForm from '@/components/BeverageForm'
  import Prompt from '@/components/Prompt'

  export default {
    data() {
      return {
        loginStatus: false,
        messagetitle: ' Add Beverage',
        beverage: {name: '', type: 'water', amount: 0, brand: '', size: 0, price: 0},
      }
    },
    created() {
      if (localStorage.getItem('loginStatus') === undefined) {
        // this.loginStatus = localStorage.loginStatus
        // this.changeStatus(localStorage.loginStatus)
        this.loginStatus = false
      } else {
        this.loginStatus = localStorage.getItem('loginStatus')
      }
      console.log(this.loginStatus)
    },
    components: {
      'beverage-form': BeverageForm,
      'prompt': Prompt
    },
    methods: {
      changeStatus(status) {
        this.loginStatus = status
      },
      submitBeverage: function (beverage) {
        BeverageService.postBeverage(beverage)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
    }
  }
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }

  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
