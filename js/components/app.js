const App = {
  name: 'app',
  data() {
    return {
      texto: `Cuéntame, Musa, la historia del hombre de muchos senderos, que anduvo errante muy mucho después de Troya sagrada asolar; vio muchas ciudades de hombres y conoció su talante, y dolores sufrió sin cuento en el mar tratando de asegurar la vida y el retorno de sus compañeros. Mas no consiguió salvarlos, con mucho quererlo, pues de su propia insensatez sucumbieron víctimas, ¡locas! de Hiperión Helios las vacas comieron, y en tal punto acabó para ellos el día del retorno. Diosa, hija de Zeus, también a nosotros, cuéntanos algún pasaje de estos sucesos. `,
      velocidad: 200, // palabras por minuto
      velocidadMin: 10,
      velocidadMax: 1000,
      intervalo: null,
      pos: 0,
      status: 'stop',

      context: new (window.AudioContext || window.webkitAudioContext)(),
    };
  },

  computed: {
    palabras() {
      return this.texto.split(' ');
    },

    lectura() {
      return this.palabras[this.pos];
    },

    lecturaLeft() {
      const lectura = this.lectura;
      const pos = Math.floor(lectura.length / 3);
      return lectura.substr(0, pos);
    },

    lecturaRight() {
      const lectura = this.lectura;
      const pos = Math.floor(lectura.length / 3);
      return lectura.substr(pos);
    },
  },

  watch: {
    velocidad(newValue, oldValue) {
      this.setIntervalo();
    },
  },

  mounted() {
    this.playTune(432, 'sine');
  },

  methods: {
    // oscType: 'sine'|'square'|'triangle'|'sawtooth'
    playTune(frequency, oscType) {
      const context = this.context;
      var osc = context.createOscillator();

      var gain = context.createGain();
      osc.type = oscType || 'sine';
      osc.connect(gain);
      gain.connect(context.destination)

      // osc.frequency.value = frequency; // Hz DEPRECATED
      osc.frequency.setValueAtTime(frequency, context.currentTime);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
      //osc.stop(context.currentTime + 250);
    },

    setIntervalo() {
      const that = this;
      clearInterval(this.intervalo);
      this.intervalo = setInterval(function () {
        that.pos++;
        if ((that.pos + 1) == that.palabras.length) {
          that.pos = 0;
        }
      }, 1000 / (this.velocidad / 60) );
    },
    
    start() {
      this.status = 'start';
      this.setIntervalo();
    },

    pause() {
      this.status = 'pause';
      clearInterval(this.intervalo);
    },

    stop() {
      this.status = 'stop';
      clearInterval(this.intervalo);
      this.pos = 0;
    },
  },

  template: `<b-container>
      <h3>Ejercicio de lectura veloz</h3>

      <em>Copia y pega aquí tu texto</em>
      <b-textarea v-model="texto" rows="10"></b-textarea>
      <em>{{ palabras.length }} palabras</em>

      <div>
        <b-row>
          <b-col>
            <div class="lectura">
              <div class="box-left">{{ lecturaLeft }}</div>
              <div class="box-right">{{ lecturaRight }}</div>
            </div>

            <div class="text-center mt-3">
              <b-input-group :prepend="velocidadMin" :append="velocidadMax" class="mt-3">
                <b-form-input v-model="velocidad" type="range" :min="velocidadMin" :max="velocidadMax"></b-form-input>
              </b-input-group>
              <em>{{ velocidad }} palabras por minuto</em>
            </div>

            <div class="text-center mt-3">
              <b-button @click="start" variant="outline-primary" v-if="status!=='start'">
                <b-icon icon="play"></b-icon>
              </b-button>

              <b-button @click="pause" variant="outline-primary" v-if="status==='start'">
                <b-icon icon="pause"></b-icon>
              </b-button>

              <b-button @click="stop" variant="outline-primary" v-if="status!=='stop'">
                <b-icon icon="stop"></b-icon>
              </b-button>

            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>`,
};

export default App;