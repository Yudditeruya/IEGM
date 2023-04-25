/*
  BarChart - Creates a barchart using eCharts from Apache

  Props:
//   RETRIEVING DATA
    app: app coming from Qlik Sense
    objectId: ""0
    dimensions: [""]
    measures: [
        {
            definition: "",
            label: "",
            format: {
                expression: "",
                type: ""
            }
        }
    ]
    //STYLE
    presentation: {
            containerStyle: {
                {
                    //CSS properties -> this defines the container's style
                }
            },
            tooltip: {
                showAxisLabel: boolean
            },
            showTotal: boolean,
            barGap: string // possible values -> ("30%", "10px", "10"),
            label: {
                show: boolean,
                position: string // possible values -> (according to echarts doc)
            },
            orientation: "vertical" || "horizontal",
            stacked: boolean,
            pallete: ["color1", "color2", ...]
    }
*/

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            option: {},
            label: {
                show: true
            }
        };

        this.defaultOptions = {
            clusterOptions: {
                format: "0.00a",
                barHeight: 24,
                barWidth: 24
            },
            echartsOptions: {
                baseOption: {
                    color: ["#64CCD7"],
                    legend: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        position: function (point, params, dom, rect, size) {
                            dom.style.transform = "translateZ(0)";
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLine: {
                            lineStyle: {
                                color: "#7E868A"
                            }
                        },
                        axisTick: {
                            color: "#7E868A"
                        },
                        axisLabel: {
                            fontSize: 12,
                            show: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        show: true,
                        type: 'value',
                        axisTick: {
                            color: "#7E868A"
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#7E868A"
                            }
                        },
                        axisLabel: {
                            fontFamily: "Ubuntu",
                            fontSize: 12,
                            color: "#7E868A"
                        }
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }],
                },
                media: []
            }
        }

        this.ref = React.createRef();
        this.finalOptions = _.merge(this.defaultOptions, this.props.options);
    }

    componentDidMount() {
        if (this.props.objectId || (this.props.dimensions && this.props.measures)) {
            this.initData();
        }
    }

    componentWillUnmount() {
        if (this.state.hc) {
            Utils.destroyHC(this.props.app, this.state.hc, this.state.model || null);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.objectId != this.props.objectId) {
            if (prevState.hc) {
                Utils.destroyHC(this.props.app, prevState.hc, prevState.model || null);
            }
            this.initData();
        }
    }

    onFinished(chart) {
        if (!this.state.chart) {
            this.setState({ chart: chart })
        }
    }

    initData() {
        if (this.props.dimensions && this.props.measures) {
            this.getDataFromHc();
        }

        // GETTING DATA FROM ID
        if (this.props.objectId) {
            this.getDataFromObjId(this.props.app, this.props.objectId);
        }
    }

    // getDataFromHc() {
    //     Utils.generateHypercube(this.props.app, presentation.stacked, this.props.dimensions, this.props.measures, ((hc) => {
    //         Utils.extractData(hc, presentation.stacked, [format]).then((data) => {
    //             let legends = data.series.map((item) => { return item.name });
    //             this.setState({ hc, data, legends })
    //         })
    //     }));
    // }

    getDataFromObjId(app, id) {
        let clusterOptions = this.finalOptions.clusterOptions;
        let formats = clusterOptions.formats;
        Utils.createHyperCubeByQlikId(app, id, (hc, model, title) => {
            let type = hc.qHyperCube.qStackedDataPages[0] ? "stacked" : "default";
            Utils.extractData(hc, type, formats).then((data) => {
                let legends = data.series.map((item) => { return item.name });
                this.setState({ hc, model, title, data, legends })
            })
        });
    }

    genFormatter = () => {
        return (param) => {
            let label = '';
            if (this.state.chart && this.ref.current) {
                let value = param.data.value;
                let chartModel = this.state.chart.getModel();
                if (this.finalOptions.orientation == "vertical") {
                    let barQuantity = chartModel.getComponent('yAxis').axis.scale._extent[1] - chartModel.getComponent('yAxis').axis.scale._extent[0];
                    let barHeight = this.default.barHeight;
                    if (barHeight * barQuantity * chartModel.getComponent('yAxis').axis.model.ecModel._seriesIndices.length < this.ref.current.offsetHeight) {
                        let max = this.state.chart.getModel()._componentsMap.data.xAxis[0].axis.scale._extent[1];
                        let width = this.ref.current.offsetWidth - 20;
                        let divider = this.state.expanded ? 26 : 41;
                        if ((width * value) / max > divider) {
                            label = param.data.name;
                        }
                    }
                } else {
                    let barQuantity = chartModel.getComponent('xAxis').axis.scale._extent[1] - chartModel.getComponent('xAxis').axis.scale._extent[0];
                    let barWidth = this.default.barWidth;
                    if (barWidth * barQuantity * chartModel.getComponent('xAxis').axis.model.ecModel._seriesIndices.length < this.ref.current.offsetWidth) {
                        let max = this.state.chart.getModel()._componentsMap.data.yAxis[0].axis.scale._extent[1];
                        let height = this.ref.current.offsetHeight - 20;
                        let divider = this.state.expanded ? 11 : 17;
                        if ((height * value) / max > divider) {
                            label = param.data.name;
                        }
                    }
                }
            }
            return label;
        }
    };

    getAxisColor() {
        return this.finalOptions.axisColor;
    }

    getXAxisType() {
        return this.finalOptions.orientation == 'vertical' ? 'value' : 'category';
    }

    getSeriesStyle(series) {
        let options = this.finalOptions.echartsOptions.baseOption;
        let clusterOptions = this.finalOptions.clusterOptions;
        let styledSeries = series.map((item, serieIndex) => {
            item.barGap = options.barGap || "30%";
            item.type = "bar";
            item.barWidth = (options.bar || {}).width || "auto";
            item.label = {
                normal: {
                    show: (options.label || {}).show || false,
                    color: "black",
                    fontSize: "11px",
                    fontFamily: "Ubuntu",
                    fontWeight: "lighter",
                    formatter: (e) => {
                        let label = `{a|${e.data.name}}`;
                        if (clusterOptions.showPercent) {
                            label = `{b|${e.data.valueInPercent}}\n{a|${e.data.name}}`;
                        }
                        return label;
                    },
                    rich: {
                        a: {
                            color: "black",
                            fontWeight: "normal"
                        },
                        b: {
                            color: "black",
                            fontWeight: "bold"
                        }
                    },
                    position: (options.label || {}).position || "inside",
                }
            }

            if (item.label.normal.position == "inside") {
                item.label.normal.formatter = item.label.normal.position == "inside" ? this.genFormatter() : (e) => {
                    let label = `{value|${e.data.name}}`;
                    if (clusterOptions.showPercent) {
                        label = `{percent|${e.data.valueInPercent}}\n${e.data.name}`;
                    }
                    return label;
                };
            }

            if (item.name == 'Total') {
                item.label.normal.offset = clusterOptions.orientation == "vertical" ? [22, 0] : [0, -15]
                item.data = item.data.map((res) => {
                    return { value: 0, name: res.name }
                })
            } else {
                item.data = item.data.map((dataItem, index) => {
                    if (this.finalOptions.clusterOptions.formats) {
                        dataItem.name = numeral(dataItem.value).format(this.finalOptions.clusterOptions.formats[serieIndex]);
                    }
                    if (dataItem.qlikColor) {
                        dataItem.itemStyle = {
                            color: dataItem.qlikColor
                        }
                    } else {
                        if (clusterOptions.singleBar && clusterOptions.multicolored) {
                            dataItem.itemStyle = {
                                color: options.color[index]
                            }
                        }
                    }
                    return dataItem;
                })
            }

            return item;
        });
        return styledSeries;
    }

    getDataZoom() {
        let options = this.finalOptions.echartsOptions;
        let dataZoom = null;
        if (this.state.chart) {
            let chartModel = this.state.chart.getModel();
            let axis = options.orientation == "vertical" ? 'yAxis' : 'xAxis';
            let totalBarQuantity = chartModel.getComponent(axis).option.data.length;
            let measureToUse = options.orientation == "vertical" ? "offsetWidth" : "offsetHeight";
            if ((this.ref.current[measureToUse] / totalBarQuantity) < 24) {
                dataZoom = {
                    orient: options.orientation || "horizontal",
                    show: true,
                    start: options.orientation == "vertical" ? 100 : 0,
                    end: options.orientation == "vertical" ? 75 : 25
                };
            }
        }
        return dataZoom;
    };

    getMedias() {
        let medias = [];
        let options = this.finalOptions.echartsOptions;
        if (options.orientation == "horizontal") {
            medias = [
                {
                    query: { minWidth: 1024 },
                    option: {
                        dataZoom: this.getDataZoom()
                    }
                },
                // TABLET
                {
                    query: { maxWidth: 1024 },
                    option: {
                        legend: {
                            type: "scroll",
                            textStyle: {
                                color: this.getAxisColor(),
                            }
                        },
                        dataZoom: this.getDataZoom()
                    }
                },
                // MOBILE
                {
                    query: { minWidth: 0, maxWidth: 450 },
                    option: {
                        dataZoom: this.getDataZoom()
                    }
                }
            ]
        } else {
            medias = [
                {
                    query: { maxHeight: 600 },
                    option: {
                        dataZoom: this.getDataZoom()
                    }
                }
            ]
        }
        return medias;
    };

    getFontFamily() {
        return this.finalOptions.fontFamily || 'Ubuntu';
    };

    generateTooltip(formatterInfo) {
        let options = this.finalOptions.echartsOptions.baseOption;
        let items = formatterInfo;
        let html = (options.tooltip || {}).showAxisLabel ? `<div style='display: flex; align-items: center; font-size: 14px; font-family: "${this.getFontFamily()}"; font-stretch: condensed'>
            <span>${formatterInfo[0].axisValueLabel}</span></div>
            ` : '';
        for (var i = 0; i < items.length; i++) {
            html += `<div style='display: flex; align-items: center; font-size: 14px; font-family: "${this.getFontFamily()}"'>
                    <span style='background-color: ${items[i].color}; width: 10px; height: 10px; border-radius: 100%;margin-right: 5px'></span>
                    ${items[i].seriesName}: <span style='font-family: "${this.getFontFamily()}"; font-weight: bold'>&nbsp;${items[i] && items[i].data ? items[i].data.name : ''}</span>
                </div>`
        }
        return html;
    };

    generateOption() {
        let legends = this.state.legends;
        let series = this.getSeriesStyle(this.state.data.series);
        let labels = this.state.data ? this.state.data.labels : [];
        this.finalOptions.echartsOptions.baseOption.xAxis.data = labels;
        this.finalOptions.echartsOptions.baseOption.yAxis.data = labels;
        this.finalOptions.echartsOptions.baseOption.legend.data = legends;
        this.finalOptions.echartsOptions.baseOption.tooltip.formatter = (e) => { return this.generateTooltip(e) };
        this.finalOptions.echartsOptions.baseOption.series = series;
        return this.finalOptions.echartsOptions;
    };

    render() {
        let styleChart = this.props.containerStyle || { height: "400px" };
        let style = this.props.style || {};
        style.flex = "1";
        style.width = "100%";

        if(!style.height) {
            style.height = "100%";
        }

        if (!this.state.hc || !this.state.data.series) {
            style.height = this.props.loaderHeight ? this.props.loaderHeight : '400px';
            return <div style={style}><ObjectLoader loaderStyle={style}></ObjectLoader></div>
        }


        if (this.state.hc.qHyperCube.qError) {
            return <div style={style}>{this.state.hc.qHyperCube.qCalcCondMsg}</div>;
        }

        let renderOption = this.generateOption();


        return <div ref={this.ref} className={this.props.className} style={style}>
            {this.state.title ? <h3 style={this.props.titleStyle} className="barchart-title">{this.state.title}</h3> : ''}
            <GenericChart onFinished={this.onFinished.bind(this)} style={styleChart} options={renderOption} />
        </div>
    };
}