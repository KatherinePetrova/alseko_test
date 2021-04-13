<template>
  <div>
    <div
      v-show="showContext"
      class="context"
      :style="{ top: context.top, left: context.left }"
    >
      <a href="#">Изменить</a>
      <a href="#">Удалить</a>
    </div>
    <table
      class="alseko_table"
      border="1"
      cellpadding="10"
      :class="{ load: timeout }"
    >
      <tr class="head">
        <th
          v-for="(item, index) in headers"
          :key="index + 'header' + name"
          @click="order(index)"
        >
          <span>{{ item.title }}</span>
          <b-icon
            icon="arrow-down"
            class="alseko-arrow"
            v-if="item.active"
            :class="{ desc: item.desc }"
          ></b-icon>
        </th>
      </tr>

      <tr
        v-for="(item, index) in result"
        :key="item.id"
        :class="{ active: active === index }"
        @click="active = index"
        @dblclick="
          $emit('show-modal', {
            modal: 'main-table-modal',
            data: { id: item.id },
          })
        "
        @contextmenu.prevent="openContext(index, item.id, $event)"
      >
        <td
          v-for="(item2, index) in item"
          v-show="index !== 'id'"
          :key="item.id + index"
        >
          {{ item2 }}
        </td>
      </tr>
    </table>
    <div class="pagination">
      <a href="#">Добавить</a>
      <!-- <a href="#">Изменить</a>
      <a href="#">Удалить</a> -->
    </div>
    <div class="pagination" v-if="pagination && total">
      <a
        href="#"
        v-for="item in pages"
        :key="item"
        @click.prevent="filters.page = item"
        :class="{ active: item == filters.page }"
        >{{ item }}</a
      >
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  props: ['api', 'name', 'headers', 'pagination', 'showContext', 'table'],
  data: () => ({
    filters: {
      order_by: null,
      desc: null,
      page: 1,
    },

    context: {
      top: null,
      left: null,
      index: null,
    },

    total: null,
    result: [],
    timeout: false,
    active: null,
  }),

  methods: {
    async getData() {
      if (this.timeout) return

      try {
        this.timeout = true
        const { result, total } = await this.$axios.$get(
          '/api' + this.api + '?' + this.query
        )
        this.result = result
        this.total = total
      } catch (e) {
        console.log(e)
      } finally {
        this.timeout = false
      }
    },

    order(index) {
      this.$emit('header-change', index)

      this.filters.order_by = this.headers[index].var
      this.filters.desc = this.headers[index].desc
    },

    openContext(index, id, $event) {
      const { pageX, pageY } = $event
      this.context.top = pageY + 5 + 'px'
      this.context.left = pageX + 'px'
      this.active = index
      this.$emit('change-context-state')
    },
  },

  computed: {
    query() {
      let result = ''
      for (const key in this.filters) {
        if (this.filters[key]) {
          result += key + '=' + this.filters[key] + '&'
        }
      }

      result += '&table=' + this.table

      return result
    },

    pages() {
      return Math.ceil(this.total / 10)
    },
  },

  watch: {
    filters: {
      deep: true,
      handler() {
        this.getData()
        this.active = null
      },
    },
  },

  directives: {
    ClickOutside,
  },

  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss">
.context {
  position: absolute;

  display: flex;
  flex-direction: column;

  box-shadow: 0 0 10px rgba(120, 120, 120, 0.8);

  a {
    background-color: rgb(247, 247, 247);
    border: 1px solid #35495e;
    margin-top: -1px;

    padding: 5px 25px;
    text-decoration: none;
    color: #35495e;
    cursor: pointer;
  }

  a:hover {
    background-color: rgb(200, 200, 200);
  }
}

.pagination {
  margin-top: 20px;
  margin-bottom: 20px;

  a.active {
    cursor: default;
    background-color: rgb(200, 200, 200);
  }

  a {
    padding: 10px 20px;
    border-right: 1px solid #35495e;
    margin-right: -1px;
    text-decoration: none;

    color: #35495e;
    border: 1px solid #35495e;
    background-color: rgb(247, 247, 247);
  }

  a:hover {
    background-color: rgb(200, 200, 200);
  }
}
.alseko-arrow {
  transition: 0.5s;
}

.desc {
  transform: rotate(180deg);
}

.load {
  filter: blur(2px);
}

.alseko_table {
  transition: 0.5s;
  color: #35495e;
  background-color: rgb(247, 247, 247);
  cursor: pointer;

  tr.active {
    cursor: default;
    background-color: rgb(200, 200, 200);
  }

  tr:hover {
    background-color: rgb(200, 200, 200);
  }

  tr.head {
    background-color: rgb(220, 220, 220);
    th:hover {
      background-color: rgb(210, 210, 210);
    }
  }
  tr.head:hover {
    background-color: rgb(220, 220, 220);
  }
}
</style>
