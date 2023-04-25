class DonutChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.id = Utils.generateId();
        this.baseColor = "#F58220";
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Utils.createHyperCubeByQlikId(this.props.app, this.props.objectId, (hc, model, title) => {
            Utils.extractKPIData(hc).then((data) => {
                this.setState({ data: data.series[0], vis: model, title: title })
            })
        });
    }
    generateOption() {
        if (!this.state.data) {
            return {};
        }

        let series = [];
        // let totalRadius = 100;
        let vis = this.state.vis.model.layout;
        let currentGauge = this.state.data;
        let value = currentGauge.data.value * 100;
        // let min = vis.measureAxis.min != 0 ? vis.measureAxis.min * 100 : 0;
        // let max = vis.measureAxis.max != 0 ? vis.measureAxis.max * 100 : 0;
        let colorStops = [
            { offset: currentGauge.data.value, color: currentGauge.data.value / 100 > 0.7 ? 'goldenrod' : this.baseColor }
        ];

        if (!vis.useSegments) {
            colorStops[0].color = vis.paletteProgressColor.color || this.baseColor;
        } else {
            if (vis.segmentInfo && vis.segmentInfo.limits && vis.segmentInfo.limits.length) {

                colorStops = vis.segmentInfo.limits.map((item, index) => {
                    return { offset: (item.value), color: vis.segmentInfo.paletteColors[index].color || this.baseColor }
                });

            } else if (vis.segmentInfo.paletteColors.length > 0) {
                colorStops[0].color = vis.paletteProgressColor.color || this.baseColor;
            }
        }

        series = {
            type: 'pie',
            clockWise: true,
            center: ["50%", "50%"],
            radius: ["90%", "75%"],
            hoverAnimation: false,
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: value,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: {
                                colorStops: colorStops
                            }
                        }
                    }
                },
                {
                    name: 'gap',
                    value: 100 - value,
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'rgb(231, 231, 232)'
                        }
                    },
                }
            ]
        };

        let option = { series: series };
        return option;
    }


    onFinished(chart) {
        if(!this.state.chart) {
            this.setState({chart: chart})
            chart.resize();
        }
    }

    render() {
        let styleChart = this.props.chartStyle || { width: "100%", height: "100%", minHeight: "100px" };
        styleChart = _.merge({ display: "flex", alignItems: "center", justifyContent: "center" }, styleChart);
        let option = {}
        if (this.state.data) {
            option = _.merge(this.generateOption(), (this.props.options || {}));
        };


        return option.series ? <div className="chart-component-container" style={this.props.containerStyle}>
            {this.props.hideTitle || !this.state.title ? '' : <h3 className="piechart-title">{this.state.title}</h3>}
            <div style={styleChart}>
                <GenericChart onFinished={this.onFinished.bind(this)} style={{ height: "100%", width: "100%" }} options={option} />
                {this.props.hideValue ? '' : <span class="donut-value">{this.state.data.data.name}</span>}
            </div>
        </div> : '';
    }
}