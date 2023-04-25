class ChartCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let config = this.props.config;
        return <div class="content-section chart">
            <div class="digital-bank-card-header">
                <img src={this.props.imageSrc}></img>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextObject objectId={config.title} app={this.props.app} className={"chart-card-header-title"}></TextObject>
                    <TextObject objectId={config.subtitle} app={this.props.app} className={"chart-card-header-subtitle"}></TextObject>
                </div>
            </div>
            <LineChart
                chartStyle={{ height: "calc(100% - 38px)", minHeight: "244px" }}
                app={this.props.app} objectId={config.lineChart}
                options={Appearance.lineChart.default}
            ></LineChart>
        </div>
    }
}