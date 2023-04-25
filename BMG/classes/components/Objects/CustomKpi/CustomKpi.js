class CustomKpi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.measures) {
            Utils.generateHypercube(this.props.app, false, [], this.props.measures, ((hc) => {
                Utils.extractKPIData(hc).then((data) => {
                    Utils.evaluateExpression(this.props.app, this.props.measures[0].label).then((firstLabel) => {
                        if (this.props.measures[1]) {
                            Utils.evaluateExpression(this.props.app, (this.props.measures[1]).label).then((secondLabel) => {
                                data.series[0].name = firstLabel;
                                data.series[1].name = secondLabel;
                                this.setState({ hc, data, firstLabel, secondLabel })
                            })
                        } else {
                            data.series[0].name = firstLabel;
                            this.setState({ hc, data, firstLabel })
                        }
                    })
                })
            }));
        }

        if (this.props.objectId) {
            Utils.createHyperCubeByQlikId(this.props.app, this.props.objectId, (hc, model, title) => {
                title = model.model.layout.title;
                Utils.extractKPIData(hc).then((data) => {
                    this.setState({ data, title })
                })
            });
        }
    }

    render() {
        let icon = "";
        if (this.state.data &&
            this.state.data.series[0] &&
            this.state.data.series[0].data.color) {
            switch (this.state.data.series[0].data.color.icon) {
                case "S":
                    icon = <i class="fas fa-arrow-down"></i>;
                    break;
                case "R":
                    icon = icon = <i class="fas fa-arrow-up"></i>;
                    break;
                case "ï":
                    icon = <i class="fas fa-star"></i>;
                    break;
                case "U":
                    icon = <i class="fas fa-arrow-right"></i>;
                    break;
                default:
                    break;
            }
        }

        let valueStyle = '';
        if (this.state.data) {
            valueStyle = { backgroundColor: this.state.data.series[0].data.color ? this.state.data.series[0].data.color.color : '' };
            if (this.props.valueStyle) {
                valueStyle = this.props.valueStyle;
                valueStyle.backgroundColor = this.state.data.series[0].data.color ? this.state.data.series[0].data.color.color : '';
            }

        }

        return (
            <div className={this.props.className ? "cl-kpi " + this.props.className : "cl-kpi"} style={this.props.style}>
                {this.state.data ?
                    [<span class="cl-kpi__name">
                    {this.props.titleIndicator ? <div style={{ backgroundColor: this.props.titleIndicator }} class="circle-indicator"></div> : ''} 
                     {this.state.title}</span>,
                    <span class="cl-kpi__value" style={valueStyle}>
                        {icon}
                        {this.state.data ? this.state.data.series[0].data.name : "..."}
                    </span>]
                    :
                    <ObjectLoader></ObjectLoader>
                }
            </div>)
    }
}