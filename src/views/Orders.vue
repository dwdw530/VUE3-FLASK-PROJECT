<template>
  <div>
    <h1>Orders</h1>
    <button @click="fetchOrders">Fetch Orders</button>
    <div v-if="orders.length">
      <ul>
        <li v-for="order in orders" :key="order.id">
          {{ order.name }} - {{ order.category_id }}
        </li>
      </ul>
    </div>
    <div v-else>
      No orders available.
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrdersPage',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    ...mapActions(['fetchOrderList']),
    async fetchOrders() {
      try {
        const orders = await this.$store.dispatch('fetchOrderList', { page: 1, per_page: 10 });
        this.orders = orders;
      } catch (error) {
        alert(error.message);
      }
    }
  },
  created() {
    this.fetchOrders()
  }
}
</script>

<style scoped>
h1 {
  color: #333;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
