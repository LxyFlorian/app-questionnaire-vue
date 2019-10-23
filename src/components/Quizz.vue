<template>
  <div>
    <div class="container">
      <h1>Quizz</h1>
      <small>Bonjour, {{this.$route.params.efname}} {{this.$route.params.effirstname}} <strong>{{this.$route.params.efsociety}}</strong></small>
      <b-card header="Question">
        <b-card-text>
          Ceci est la question N°1
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quizz'
}
</script>
