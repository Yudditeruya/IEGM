/*
LineChart - Cria um gráfico de linha do Echarts
Props:
data - dados formatados para colocar no options do echarts
chartId - id necessariamente único para a criação da div referencia onde o gráfico será criado
*/
class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
        };

        this.defaultOptions = {
            echartsOptions: {
                baseOption: {
                    axisColor: "white",
                    color: [
                        "#64CCD7",
                        "#9D63BB",
                        "#0BBD5A",
                        '#004584',
                        '#ccc',
                        '#f9f89b',
                        '#67f6b9',
                        '#ffb880',
                        '#00edfa'
                    ],
                    backgroundColor: 'transparent',
                    legend: {
                        orient: 'horizontal',
                        position: "top",
                        icon: "roundRect",
                        itemGap: 1,
                        itemWidth: 10,
                        itemHeight: 7,
                        pageIconInactiveColor: '#aaa',
                        pageIconColor: '#2f4554',
                        textStyle: {
                            color: '#717787',
                            fontSize: 10,
                            padding: [4, 4, 4, 4]
                        }
                    },
                    grid: {
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: 'axis',
                        show: true,
                        formatter: (e) => {
                            let items = e;
                            let html = `<div>${items[0].name}</div>`;
                            for (var i = 0; i < items.length; i++) {
                                html += `<div style='display: flex; align-items: center; font-size: 14px; font-family: "Ubuntu"; font-stretch: condensed'>
                                        <span style='background-color: ${items[i].color}; width: 10px; height: 10px; border-radius: 100%;margin-right: 5px'></span>
                                        ${items[i].seriesName}: <span style='font-family: "Ubuntu"; font-stretch: condensed; font-weight: bold'>&nbsp;${items[i] && items[i].data ? items[i].data.formatted : ''}</span>
                                    </div>`
                            }
                            return html;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        splitNumber: 1,
                        offset: 5,
                        type: 'category',
                        axisLabel: {
                            show: true,
                            color: '#717787',
                            rotate: 0,
                            fontSize: 10
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#E7E7E8'
                            }
                        }
                    },
                    yAxis: {
                        scale: false,
                        minInterval: 0.1,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#E7E7E8'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#E7E7E8'
                            }
                        },
                        axisLabel: {
                            color: '#717787',
                            show: true,
                            show: true,
                            rotate: 0,
                            formatter: (obj) => {
                                var format = this.finalOptions.clusterOptions.axisFormat;
                                if (format) {
                                    return numeral(obj).format(format);
                                } else {
                                    return obj;
                                }
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#E7E7E8'
                            }
                        }
                    },

                    series: []
                }
            },
            clusterOptions: {
                stacked: true,
                format: "0.00a",
                axisFormat: "0.0a"
            },
        }

        this.finalOptions = _.merge(this.defaultOptions, this.props.options);
    }

    componentDidMount() {
        if (this.props.objectId || (this.props.dimensions && this.props.measures)) {
            this.initData();
        }
    }

    initData() {
        if (this.props.objectId) {
            this.initDataWithId();
        } else {
            this.initDataWithDimensions();
        }
    }

    initDataWithDimensions() {
        let hcDef = this.getHyperCube(this.finalOptions.clusterOptions.stacked, this.props.dimensions, this.props.measures);
        this.props.app.createCube(hcDef, (reply) => {
            let matrix = reply.qHyperCube.qDataPages[0].qMatrix;
            let cubeId = reply.qInfo.qId;
            let dimension = [];
            let seriesData = []
            let animations = []
            this.props.measures.forEach(item => {
                animations.push({ animationEasing: item.animation && item.animation.name ? item.animation.name : '', animationDuration: item.animation.animationDuration ? item.animation.animationDuration : 100 })
                seriesData.push([])
            });
            if (this.props.dimensions.length == 1) {
                matrix.forEach(element => {
                    element.forEach((e, i) => {
                        if (i == 0) {
                            if (e.qText != '-') {
                                dimension.push(e.qText)
                            }
                        } else {
                            if (e.qText != "-") {
                                seriesData[i - 1].push(e.qText)
                            }
                        }
                    });
                });
            } else {
                console.log('Este gráfico está configurado para apenas uma dimensão por enquanto');
            }

            let series = seriesData.map((item, i) => {
                return {
                    data: item.data,
                    name: item.name,
                    type: 'line',
                    animationEasing: animations[i].animationEasing,
                    animationDuration: animations[i].animationDuration,
                    showSymbol: false,
                    symbolSize: 5
                }
            });
            
            this.finalOptions.echartsOptions.baseOption.xAxis.data = dimension;
            this.finalOptions.echartsOptions.baseOption.series = series;

            this.setState({ options: this.finalOptions.echartsOptions, chartId: cubeId })
        });
    }

    initDataWithId() {
        Utils.createHyperCubeByQlikId(this.props.app, this.props.objectId, (hc, model, title) => {
            let matrix = hc.qHyperCube.qDataPages[0].qMatrix;
            let cubeId = hc.qInfo.qId;
            let dimension = [];
            let seriesData = []
            let animations = []

            hc.qHyperCube.qMeasureInfo.forEach(item => {
                animations.push({
                    animationEasing: item.animation && item.animation.name ? item.animation.name : '',
                    animationDuration: item.animation && item.animation.animationDuration ? item.animation.animationDuration : 100
                })
                seriesData.push({ data: [], name: item.qFallbackTitle })
            });

            if (hc.qHyperCube.qDimensionInfo.length == 1) {
                matrix.forEach(element => {
                    element.forEach((e, i) => {
                        if (i == 0) {
                            if (e.qText != '-') {
                                dimension.push(e.qText)
                            }
                        } else {
                            if (e.qText != "-") {
                                seriesData[i - 1].data.push({
                                    formatted: numeral(e.qNum).format(this.finalOptions.clusterOptions.format),
                                    value: e.qNum
                                });
                            }
                        }
                    });
                });
            } else {
                console.log('Este gráfico está configurado para apenas uma dimensão por enquanto');
            }

            let series = seriesData.map((item, i) => {
                return {
                    data: item.data,
                    name: item.name,
                    type: 'line',
                    animationEasing: animations[i].animationEasing,
                    animationDuration: animations[i].animationDuration,
                    showSymbol: false,
                    symbolSize: 5
                }
            });
            
            this.finalOptions.echartsOptions.baseOption.xAxis.data = dimension;
            this.finalOptions.echartsOptions.baseOption.series = series;


            this.setState({ options: this.finalOptions.echartsOptions, chartId: cubeId, title: title })
        });

    }
    getHyperCube(stacked, dimensions, measures) {
        let definition = {
            qStateName: "",
            qReductionMode: "N",
            qPopulateMissing: true,
            qDimensions: dimensions.map((dimension) => { return { "qDef": { "qFieldDefs": [dimension] } } }),
            qMeasures: measures.map((measure) => {
                return {
                    "qDef": {
                        "qDef": measure.definition,
                        "qNumFormat": {
                            "qType": measure.format && measure.format.type ? measure.format.type : "R",
                            "qFmt": measure.format && measure.format.expression ? measure.format.expression : "##.#",
                        },
                        "qLabel": measure.label
                    }
                }
            }),
            qInterColumnSortOrder: [0, 1],
            qMode: "S",
            qInitialDataFetch: [
                {
                    "qHeight": 500,
                    "qLeft": 0,
                    "qTop": 0,
                    "qWidth": 10
                }
            ],
            qSupressZero: this.props.qSupressZero ? this.props.qSupressZero : false,
            qSuppressMissing: this.props.qSuppressMissing ? this.props.qSuppressMissing : false,
            customErrorMessage: {
                calcCond: ""
            }
        };
        return definition;
    };


    render() {
        let chart;
        let title;
        let options = this.state.options;

        let chartStyle = this.props.chartStyle || { height: '400px'};
        chartStyle.width = '100%';
        let style = this.props.containerStyle || { width: '100%' };
        style.flex = "1";
        style.width = "100%";

        if (!options) {
            return <div style={{
                boxShadow: 'inset 0 -1px 0 0 rgba(24,42,89,0.15)',
                height: this.props.chartStyle && this.props.chartStyle.height ? this.props.chartStyle.height : '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Proxima Nova Alt'
            }}><ObjectLoader></ObjectLoader></div>
        }

        if (options) {
            chart = <GenericChart chartId={this.state.chartId} style={chartStyle} options={options} />
        }
        if (this.state.title) {
            title = <div className="chart-title">{this.state.title}</div>
        }
        return (
            <div className="chart-component-container" style={style}>
                {title}
                {chart}
            </div>
        );
    }
}