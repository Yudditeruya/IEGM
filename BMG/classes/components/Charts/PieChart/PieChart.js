// possui duas series do tipo "Pie", a primeira controla o label externo e a segunda o label interno  

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.id = Utils.generateId();

        this.default = {
        }
        this.ref = React.createRef();
        this.finalOptions = this.props.options || { clusterOptions: { format: "0.0%" }, eChartsOptions: {} }
    }

    getDataFromObjId(app, id) {
        Utils.createHyperCubeByQlikId(app, id, (hc, model, title) => {
            Utils.extractPieChartData(hc).then((data) => {
                let options = this.generateOption(data.series[0].data);
                this.setState({ hc, model, title, data, options })
            })
        });
    }

    hasWhiteSpace(string) {
        return string.indexOf(' ') >= 0;
    }

    // quebra a frase em palavras, sendo uma palavra por linha. Caso a palavra seja maior que o maxWordSize ela também será quebrada
    separateTextBySpace(text, maxWordSize) {
        let wordSplitted = '';
        let separatedBySpace = text.split(" ");
        separatedBySpace.forEach(word => {
            let wordFinal = word;
            if (word.length > maxWordSize) {
                wordFinal = this.breakText(word, maxWordSize);
            }
            wordSplitted += `${wordFinal} \n`
        })
        return wordSplitted;
    }


    breakText(text, separatorIndex) {
        let firstPart = text.slice(0, separatorIndex);
        let secondPart = text.slice(separatorIndex, text.length);
        return `${firstPart} \n ${secondPart}`
    }

    generateOption(data) {
        // checking if all data values are equal to 0 
        let numberOfZeroElements = 0;
        data.forEach(element => {
            if (element.value == 0) numberOfZeroElements++;
        })

        if (numberOfZeroElements == data.length) {
            let noDataOptions = {
                title: {
                    show: true,
                    textStyle: {
                        color: "grey",
                        fontSize: 14
                    },
                    text: "Sem dados para este filtro",
                    left: "center",
                    top: "center"
                },
            }
            return noDataOptions;
        }


        let containerWidth = 0;
        if (this.ref.current) {
            containerWidth = this.ref.current.offsetWidth;
        }

        let isMobile = containerWidth <= 395;
        let type = 'pie'
        let radius = '70%'
        let center = isMobile ? ['50%', '40%'] : ['50%', '50%'];

        let options = {
            color: ["#4477AA", "#64CCD7", "#FF8954"],
            grid: {
                containLabel: true,
            },
            legend: {
                show: isMobile ? true : false,
                // type: 'scroll',
                orient: 'horizontal',
                top: 'bottom',
                icon: 'roundRect',
                itemGap: 6,
                itemWidth: 10,
                itemHeight: 10,

            },
            series: [
                {
                    type: type,
                    radius: radius,
                    center: center,
                    data: data,
                    label: {
                        show: isMobile ? false : true,
                        formatter: (value) => {
                            let nameFormatted = value.name;
                            let maxNameLength = 14;

                            if (containerWidth > 435) {
                                if (value.name.length > maxNameLength) {
                                    if (this.hasWhiteSpace(value.name)) {
                                        nameFormatted = this.separateTextBySpace(value.name, maxNameLength);
                                    } else {
                                        nameFormatted = this.breakText(value.name, maxNameLength);
                                    }

                                }
                            } else if (containerWidth > 395 && containerWidth < 434) {
                                if (value.name.length > maxNameLength) {
                                    if (this.hasWhiteSpace(value.name)) {
                                        nameFormatted = this.separateTextBySpace(value.name, 8);
                                    } else {
                                        nameFormatted = this.breakText(value.name, maxNameLength);
                                    }

                                }
                            }
                            return nameFormatted
                        },
                    },
                },
                {
                    type: type,
                    radius: radius,
                    center: center,
                    data: data,
                    label: {
                        position: "inside",
                        formatter: (e) => {
                            return e.data.valueInPercent;
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return options;
    }

    componentDidMount() {
        this.getDataFromObjId(this.props.app, this.props.objectId);
    }

    render() {
        return <div ref={this.ref} className="chart-component-container" >
            {this.state.title ? <h3 className="piechart-title">{this.state.title}</h3> : ''}
            {this.state.options ? <GenericChart chartId={this.id} style={this.props.chartStyle} options={this.state.options} /> : ""}
        </div>
    }
}