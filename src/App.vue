<template>
  <div id="app">
    <div>
      <b-navbar type="primary" variant="light">
        <b-navbar-nav>
          <b-navbar-brand>APP Questionnaire</b-navbar-brand>
          <b-nav-item active to="/">Accueil</b-nav-item>
          <b-nav-item to="/about">A propos</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>
