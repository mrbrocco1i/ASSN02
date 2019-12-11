<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Select Payment Type</label>
      <select id="type" name="type" class="form-control" type="text" v-model="type">
        <option value="null" selected disabled hidden>Choose Beverage Type</option>
        <option value="water">water</option>
        <option value="coconut water">coconut water</option>
        <option value="fizzy drinks">fizzy drinks</option>
        <option value="energy drinks">energy drinks</option>
        <option value="coffee">coffee</option>
      </select>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
      <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 30)</label>
      <input class="form__input" type="number" v-model.trim="amount"/>
    </div>
    <div class="error" v-if="!$v.amount.required">Amount is Required</div>
    <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 30</div>
    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Beverage Name</label>
      <input class="form__input" v-model.trim="$v.name.$model"/>
    </div>
    <div class="error" v-if="!$v.name.required">Name is Required</div>
    <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
    <div class="form-group" :class="{ 'form-group--error': $v.brand.$error }">
      <label class="form__label">Brand</label>
      <input class="form__input" v-model.trim="$v.brand.$model"/>
    </div>
    <div class="error" v-if="!$v.brand.required">Brand is Required</div>
    <div class="error" v-if="!$v.brand.minLength">Name must have at least {{$v.brand.$params.minLength.min}} letters.</div>
    <div class="form-group" :class="{ 'form-group--error': $v.size.$error }">
      <label class="form-control-label" name="size">Size</label>
      <input class="form__input" type="number" v-model.trim="size"/>
    </div>
    <div class="error" v-if="!$v.size.required">Size is Required</div>
    <div class="error" v-if="!$v.size.between">Size must be between 100 and 600</div>
    <div class="form-group" :class="{ 'form-group--error': $v.price.$error }">
      <label class="form-control-label" name="price">Price</label>
      <input class="form__input" type="number" v-model.trim="price"/>
    </div>
    <div class="error" v-if="!$v.price.required">Price is Required</div>
    <div class="error" v-if="!$v.price.between">Price must be between 0 and 20</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{beverageBtnTitle}}</button>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Success!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Pending ...</p>
  </form>
</template>

<script>
  import VueForm from 'vueform'
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'
  import VueSweetalert from 'vue-sweetalert'
  import BeverageService from '@/services/beverageservice'
  import { required, minLength, between } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)
  Vue.use(VueSweetalert)

  export default {
    props: ['beverageBtnTitle', 'beverage'],
    name: 'FormData',
    data () {
      return {
        name: '',
        type: 'Water',
        amount: 0,
        brand:'',
        size: 0,
        price: 0,
        beverage: {},
        submitStatus: null,
      }
    },
    methods: {
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
            var beverage = {
              type: this.type,
              name: this.name,
              amount: this.amount,
              brand: this.brand,
              size: this.size,
              price: this.price
            }
            this.beverage = beverage
            this.$emit('beverage-is-created-updated', this.beverage)
          }, 500)
        }
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(2)
      },
      amount: {
        required,
        between: between(1, 30)
      },
      brand: {
        required,
        minLength: minLength(3)
      },
      size: {
        required,
        between: between(100, 600)
      },
      price: {
        required,
        between: between(0,20)
      }
    },
  }
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    width: 95%;
    margin: 0 auto;
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
