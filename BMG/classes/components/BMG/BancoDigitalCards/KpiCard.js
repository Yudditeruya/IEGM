class KpiCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let config = this.props.config;

        return <div class="content-section card">
            <div class="digital-bank-card-header">
                <img src={this.props.imageSrc}></img>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextObject objectId={config.title} app={this.props.app} className={"card-header-title"}></TextObject>
                    <TextObject objectId={config.subtitle} app={this.props.app} className={"card-header-subtitle"}></TextObject>
                </div>
            </div>
            {/* MAIN CARD - FIRST PART */}
            <div class="digital-bank-kpi-row" style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}>
                <div>
                    <TextObject objectId={config.kpi1title} titleIndicator="#64CCD7" app={this.props.app} className={"kpi-row-title"}></TextObject>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <CustomKpi className={'bmg-main-kpi kpi-small'}
                            style={{ marginRight: "5px" }}
                            app={this.props.app}
                            objectId={config.kpi1}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            style={{ flexDirection: "row-reverse", alignItems: "center", margin: '2px 0 7px 5px' }}
                            objectId={config.kpi2}></CustomKpi>
                    </div>
                </div>
                <CustomKpi className={'bmg-main-kpi kpi-small'}
                    style={{ marginRight: "5px", borderLeft: '1px solid #e7e7e8', paddingLeft: '10px' }}
                    app={this.props.app}
                    objectId={config.kpi3}></CustomKpi>
            </div>

            {/* MAIN CARD SECOND PART  */}
            <div class="digital-bank-kpi-row" style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", paddingTop: '10px' }}>
                <div>
                    <TextObject objectId={config.kpi4title} titleIndicator="#9D63BB" app={this.props.app} className={"kpi-row-title"}></TextObject>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <CustomKpi className={'bmg-main-kpi kpi-small'}
                            style={{ marginRight: "5px" }}
                            app={this.props.app}
                            objectId={config.kpi4}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            style={{ flexDirection: "row-reverse", alignItems: "center", margin: '2px 0 7px 5px' }}
                            objectId={config.kpi5}></CustomKpi>
                    </div>
                </div>
                <CustomKpi className={'bmg-main-kpi kpi-small'}
                    style={{ marginRight: "5px", borderLeft: '1px solid #e7e7e8', paddingLeft: '10px' }}
                    app={this.props.app}
                    objectId={config.kpi6}></CustomKpi>
            </div>

            {/* MAIN CARD THIRD PARTH */}
            <div class="digital-bank-kpi-row" style={{ paddingTop: '10px' }}>
                <div>
                    <TextObject objectId={config.kpi7title} titleIndicator="#0BBD5A" app={this.props.app} className={"kpi-row-title"}></TextObject>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CustomKpi className={'bmg-main-kpi'}
                            style={{ marginRight: "5px" }}
                            app={this.props.app}
                            objectId={config.kpi7}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                            objectId={config.kpi8}></CustomKpi>
                    </div>
                </div>
                <CustomKpi className={'bmg-main-kpi kpi-small'}
                    style={{ marginRight: "5px", borderLeft: '1px solid #e7e7e8', paddingLeft: '10px' }}
                    app={this.props.app}
                    objectId={config.kpi9}></CustomKpi>
            </div>
            <div style={{ marginTop: '10px' }}>
                <BarChart objectId={config.barChart} app={this.props.app} containerStyle={{ height: "28px" }} loaderHeight="28px" options={Appearance.barChart.smallVertical}></BarChart>
            </div>
        </div>
    }
}