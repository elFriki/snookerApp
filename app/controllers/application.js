import Ember from 'ember';

const NUM_FRAMES = [1, 3, 5, 7, 9, 11 /*, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39*/ ];

export default Ember.Controller.extend({

	numFramesOptions: NUM_FRAMES,

	numFrames: 0,

	numRojas: 15,

	isLastRed: false,

	tocaColor: false,

	score: {
		"_1UpName": "",
		"_2UpName": "",
		"_1UpCurrentFrame": 0,
		"_1UpFrames": 0,
		"_2UpCurrentFrame": 0,
		"_2UpFrames": 0
	},

	breaks: [],

	Break: Ember.Object.extend({
		"_1UpActive": false,
		"_2UpActive": false,
		"player": 0,
		"red": 0,
		"yellow": 0,
		"green": 0,
		"brown": 0,
		"blue": 0,
		"pink": 0,
		"black": 0,
		"total": 0
	}),

	currentBreak: 0,

	yellowOut: false,

	greenOut: false,

	brownOut: false,

	blueOut: false,

	pinkOut: false,

	blackOut: false,

	quitaRojas: Ember.computed('numRojas',
		function() {
			if (this.numRojas === 0) {
				return true;
			}
			return false;
		}),

	puntosPosibles: Ember.computed('numRojas',
		function() {
			let posibles = this.numRojas * 8;
			if (!this.get('blackOut')) {
				posibles = posibles + 7;
			}
			if (!this.get('pinkOut')) {
				posibles = posibles + 6;
			}
			if (!this.get('blueOut')) {
				posibles = posibles + 5;
			}
			if (!this.get('brownOut')) {
				posibles = posibles + 4;
			}
			if (!this.get('greenOut')) {
				posibles = posibles + 3;
			}
			if (!this.get('yellowOut')) {
				posibles = posibles + 2;
			}
			return posibles;
		}),

	breakPorcentaje: Ember.computed('puntosPosibles', 'currentBreak',
		function() {
			const currentPercentaje = (this.get('currentBreak.total') * 100) / 147;
			return Math.round(currentPercentaje);
		}),

	puntosPosiblesPorcentaje: Ember.computed('puntosPosibles', 'puntos1', 'puntos2',
		function() {
			const currentPercentaje = (this.get('puntosPosibles') * 100) / 147;
			return Math.round(currentPercentaje);
		}),

	puntos1Porcentaje: Ember.computed('puntosPosibles', 'puntos1',
		function() {
			const currentPercentaje = (this.puntos1 * 100) / 147;
			return Math.round(currentPercentaje);
		}),

	puntos2Porcentaje: Ember.computed('puntosPosibles', 'puntos2',
		function() {
			const currentPercentaje = (this.puntos2 * 100) / 147;
			return Math.round(currentPercentaje);
		}),

	updateScore: function(points) {
		if (this.get('currentBreak._1UpActive') === true) {
			this.set('score._1UpCurrentFrame', this.get('score._1UpCurrentFrame') + points);
		} else {
			this.set('score._2UpCurrentFrame', this.get('score._2UpCurrentFrame') + points);
		}
		if (this.get('numRojas') === 1) {
			this.set('isLastRed', true);
		}
		this.toggleProperty('tocaColor');
	},



	actions: {

		updateFrames(framesSelected) {
				//console.log(framesSelected);
				this.set('numFrames', framesSelected);
			},

			red() {
				this.set('numRojas', (this.get('numRojas') - 1));
				this.set('currentBreak.red', (this.get('currentBreak.red') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 1));
				this.updateScore(1);
			},

			yellow() {
				this.set('currentBreak.yellow', (this.get('currentBreak.yellow') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 2));
				this.updateScore(2);
			},

			green() {
				this.set('currentBreak.green', (this.get('currentBreak.green') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 3));
				this.updateScore(3);
			},

			brown() {
				this.set('currentBreak.brown', (this.get('currentBreak.brown') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 4));
				this.updateScore(4);
			},

			blue() {
				this.set('currentBreak.blue', (this.get('currentBreak.blue') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 5));
				this.updateScore(5);
			},

			pink() {
				this.set('currentBreak.pink', (this.get('currentBreak.pink') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 6));
				this.updateScore(6);
			},

			black() {
				this.set('currentBreak.black', (this.get('currentBreak.black') + 1));
				this.set('currentBreak.total', (this.get('currentBreak.total') + 7));
				this.updateScore(7);
			},

			cambiaTurno(playerSelected) {
				if (this.get('currentBreak') === 0) {
					let newBreak = this.get('Break').create();
					this.set('currentBreak', newBreak);
				} else {
					if (this.get('currentBreak.total') !== 0) {
						let item = this.get('currentBreak');
						this.get('breaks').addObject(item);
						let newBreak = this.get('Break').create();
						this.set('currentBreak', newBreak);
					}
				}

				this.set('currentBreak.player', playerSelected);

				if (playerSelected === '1') {
					this.set('currentBreak._1UpActive', true);
					this.set('currentBreak._2UpActive', false);
				} else {
					this.set('currentBreak._2UpActive', true);
					this.set('currentBreak._1UpActive', false);
				}
				if (!this.get('quitaRojas')) {
					this.set('tocaColor', false);
				}
			}

	}

});