var vm = new Vue({
  el: "#app",
  data: {
    file: null,
    datalog: null,
    selected_day: null,
  },
  computed: {
    days_hours: function () {
      let a = [];
      if (this.datalog) {
        this.datalog.days.forEach((day) => {
          a.push({
            date: day.date,
            time: day.grand_total.total_seconds,
          });
        });
      }
      return a;
    },
  },
  methods: {
    selectFile() {
      document.getElementById("form-file").click();
    },
    loadSearch(file) {
      if (file) {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
          try {
            let json = event.target.result;
            let data = JSON.parse(json);
            vm.$data.datalog = data;
          } catch (err) {
            window.alert("Il file deve essere di tipo JSON!");
          }
        };
        fileReader.readAsText(file, "utf-8");
      } else {
        window.alert("Inserire un file da caricare");
      }
    },
    setActiveTab(tab) {
      this.selected_day = tab;
    },
    calculateTotalTime(project) {
      let total = 0;
      project.languages.forEach((language) => {
        total += language.total_seconds / 3600;
      });
      return Math.ceil(total + 100) / 100;
    },
  },
  watch: {
    file: function (file) {
      this.loadSearch(file);
    },
    datalog: function () {
      this.selected_day = this.datalog.days[0];
    },
  },
});
