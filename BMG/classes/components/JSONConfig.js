class JSONConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

        const consignadoConfig = this.getPageConfig("consignado", "./classes/pagesConfig/emprestimoConsignadoConfig.json");
        const segurosConfig = this.getPageConfig("seguros", "./classes/pagesConfig/segurosConfig.json");
        const cartoesConfig = this.getPageConfig("cartoes", "./classes/pagesConfig/cartoesConfig.json");
        const creditoEmContaConfig = this.getPageConfig("creditoEmConta", "./classes/pagesConfig/creditoEmContaConfig.json");
        const bancoDigitalConfig = this.getPageConfig("bancoDigital", "./classes/pagesConfig/bancoDigitalConfig.json");
        const dashboardConfig = this.getPageConfig("dashboard", "./classes/pagesConfig/dashboardConfig.json");
        const generalConfig  = this.getConfig();

        Promise.all([generalConfig, segurosConfig, consignadoConfig, cartoesConfig, creditoEmContaConfig, bancoDigitalConfig, dashboardConfig]).then((values) => {
            let config = {};
            values.map((item, index) => { config[item.configName] = item })
            this.props._onConfigReady(config);
        });
      
    }

    getPageConfig(name, path) {
        return new Promise((resolve, reject) => {
            fetch(path).then((response) => {
                response.json().then(function (data) {
                    data.configName = name;
                    resolve(data);
                });
            })
        })
    }

    getConfig() {
        // se nao tiver path é porque é pra pegar o arquivo de id's dos QVFS
        // let path = this.props.path ? this.props.path : './prod-config.json';
        let path = this.props.path ? this.props.path : './config.json';
        return new Promise((resolve, reject) => {
            fetch(path)
                .then(
                    (response) => {
                        response.json().then(function (data) {
                            data.configName = "general";
                            resolve(data);
                        });
                    }
                )
                .catch(function (err) {
                    console.log('Fetch Error :', err);
                });
        })
    }

    render() {
        return "";
    }
}
