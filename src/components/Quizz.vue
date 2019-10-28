<template>
  <div>
    <div class="container">
      <h1>Quizz</h1>
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
var json = require('../assets/questions.json')
export default {
  name: 'Quizz',
  data () {
    return {
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
        this.efscore++
      } else {
        this.efvar[efindex] = 'danger'
      }
      this.efresponse = true
      this.efvar[this.efquestions[this.efindex].efvalid] = 'success'
      if (this.efindex === this.efquestions.length - 1) {
        this.effin = true
      }
    },
    next: function () {
      this.efresponse = false
      this.efvar = [...Array(4)]
      this.efindex++
    }
  }
}
</script>
