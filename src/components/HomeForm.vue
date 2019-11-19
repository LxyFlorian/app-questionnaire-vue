<template>
  <div>
    <!-- Formulaire de création du quizz (Prénom, Nom & Société) -->
      <b-form @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-firstname"
          label="Prénom :"
          label-for="effirstname"
        ><b-form-input
          id="effirstname"
          v-model="form.effirstname"
          type="text"
          required
          placeholder="Entrer votre prénom"
        ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-name" label="Nom :" label-for="efname">
          <b-form-input
            id="efname"
            v-model="form.efname"
            required
            placeholder="Entrer votre nom"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-name" label="Nom de votre société :" label-for="efsociety">
          <b-form-input
            id="efsociety"
            v-model="form.efsociety"
            required
            placeholder="Nom de votre société"
          ></b-form-input>
        </b-form-group>
        <!-- Transmettre les données à la route /questionnaire qui correspond au Composant Quizz-->
          <router-link :to="{ name: 'questionnaire', params: { 'effirstname': form.effirstname, 'efname': form.efname, 'efsociety': form.efsociety }}">
            <b-button type="button" variant="primary">Commencer le test</b-button>
          </router-link>
      </b-form>
  </div>
</template>

<script>
export default {
  name: 'HomeForm',
  data () {
    return {
      form: {
        effirstname: '',
        efname: '',
        efsociety: ''
      },
      show: true
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.effirstname = ''
      this.form.efname = ''
      this.form.efsociety = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
