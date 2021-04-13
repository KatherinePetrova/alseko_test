<template>
  <div>
    <div class="alseko-model" v-if="modal.show">
      <div class="body">
        <a href="#" class="close" @click.prevent="modal.show = false"
          >Закрыть</a
        >
        <component
          :is="modal.is"
          :data="modal.data"
          @close="closeModal"
        ></component>
      </div>
    </div>
    <div class="container" @click="showContext = false">
      <div class="row justify-content-center">
        <div class="col-md-2"><Logo /></div>
        <div class="col-md-6">
          <h1 class="title">alseko_test</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <a href="/api">APIs</a>
      </div>
      <div class="row mt-5 justify-content-center">
        <com-table
          :api="'/'"
          :name="'emp'"
          :headers="mainTableHeaders"
          :pagination="true"
          :show-context="showContext"
          @change-context-state="changeContextState"
          @header-change="mainTableHeaderChange"
          @show-modal="mainTableModal"
        ></com-table>
      </div>
    </div>
  </div>
</template>

<script>
import ComTable from '~/components/ComTable'
import MainTableModal from '~/components/MainTableModal'

export default {
  data: () => ({
    modal: {
      show: false,
      is: null,
      data: null,
    },
    showContext: false,
    mainTableHeaders: [
      { title: 'ФИО', var: 'name', desc: false, active: false },
      { title: 'Кол-во', var: 'count', desc: false, active: false },
      { title: 'Сумма (тенге)', var: 'sum', desc: false, active: false },
    ],
  }),

  methods: {
    mainTableHeaderChange(index) {
      if (this.mainTableHeaders[index].active) {
        this.mainTableHeaders[index].desc = !this.mainTableHeaders[index].desc
      } else {
        for (let i = 0; i < this.mainTableHeaders.length; i++) {
          this.mainTableHeaders[i].active = false
          this.mainTableHeaders[i].desc = false
        }

        this.mainTableHeaders[index].active = true
      }
    },

    mainTableModal(options) {
      const { modal, data } = options
      this.modal.is = modal
      this.modal.data = data

      this.modal.show = true
    },

    changeContextState() {
      this.showContext = true
    },

    closeModal() {
      this.modal.show = false
    },
  },

  components: { ComTable, MainTableModal },
}
</script>

<style lang="scss">
.alseko-model {
  position: fixed;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;

  background-color: rgba(50, 50, 50, 0.5);

  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .body {
    background-color: white;
    border-radius: 3px;
    padding: 50px;
    padding-top: 60px;

    width: 800px;

    position: relative;
    max-height: 80vh;
    overflow-y: auto;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;

    font-size: 12px;
  }
}

.container {
  margin-top: 50px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
