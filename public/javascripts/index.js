var vm = new Vue({
  el: "#app",
  data: {
    file: null,
    datalog: null,
    selected_day : null,
  },
  computed: {},
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
            if (vm.checkDataIntegrity(data)) {
              throw "jsonschemeerror";
            }
            vm.$data.datalog = data;
          } catch (err) {
            if (err == "jsonschemeerror")
              window.alert("file .json non contenente tweet");
            else window.alert("Il file deve essere di tipo JSON!");
          }
        };
        fileReader.readAsText(file, "utf-8");
      } else {
        window.alert("Inserire un file da caricare");
      }
    },
    checkDataIntegrity(data) {
      //if (!data.hasOwnProperty("name")) return true;
      //if (!data.hasOwnProperty("tweets")) return true;
      //if (!data.hasOwnProperty("search_parameters")) return true;
      return false;
    },
    setActiveTab(tab){
        this.selected_day = tab
    }
  },
  watch: {
    file: function (file) {
      this.loadSearch(file);
    },
    datalog: function (newvalue,oldvalue) {
        this.selected_day = this.datalog.days[0]
    }
  },
});
