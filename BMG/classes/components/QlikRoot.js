class QlikRoot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.openQlikConnection();
  }

  openQlikConnection() {
    var me = this;

    var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
    var config = {
      host: window.location.hostname,
      prefix: prefix,
      port: window.location.port,
      isSecure: window.location.protocol === "https:"
    };
    require.config({
      baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    require(["js/qlik"], function (qlik) {

      //open apps -- inserted here --
      var state = { errorMessage: null, timeOut: null };
      state[me.props.qlik] = qlik;
      state[me.props.config] = config;
      state["establishedConnection"] = true;
      window.config = config;
      me.props._onModuleReady(state);

      // detecção de erros 
      let global = qlik.getGlobal(config);
      global.on("error", (error) => {
        if (error.method == "OnSessionTimedOut") {
          let timeOut = { timeOut: error.message }
          me.props._onModuleReady(timeOut);
        }
      })
    });
  }

  render() {
    return <span />;
  }
}
