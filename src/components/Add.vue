<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-plus" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
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
            <div class="error" v-if="!$v.name.required">Brand is Required</div>
            <div class="form-group" :class="{ 'form-group--error': $v.size.$error }">
              <label class="form-control-label" name="size">Size</label>
              <input class="form__input" type="number" v-model.trim="size"/>
            </div>
            <div class="error" v-if="!$v.size.required">Size is Required</div>
            <div class="form-group" :class="{ 'form-group--error': $v.price.$error }">
              <label class="form-control-label" name="price">Price</label>
              <input class="form__input" type="number" v-model.trim="price"/>
            </div>
            <div class="error" v-if="!$v.price.required">Price is Required</div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add Record</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Record Added Successfully!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Record Being Added...</p>
          </form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    </div>
</template>

<script>
  import VueForm from 'vueform'
  import Vue from 'vue'
  import Vuelidate from 'Vuelidate'
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
  name: 'Add Beverage',
  data () {
    return {
      messagetitle: ' Add Beverage',
      name: '',
      type: 'Water',
      amount: 0,
      brand:'',
      size: 0,
      price: 0,
      beverage: {},
      submitStatus: null
    }
  },
  methods: {
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
          this.submitBeverage(this.beverage)
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
      required
    },
    size: {
      required
    },
    price: {
      required
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
