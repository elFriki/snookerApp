import Ember from 'ember';

export default Ember.Controller.extend({

  numRojas: 15,

  isLastRed: false,

  tocaColor: false,

  nombre1: "Roonie",

  puntos1: [0],

  currentBreak: {
    "1UpActive": true,
    "2UpActive": false,
    "player": 1,
    "red": 0,
    "yellow": 0,
    "green": 0,
    "brown": 0,
    "blue": 0,
    "pink": 0,
    "black": 0,
    "total": 0
  },

  nombre2: "Selby",

  puntos2: 0,

  yellowOut: false,

  greenOut: false,

  brownOut: false,

  blueOut: false,

  pinkOut: false,

  blackOut: false,

  quitaRojas: Ember.computed('numRojas',
    function(){
    if ( this.numRojas === 0 ) {
      return true;
    }
    return false;
  }),

  puntosPosibles: Ember.computed('numRojas',
    function(){
    let posibles = this.numRojas * 8;
    if ( !this.get('blackOut') ) { posibles = posibles + 7; }
    if ( !this.get('pinkOut') ) { posibles = posibles + 6; }
    if ( !this.get('blueOut') ) { posibles = posibles + 5; }
    if ( !this.get('brownOut') ) { posibles = posibles + 4; }
    if ( !this.get('greenOut') ) { posibles = posibles + 3; }
    if ( !this.get('yellowOut') ) { posibles = posibles + 2; }
    return posibles;
  }),

  breakPorcentaje: Ember.computed('puntosPosibles', 'currentBreak',
    function(){
      const currentPercentaje = (this.get('currentBreak.total') * 100) / 147;
      return currentPercentaje;
  }),

  puntosPosiblesPorcentaje: Ember.computed('puntosPosibles', 'puntos1', 'puntos2',
    function(){
    const currentPercentaje = (this.get('puntosPosibles') * 100) / 147;
    return currentPercentaje;
  }),

  puntos1Porcentaje: Ember.computed('puntosPosibles', 'puntos1',
    function(){
    const currentPercentaje = (this.puntos1 * 100) / 147;
    return currentPercentaje;
  }),

  puntos2Porcentaje: Ember.computed('puntosPosibles', 'puntos2',
    function(){
    const currentPercentaje = (this.puntos2 * 100) / 147;
    return currentPercentaje;
  }),

  actions:  {

    red() {
      this.set('numRojas', (this.get('numRojas') - 1));
      this.set('currentBreak.red', (this.get('currentBreak.red') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 1));
      if ( this.get('numRojas') === 1 ) {
        this.toggleProperty('isLastRed');
      }
      this.toggleProperty('tocaColor');
    },

    yellow() {
      this.set('currentBreak.yellow', (this.get('currentBreak.yellow') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 2));
      this.toggleProperty('tocaColor');
    },

    green() {
      this.set('currentBreak.green', (this.get('currentBreak.green') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 3));
      this.toggleProperty('tocaColor');
    },

    brown() {
      this.set('currentBreak.brown', (this.get('currentBreak.brown') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 4));
      this.toggleProperty('tocaColor');
    },

    blue() {
      this.set('currentBreak.blue', (this.get('currentBreak.blue') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 5));
      this.toggleProperty('tocaColor');
    },

    pink() {
      this.set('currentBreak.pink', (this.get('currentBreak.pink') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 6));
      this.toggleProperty('tocaColor');
    },

    black() {
      this.set('currentBreak.black', (this.get('currentBreak.black') + 1));
      this.set('currentBreak.total', (this.get('currentBreak.total') + 7));
      this.toggleProperty('tocaColor');
    },

     cambiaTurno() {
       this.toggleProperty('currentBreak.1UpActive');
       this.toggleProperty('currentBreak.2UpActive');
       if ( !this.get('quitaRojas') ) {
         this.set('tocaColor', false);
       }
     }

   }

});
