const App = {
  name: 'app',
  data() {
    return {
      texto: `Cuéntame, Musa, la historia del hombre de muchos senderos, que anduvo errante muy mucho después de Troya sagrada asolar; vio muchas ciudades de hombres y conoció su talante, y dolores sufrió sin cuento en el mar tratando de asegurar la vida y el retorno de sus compañeros. Mas no consiguió salvarlos, con mucho quererlo, pues de su propia insensatez sucumbieron víctimas, ¡locas! de Hiperión Helios las vacas comieron, y en tal punto acabó para ellos el día del retorno. Diosa, hija de Zeus, también a nosotros, cuéntanos algún pasaje de estos sucesos. `,
      velocidad: 5,
      intervalo: null,
      pos: 0,
      status: 'stop',
    };
  },

  computed: {
    palabras() {
      return this.texto.split(' ');
    },

    lectura() {
      return this.palabras[this.pos];
    },
  },

  watch: {
    velocidad(newValue, oldValue) {
      this.setIntervalo();
    },
  },

  mounted() {
  },

  methods: {
    setIntervalo() {
      const that = this;
      clearInterval(this.intervalo);
      this.intervalo = setInterval(function () {
        that.pos++;
        if (that.pos > that.palabras.length) {
          that.pos = 0;
        }
      }, 1000 / this.velocidad);
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
            <div class="lectura py-3 text-center">&nbsp;{{ lectura }}&nbsp;</div>

            <div class="text-center mt-3">
              <b-form-input v-model="velocidad" type="range" min="1" max="10"></b-form-input>
              <em>{{ velocidad }} palabras por segundo</em>
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