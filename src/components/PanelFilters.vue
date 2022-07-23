<template>
  <div class="cont-filtros">
    <div class="c-filtros-item">
      Contratos
    </div>
    <div class="c-filtros-item">
      Corrientes
    </div>
    <div class="c-filtros-item">
      Componentes
    </div>
    <div class="c-filtros-item">
      Estados
    </div>
    <div class="c-filtros-item" id="contratos">
      <select name="languages" id="select-contratos" multiple size="3" readonly>
        <option value="javascript">C-1022-2012</option>
        <option value="javascript">C-9857-2022</option>
      </select>
    </div>
    <div class="c-filtros-item">
      <select name="languages" id="select-contratos" multiple size="3" readonly>
        <option value="javascript">Rio Medellín</option>
        <option value="javascript">La Clara</option>
        <option value="javascript">La Tolda</option>
      </select>
    </div>
    <div class="c-filtros-item" id="filtros-componentes">
      <div><label><input type="checkbox" id="cbox1" value="first_checkbox"> AZUD</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> PLACA</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> MURO</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> BARRAS</label></div>
    </div>
    <div class="c-filtros-item" id="filtros-estados">
      <div><label><input type="checkbox" id="cbox1" value="first_checkbox"> Repotenciado</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> Bueno</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> En mal estado</label></div>
      <div><label><input type="checkbox" id="cbox2" value="second_checkbox"> Otro</label></div>
    </div>
    <div class="c-filtros-item">
      <div>PANEL DE FILTROS</div>
    </div>
    <!-- <div class="c-filtros-item">2</div>
    <div class="c-filtros-item">3</div>
    <div class="c-filtros-item">4</div> -->
  </div>
</template>

<script>
export default {
  name: "PanelFilters",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>