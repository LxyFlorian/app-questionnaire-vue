<template>
  <div>
    <div class="container">
      <h1>Administration</h1>
      <!-- Si le cookie isLog est à false ou pas présent : Afficher un formulaire d'inscription sinon afficher le tableau des résultats -->
      <div v-if="!this.isLog">
        <b-form-input type="text" v-model="password" required placeholder="Entrez votre mot de passe"></b-form-input>
        <b-button @click="login(password)">Se connecter</b-button>
      </div>
      <!-- Si l'admin est connecté : Afficher une table boostrapvue avec les données. -->
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
      // Déclaration des variables
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
    // Au chargement de la page :
    // Check le cookie isLog et l'assigne à la variable locale
    if (localStorage.isLog === 'true') {
      this.isLog = true
    }
    // Appelle la méthode qui récupère les résultats en base
    this.getResults()
  },
  methods: {
    getResults: function () {
      var efvm = this
      // Récupérer les résultats présents dans la bdd
      this.db.allDocs({
        include_docs: true,
        attachments: false
      }).then(function (doc) {
        // les assigner à la variable eflistresult
        efvm.eflistResult = doc.rows.map(a => a.doc)
      }).catch(function (err) {
        console.log('Erreur récupération des données : ' + err)
      })
    },
    login: function (pass) {
      // Formulaire de connexion administrateur. (Fonctionne avec les cookies, c'est une première version)
      this.password = pass
      if (this.password === 'admin') {
        this.isLog = true
        localStorage.isLog = true
      }
    }
  }
}
</script>
