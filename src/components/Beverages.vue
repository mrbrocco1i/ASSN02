<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="beverages" :options="options">
        <a slot="addAmount" slot-scope="props" class="fa fa-plus fa-2x" @click="addAmount(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteRecord(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editBeverage(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import BeverageService from '@/services/beverageservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Beverages',
  data () {
    return {
      props: ['_id'],
      messagetitle: ' Beverages List ',
      beverages: [],
      errors: [],
      columns: ['type', 'name', 'brand', 'size', 'amount', 'price', 'addAmount', 'edit', 'remove'],
      options: {
        headings: {
          _id: 'ID',
          type: 'Drink Type',
          name: 'Name',
          brand: 'Brand',
          size: 'Size',
          amount: 'Amount',
          price: 'Price'
        },
        sortable: ['amount', 'price']
      }
    }
  },
  created () {
    this.loadBeverages()
  },
  methods: {
    editBeverage: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    loadBeverages: function () {
      BeverageService.fetchBeverages()
        .then(response => {
          // JSON responses are automatically parsed.
          this.beverages = response.data
          console.log(this.beverages)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    addAmount: function (id) {
      BeverageService.incrementAmount(id)
        .then(response => {

          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteRecord: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          BeverageService.deleteRecord(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadBeverages()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Beverage ', 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'The beverage is still there!', 'info')
        }
      })
    }
  }
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
    width: 60%;
    margin: 0 auto;
  }
</style>
