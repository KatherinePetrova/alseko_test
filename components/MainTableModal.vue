<template>
  <div class="container-fluid">
    <h5 style="margin-bottom: 20px">Форма сотрудника</h5>
    <div class="row">
      <div class="col-md-2">
        <div class="alform-group">
          <label for="surname">Фамилия: </label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="alform-group">
          <input type="text" id="surname" value="Нуруллаев" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <div class="alform-group">
          <label for="name">Имя: </label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="alform-group">
          <input type="text" id="name" value="Мансур" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <div class="alform-group">
          <label for="middlename">Отчество: </label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="alform-group">
          <input type="text" id="middlename" value="Маратович" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mt-5">
        <com-table
          :api="'/select'"
          :name="'value'"
          :table="'value'"
          :headers="headers"
          :pagination="false"
        ></com-table>
      </div>
    </div>
  </div>
</template>

<script>
import ComTable from '~/components/ComTable'

export default {
  data: () => ({
    headers: [
      { title: '№ п/п', var: 'index', desc: false, active: false },
      { title: 'Название', var: 'name', desc: false, active: false },
      { title: 'Стоимость (тенге)', var: 'cost', desc: false, active: false },
    ],
  }),
  components: { ComTable },
}
</script>

<style lang="scss">
.alform-group {
  color: #35495e;
  margin-bottom: 10px;

  label {
    margin: 0;
    font-size: 14px;
  }

  input {
    border: none;
    outline: none;
    font-size: 14px;

    border-bottom: 1px solid #35495e;
    padding: 0 10px;

    width: 100%;
  }
}
</style>
