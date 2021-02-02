<template>
  <div class="form-group row">
    <div class="col-md-12">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        v-bind:disabled="!areMandatoryInputSelected()"
        v-on:click="onClick()"
      >
        Generate Plot
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store/store";
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TheGenerateButton',
  setup() {
    const store = useStore(key);
    const router = useRouter()

    function areMandatoryInputSelected() {
      return store.getters.areMandatoryInputSelected;
    }
    function onClick() {
      router.push('result');
    }

    return {
      areMandatoryInputSelected,
      onClick
    };
  }
});

</script>
