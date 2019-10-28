<template>
  <div>
    <div class="container">
      <h1>Administration</h1>
      <div v-if="!this.isLog">
        <b-form-input type="text" v-model="password" required placeholder="Entrez votre mot de passe"></b-form-input>
        <b-button @click="login(password)">Se connecter</b-button>
      </div>
      <div v-if="this.isLog">
      <b-table show striped hover :items="this.eflistResult" :fields="this.effields"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
import PouchDB from 'pouchdb-browser'

export default {
  name: 'Admin',
  data () {
    return {
      isLog: false,
      password: '',
      db: PouchDB('Quizz'),
      effields: [{
        key: '_id',
        label: '#'
      }, {
        key: 'result',
        label: 'Résultat',
        formatter: (value, key, item) => {
          return value + ' sur ' + item.nbQuestion
        }
      }, {
        key: 'date',
        label: 'Date quizz',
        formatter: (value, key, item) => {
          return value.substring(0, 10)
        }
      }, {
        key: 'effirstName',
        label: 'Prénom'
      }, {
        key: 'efname',
        label: 'Nom'
      }, {
        key: 'efsociety',
        label: 'Entreprise'
      }],
      eflistResult: []
    }
  },
  mounted () {
    if (localStorage.isLog === 'true') {
      this.isLog = true
    }
    this.getResults()
  },
  methods: {
    getResults: function () {
      var efvm = this
      this.db.allDocs({
        include_docs: true,
        attachments: false
      }).then(function (doc) {
        efvm.eflistResult = doc.rows.map(a => a.doc)
      }).catch(function (err) {
        console.log('Erreur récupération des données : ' + err)
      })
    },
    login: function (pass) {
      this.password = pass
      if (this.password === 'admin') {
        this.isLog = true
        localStorage.isLog = true
      }
    }
  }
}
</script>
