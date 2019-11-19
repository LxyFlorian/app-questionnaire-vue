<template>
  <div>
    <div class="container">
      <h1>Quizz</h1>
      <!--  Récupérer les paramètres nom, prénom & société -->
      <p>Bonjour, {{this.$route.params.efname}} {{this.$route.params.effirstname}} <strong>entreprise {{this.$route.params.efsociety}}</strong></p>
      <h3>Question N° {{ efindex + 1 }}</h3>
      <hr>
      <b-card :header="efquestions[efindex].efquestion">
        <b-card-text>
          <b-list-group>
            <b-list-group-item
              button
              v-for="(efitem, index) in efquestions[efindex].efanswers"
              :key="efitem.id"
              @click="action(index)"
              :variant="efvar[index]">
              {{ efitem }}
            </b-list-group-item>
          </b-list-group>
          <div class="text-right">
            <b-button class="mt-4" v-if="efresponse && !effin" @click="next">Question suivante</b-button>
          </div>
          </b-card-text>
      </b-card>
      <br>
    <b-alert v-if="effin" show >Résultat : {{ efscore }} / {{ efquestions.length }}</b-alert>
    </div>
  </div>
</template>

<script>
import PouchDB from 'pouchdb-browser'

var json = require('../assets/questions.json')
export default {
  name: 'Quizz',
  data () {
    return {
      db: PouchDB('Quizz'),
      effin: false,
      efindex: 0,
      efscore: 0,
      efresponse: false,
      efvar: [...Array(4)],
      efquestions: json
    }
  },
  methods: {
    action: function (efindex) {
      if (efindex === this.efquestions[this.efindex].efvalid) {
        // incrémenter le score
        this.efscore++
      } else {
        // afficher la réponse sélectionnée en rouge
        this.efvar[efindex] = 'danger'
      }
      this.efresponse = true
      this.efvar[this.efquestions[this.efindex].efvalid] = 'success'
      if (this.efindex === this.efquestions.length - 1) {
        this.addToDb(this.efscore, this.efquestions.length)
        this.effin = true
      }
    },
    next: function () {
      this.efresponse = false
      this.efvar = [...Array(4)]
      this.efindex++
    },
    addToDb: function (result, nbQuestions) {
      // ajouter dans la base
      this.db.put({
        _id: new Date().getTime().toString(),
        date: new Date().toISOString(),
        efname: this.$route.params.efname,
        effirstName: this.$route.params.effirstname,
        efsociety: this.$route.params.efsociety,
        nbQuestion: nbQuestions,
        result: result
      }).then(function (response) {
        console.log('Résultat correctement enregistré en base de données')
      }).catch(function (err) {
        console.log('Erreur pendant l\'enregistrement en bdd :' + err)
      })
    }
  }
}
</script>
