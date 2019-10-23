<template>
  <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-firstname"
          label="Prénom :"
          label-for="name"
        ><b-form-input
          id="input-1"
          v-model="form.firstname"
          type="text"
          required
          placeholder="Entrer votre prénom"
        ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-name" label="Nom :" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            required
            placeholder="Entrer votre nom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-name" label="Nom de votre société :" label-for="society">
          <b-form-input
            id="society"
            v-model="form.society"
            required
            placeholder="Nom de votre société"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="text-right" variant="primary">Commencer le test</b-button>
      </b-form>
  </div>
</template>

<script>
export default {
  name: 'HomeForm',
  data () {
    return {
      form: {
        firstname: '',
        name: '',
        society: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.firstname = ''
      this.form.name = ''
      this.form.society = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
