<template lang="">
  <div class="w-100 shadow p-4">
    <div class="w-100 pb-2">
      <h4>Dashboard</h4>
      <div class="d-flex justify-content-between">
        <h5>Barang</h5>
        <router-link to="/tambahbarang" class="btn btn-success"
          >Tambah Barang</router-link
        >
      </div>
    </div>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">nama barang</th>
            <th scope="col">stok</th>
            <th scope="col">harga</th>
            <th scope="col">nama Supplier</th>
            <th scope="col">No Tlp Supplier</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in getData" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <th>{{ data.namaBarang }}</th>
            <th>{{ data.stok }}</th>
            <th>{{ data.harga }}</th>
            <th>{{ data.supplier.namaSupplier }}</th>
            <th>{{ data.supplier.noTelp }}</th>
            <th class="">
              <button @click="deleteData(data.id)" class="btn btn-danger mx-3">
                Hapus
              </button>
              <router-link :to="`/barang/${data.id}`" class="btn btn-warning"
                >Update</router-link
              >
            </th>
          </tr>
        </tbody>
      </table>
    <div class="d-flex justify-content-end p-4">
      <div class="px-2">
        <button class="btn btn-primary">Previous Page</button>
      </div>
      <button @click="nextpage()" class="btn btn-primary">Next Page</button>
      <h5>{{ page }}</h5>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  created() {
    this.$store.dispatch("GET_DATA");
  },
  watch:{
    data(oldValue,cuerrenvalue){
      console.log(oldValue,cuerrenvalue)
    }
  },
  mounted(){
   console.log('mounted')
   console.log(this.data)
  },
  computed: {
    getData() {
      return this.$store.state.barang;
    },
    page() {
      return this.$store.state.page;
    },
    data(){
      return this.$store.state.hasilFilter;
    },
    ...mapGetters([
      'AllHasilFilter'
    ])
    

  },

  methods: {
    searchingEngine() {
      this.$store.commit("SEARCHING_DATA",this.search );
    },
    nextpage() {
      this.$store.state.page++;
      console.log(this.$store.state.page);
      this.$store.dispatch("GET_DATA");
    },

    deleteData(id) {
      console.log(id);
      this.$store.dispatch("DELETE_BARANG", id);
    },
  },
};
</script>
<style lang=""></style>
