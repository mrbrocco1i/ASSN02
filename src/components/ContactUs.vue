<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-comment" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template>
            <form @submit.prevent="submit">
              <div class="form-group" :class="{ 'form-group--error': $v.msg.$error }">
                <label class="form__label">Leave any comment to make us better!</label>
                <input class="form__input" v-model.trim="$v.msg.$model"/>
              </div>
              <div class="error" v-if="!$v.msg.required">Comment is Required</div>
              <p>
                <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Submit</button>
              </p>
              <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
              <p class="typo__p" v-if="submitStatus === 'PENDING'">Processing ...</p>
              <p class="typo__p" v-if="submitStatus === 'OK'">Thank you!</p>
            </form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
  import BeverageService from '@/services/beverageservice'
  import VueForm from 'vueform'
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'
  import VueSweetalert from 'vue-sweetalert'
  import { required } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)
  Vue.use(VueSweetalert)

  export default {
    data () {
      return {
        messagetitle: 'Contact Us',
        msg: '',
        comment: {},
        submitStatus: null,
      }
    },
    methods: {
      submitComment: function (cmt) {
        BeverageService.postcmt(cmt)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      submit () {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
            var comment = {
              message: this.msg
            }
            this.comment = comment
            this.submitComment(this.comment)
          }, 500)
        }
      },
    },
    validations: {
      msg: {
        required,
      },
    },
  }
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  #app2 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }

  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
