<template lang="">
    <div
    class="d-flex vh-100 container-fluid align-items-center justify-content-center">
    <div class="w-50 shadow p-4">
    <form @submit.prevent="tambahsupplier">
      <div class="row mb-3">
        <label for="inputbarang" class="col-sm-2 col-form-label">Nama Supplier</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputbarang" placeholder="masukan nama supplier" v-model="namasupplier">
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputharga" class="col-sm-2 col-form-label">Alamat Supplier</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputharga" placeholder="masukan alamat supplier" v-model="alamatsupplier">
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputstok" class="col-sm-2 col-form-label">No Telp Supplier</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="inputstok" placeholder="masukan No Supplier" v-model="nosupplier">
        </div>
      </div>
      
      <hr>
      <div class="d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-primary">Kembali</button>
        <button type="Submit" class="btn btn-primary">Tambah</button>
      </div>
    </form>
  </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            namasupplier: "",
            alamatsupplier: "",
            nosupplier: ""
        }
    },
    methods:{
        tambahsupplier(){
            const config ={
                namaSupplier : this.namasupplier,
                alamat : this.alamatsupplier,
                noTelp : this.nosupplier
            }
            this.$store.dispatch('CREATE_SUPPLIER',config)
        }
    }
}
</script>
<style lang="">
    
</style>