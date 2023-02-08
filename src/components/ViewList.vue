<script setup lang="ts">
import { useContactoStore } from "../stores/ContactoStore"
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'
import 'datatables.net-select';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import { isEmpty } from "lodash";

const contactoStore = useContactoStore()

DataTable.use(DataTablesLib)

contactoStore.fillContactos()

var count = 1;

const columns = [
  { 
    data: 'type',
      render: function(data) {
        if(isEmpty(data)){
          return "SinDefinir en CRM"
        }else{
          return data
        }
      }
  },
  { data: 'person_type' },
  { data: 'identification' },
  { data: 'name' },
  { data: 'phones[0].number' },
  { data: 'address.city.city_name' },
  { data: 'address.address' },
  { 
    data: null,
      render: function(data, type, row) {
        var element = ""
        for (let index = 0; index < row.contacts.length; index++) {
          element += row.contacts[index].first_name +  ' ' + row.contacts[index].last_name + '<br>';
        }
        return element
      }
    },
];

const options = {
  dom: '<"bottom"B>ftlip',
  buttons: ['copy','csv','pdf'],
  select: true,
  paging: true,
  pagingType: "simple_numbers",
  scrollY: 800,
  autoWidth: false,
  columnDefs: [
    { "width": "10%", "targets": 0 },
    { "width": "20%", "text-align": "left", "targets": [6,3] },
  ],
  lengthChange: true,
  pageLength: 50
};

</script>
<!-- :data="contactoStore.getContactos"  -->
<!-- :options="options" -->
<template>
  <div class="mainContainer">
    <DataTable 
      :columns="columns"
      :processing=true
      :serverSide=true
      :ajax="{
        url: 'http://localhost:8082/customers/get/1/200',
        type: 'GET'
      }"
      :search="{
            return: true,
        }"
      class="display"
      width="100%"
      >
        <thead>
            <tr>
              <th>Tipo</th>
              <th>Tipo persona</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfonos</th>
              <th>Ciudad</th>
              <th>Dirección</th>
              <th>Contactos</th>
            </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Tipo</th>
            <th>Tipo persona</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfonos</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Contactos</th>
          </tr>
        </tfoot>
    </DataTable>
  </div>
</template>
<style lang="css">
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-select-dt';

.mainContainer {
  padding: 15px;
}
.containerList {
    display: grid;
    grid-template-columns: 60px 120px 120px 140px repeat(5,1fr);
    grid-template-rows: min-content;
    width: 100%;
}
.titles {
  background-color: black;
  color: white;
}
.conList {
  display: grid;
  border: 0.1px solid #32a1ce;
}
.conListTitle {
  display: grid;
  border: 0.1px solid #32a1ce;
  
}
.conList:nth-child(4) {
  text-align: right;
}
.conList:nth-child(5) {
  text-align: left;
}
.conList:nth-child(6) {
  text-align: left;
}
.conList:nth-child(7) {
  text-align: left;
}
</style>